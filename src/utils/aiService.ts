import { GoogleGenerativeAI } from '@google/generative-ai';
import { OpenAI } from 'openai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_KEY);
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export interface AIAnalysisResult {
  skills: string[];
  recommendations: string[];
  marketInsights: {
    trends: string[];
    inDemandSkills: string[];
    salaryRange: {
      min: number;
      max: number;
      average: number;
    };
  };
  careerPath: {
    current: string;
    next: string[];
    longTerm: string[];
  };
}

export const analyzeWithMultipleAIs = async (text: string): Promise<AIAnalysisResult> => {
  try {
    // Run OpenAI and Gemini analysis in parallel
    const [openAIResult, geminiResult] = await Promise.all([
      analyzeWithOpenAI(text),
      analyzeWithGemini(text)
    ]);

    // Combine and reconcile results
    return {
      skills: [...new Set([...openAIResult.skills, ...geminiResult.skills])],
      recommendations: mergeRecommendations(openAIResult.recommendations, geminiResult.recommendations),
      marketInsights: combineMarketInsights(openAIResult.marketInsights, geminiResult.marketInsights),
      careerPath: reconcileCareerPaths(openAIResult.careerPath, geminiResult.careerPath)
    };
  } catch (error) {
    console.error('AI analysis error:', error);
    throw new Error('Failed to analyze with AI services');
  }
};

const analyzeWithOpenAI = async (text: string): Promise<AIAnalysisResult> => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "user",
      content: `Analyze this professional text and provide:
        1. List of skills (technical and soft)
        2. Career recommendations
        3. Market insights
        4. Career progression path
        
        Text: ${text}`
    }],
    temperature: 0.3,
    max_tokens: 1000
  });

  return parseAIResponse(response.choices[0].message.content);
};

const analyzeWithGemini = async (text: string): Promise<AIAnalysisResult> => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Analyze this professional text and provide:
    1. List of skills (technical and soft)
    2. Career recommendations
    3. Market insights
    4. Career progression path
    
    Text: ${text}`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  
  return parseAIResponse(response.text());
};

const parseAIResponse = (response: string): AIAnalysisResult => {
  // Implement parsing logic for AI responses
  // This is a simplified example
  return {
    skills: extractSkills(response),
    recommendations: extractRecommendations(response),
    marketInsights: extractMarketInsights(response),
    careerPath: extractCareerPath(response)
  };
};

const extractSkills = (text: string): string[] => {
  // Implement skill extraction logic
  return [];
};

const extractRecommendations = (text: string): string[] => {
  // Implement recommendation extraction logic
  return [];
};

const extractMarketInsights = (text: string): AIAnalysisResult['marketInsights'] => {
  // Implement market insights extraction logic
  return {
    trends: [],
    inDemandSkills: [],
    salaryRange: {
      min: 0,
      max: 0,
      average: 0
    }
  };
};

const extractCareerPath = (text: string): AIAnalysisResult['careerPath'] => {
  // Implement career path extraction logic
  return {
    current: '',
    next: [],
    longTerm: []
  };
};

const mergeRecommendations = (openAIRecs: string[], geminiRecs: string[]): string[] => {
  return [...new Set([...openAIRecs, ...geminiRecs])];
};

const combineMarketInsights = (
  openAIInsights: AIAnalysisResult['marketInsights'],
  geminiInsights: AIAnalysisResult['marketInsights']
): AIAnalysisResult['marketInsights'] => {
  return {
    trends: [...new Set([...openAIInsights.trends, ...geminiInsights.trends])],
    inDemandSkills: [...new Set([...openAIInsights.inDemandSkills, ...geminiInsights.inDemandSkills])],
    salaryRange: {
      min: Math.min(openAIInsights.salaryRange.min, geminiInsights.salaryRange.min),
      max: Math.max(openAIInsights.salaryRange.max, geminiInsights.salaryRange.max),
      average: (openAIInsights.salaryRange.average + geminiInsights.salaryRange.average) / 2
    }
  };
};

const reconcileCareerPaths = (
  openAIPath: AIAnalysisResult['careerPath'],
  geminiPath: AIAnalysisResult['careerPath']
): AIAnalysisResult['careerPath'] => {
  return {
    current: openAIPath.current || geminiPath.current,
    next: [...new Set([...openAIPath.next, ...geminiPath.next])],
    longTerm: [...new Set([...openAIPath.longTerm, ...geminiPath.longTerm])]
  };
};