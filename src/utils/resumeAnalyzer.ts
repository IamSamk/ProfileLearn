import { OpenAI } from 'openai';
import winkNLP from 'wink-nlp';
import model from 'wink-eng-lite-web-model';
import { removeStopwords } from 'natural/lib/natural/util/stopwords';
import { createClient } from '@supabase/supabase-js';

const nlp = winkNLP(model);
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export interface ResumeAnalysis {
  overallScore: number;
  scores: {
    content: number;
    skills: number;
    format: number;
    ats: number;
  };
  skills: {
    detected: string[];
    missing: Array<{
      name: string;
      importance: number;
      description: string;
    }>;
    analysis: Array<{
      category: string;
      score: number;
      recommendations: string[];
    }>;
  };
  content: {
    strengths: string[];
    improvements: string[];
    achievements: string[];
    keywords: string[];
  };
  ats: {
    compatibility: number;
    issues: string[];
    recommendations: string[];
  };
  marketFit: {
    roles: Array<{
      title: string;
      match: number;
      salary: {
        min: number;
        max: number;
        average: number;
      };
      requirements: {
        met: string[];
        missing: string[];
      };
    }>;
    industries: string[];
    locations: string[];
  };
  recommendations: {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
  };
  aiInsights: string[];
}

export const analyzeResume = async (file: File): Promise<ResumeAnalysis> => {
  try {
    // Extract text from resume
    const text = await extractText(file);
    
    // Process with NLP
    const doc = nlp.readDoc(text);
    const tokens = doc.tokens().out();
    const entities = doc.entities().out();
    const sentences = doc.sentences().out();
    
    // Remove stopwords for better analysis
    const words = removeStopwords(tokens);
    
    // Parallel processing for different aspects
    const [
      skillsAnalysis,
      contentAnalysis,
      atsAnalysis,
      marketAnalysis
    ] = await Promise.all([
      analyzeSkills(words, entities, text),
      analyzeContent(sentences, text),
      analyzeATSCompatibility(text),
      analyzeMarketFit(text, words, entities)
    ]);
    
    // Calculate overall scores
    const scores = calculateScores(skillsAnalysis, contentAnalysis, atsAnalysis);
    
    // Generate AI recommendations
    const recommendations = await generateRecommendations(
      text,
      skillsAnalysis,
      marketAnalysis
    );
    
    // Get AI insights
    const aiInsights = await generateAIInsights(
      text,
      skillsAnalysis,
      marketAnalysis
    );

    return {
      overallScore: scores.overall,
      scores: {
        content: scores.content,
        skills: scores.skills,
        format: scores.format,
        ats: scores.ats
      },
      skills: skillsAnalysis,
      content: contentAnalysis,
      ats: atsAnalysis,
      marketFit: marketAnalysis,
      recommendations,
      aiInsights
    };
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw new Error('Failed to analyze resume');
  }
};

const extractText = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        
        // Use GPT to clean and structure the text
        const response = await openai.chat.completions.create({
          model: "gpt-4",
          messages: [{
            role: "user",
            content: `
              Clean and structure this resume text, maintaining all important information
              but removing formatting artifacts and normalizing the structure:
              
              ${text}
            `
          }],
          temperature: 0.3,
          max_tokens: 1500
        });
        
        resolve(response.choices[0].message.content);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

const analyzeSkills = async (
  words: string[],
  entities: string[],
  text: string
): Promise<ResumeAnalysis['skills']> => {
  // Use GPT to extract and categorize skills
  const skillsPrompt = `
    Analyze this resume text and:
    1. Extract all technical and soft skills
    2. Identify missing critical skills
    3. Categorize skills and provide scores
    
    Resume text:
    ${text}
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "user",
      content: skillsPrompt
    }],
    temperature: 0.3,
    max_tokens: 1000
  });

  const analysis = response.choices[0].message.content;
  
  // Get market data for missing skills
  const { data: marketSkills } = await supabase
    .from('skills_demand')
    .select('*')
    .order('demand_score', { ascending: false })
    .limit(10);

  // Process and structure the analysis
  return {
    detected: extractSkills(analysis),
    missing: identifyMissingSkills(analysis, marketSkills),
    analysis: categorizeSkills(analysis)
  };
};

const extractSkills = (analysis: string): string[] => {
  const skillsSection = analysis.match(/Technical and soft skills:(.*?)(?=\n\n|$)/s);
  if (!skillsSection) return [];
  
  return skillsSection[1]
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
};

const identifyMissingSkills = (
  analysis: string,
  marketSkills: any[]
): ResumeAnalysis['skills']['missing'] => {
  const missingSection = analysis.match(/Missing critical skills:(.*?)(?=\n\n|$)/s);
  if (!missingSection) return [];
  
  return missingSection[1]
    .split('\n')
    .map(line => {
      const skill = line.trim();
      const marketData = marketSkills.find(
        s => s.skill.toLowerCase() === skill.toLowerCase()
      );
      
      return {
        name: skill,
        importance: marketData?.demand_score || 5,
        description: marketData?.description || `${skill} is increasingly important in today's job market`
      };
    })
    .filter(skill => skill.name.length > 0);
};

const categorizeSkills = (
  analysis: string
): ResumeAnalysis['skills']['analysis'] => {
  const categoriesSection = analysis.match(/Skill categories:(.*?)(?=\n\n|$)/s);
  if (!categoriesSection) return [];
  
  return categoriesSection[1]
    .split('\n')
    .map(line => {
      const [category, scoreStr, ...recs] = line.split(':');
      return {
        category: category.trim(),
        score: parseInt(scoreStr) || 5,
        recommendations: recs.join(':').split(',').map(r => r.trim())
      };
    })
    .filter(cat => cat.category.length > 0);
};

const analyzeContent = async (
  sentences: string[],
  text: string
): Promise<ResumeAnalysis['content']> => {
  const contentPrompt = `
    Analyze this resume's content and provide:
    1. Key strengths
    2. Areas for improvement
    3. Quantifiable achievements
    4. Important keywords
    
    Resume text:
    ${text}
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "user",
      content: contentPrompt
    }],
    temperature: 0.3,
    max_tokens: 1000
  });

  const analysis = response.choices[0].message.content;
  
  return {
    strengths: extractListSection(analysis, 'Strengths'),
    improvements: extractListSection(analysis, 'Improvements'),
    achievements: extractListSection(analysis, 'Achievements'),
    keywords: extractListSection(analysis, 'Keywords')
  };
};

const extractListSection = (text: string, section: string): string[] => {
  const sectionRegex = new RegExp(`${section}:(.*?)(?=\\n\\n|$)`, 's');
  const match = text.match(sectionRegex);
  if (!match) return [];
  
  return match[1]
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
};

const analyzeATSCompatibility = async (
  text: string
): Promise<ResumeAnalysis['ats']> => {
  const atsPrompt = `
    Analyze this resume for ATS compatibility:
    1. Calculate compatibility score
    2. Identify potential issues
    3. Provide specific recommendations
    
    Resume text:
    ${text}
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "user",
      content: atsPrompt
    }],
    temperature: 0.3,
    max_tokens: 750
  });

  const analysis = response.choices[0].message.content;
  
  return {
    compatibility: extractATSScore(analysis),
    issues: extractListSection(analysis, 'Issues'),
    recommendations: extractListSection(analysis, 'Recommendations')
  };
};

const extractATSScore = (analysis: string): number => {
  const scoreMatch = analysis.match(/Compatibility Score:\s*(\d+)/);
  return scoreMatch ? parseInt(scoreMatch[1]) : 70;
};

const analyzeMarketFit = async (
  text: string,
  words: string[],
  entities: string[]
): Promise<ResumeAnalysis['marketFit']> => {
  // Get market data
  const { data: jobRoles } = await supabase
    .from('job_roles')
    .select('*')
    .limit(10);

  const marketPrompt = `
    Analyze this resume for market fit:
    1. Identify best matching job roles
    2. Suggest suitable industries
    3. Recommend work locations
    
    Resume text:
    ${text}
}