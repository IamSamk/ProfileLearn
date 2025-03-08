import { OpenAI } from 'openai';
import { supabase } from './supabase';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export interface LinkedInAnalysis {
  skills: {
    technical: string[];
    soft: string[];
    domain: string[];
  };
  experience: {
    level: string;
    years: number;
    companies: string[];
    roles: string[];
  };
  education: {
    degree: string;
    field: string;
    institutions: string[];
  };
  recommendations: {
    career: string[];
    skills: string[];
    networking: string[];
  };
  marketInsights: {
    relevantRoles: string[];
    industryTrends: string[];
    salaryRange: {
      min: number;
      max: number;
      average: number;
    };
  };
}

export const analyzeLinkedInProfile = async (profileUrl: string): Promise<LinkedInAnalysis> => {
  try {
    // Extract LinkedIn username from URL
    const username = extractUsername(profileUrl);
    if (!username) {
      throw new Error('Invalid LinkedIn profile URL');
    }

    // Fetch profile data using LinkedIn API or scraping service
    const profileData = await fetchLinkedInProfile(username);
    
    // Analyze with OpenAI
    const analysis = await analyzeWithAI(profileData);
    
    // Get market insights from Supabase
    const marketInsights = await getMarketInsights(analysis.skills);
    
    return {
      ...analysis,
      marketInsights
    };
  } catch (error) {
    console.error('LinkedIn analysis error:', error);
    throw error;
  }
};

const extractUsername = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname.split('/');
    return path[path.length - 1] || path[path.length - 2];
  } catch {
    return null;
  }
};

const fetchLinkedInProfile = async (username: string) => {
  // In a real implementation, you would:
  // 1. Use LinkedIn API with proper authentication
  // 2. Or use a professional scraping service
  // 3. Or implement your own scraping logic
  
  // For now, we'll throw an error to indicate this needs to be implemented
  throw new Error('LinkedIn profile fetching not implemented. Please implement using appropriate API or service.');
};

const analyzeWithAI = async (profileData: any): Promise<Omit<LinkedInAnalysis, 'marketInsights'>> => {
  const prompt = `
    Analyze this LinkedIn profile data and provide:
    1. Skills categorization (technical, soft, domain)
    2. Experience analysis
    3. Education details
    4. Career recommendations
    
    Profile data:
    ${JSON.stringify(profileData)}
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "user",
      content: prompt
    }],
    temperature: 0.3,
    max_tokens: 1000
  });

  // Parse and structure the AI response
  const analysis = JSON.parse(response.choices[0].message.content);
  
  return {
    skills: analysis.skills,
    experience: analysis.experience,
    education: analysis.education,
    recommendations: analysis.recommendations
  };
};

const getMarketInsights = async (skills: LinkedInAnalysis['skills']) => {
  if (!supabase) {
    throw new Error('Supabase client not initialized');
  }

  // Query market insights from Supabase
  const { data: marketData, error } = await supabase
    .from('market_insights')
    .select('*')
    .in('skill', [...skills.technical, ...skills.domain]);

  if (error) throw error;

  // Process market data
  return {
    relevantRoles: extractRelevantRoles(marketData),
    industryTrends: extractIndustryTrends(marketData),
    salaryRange: calculateSalaryRange(marketData)
  };
};

const extractRelevantRoles = (marketData: any[]): string[] => {
  return [...new Set(marketData.map(item => item.role))].slice(0, 5);
};

const extractIndustryTrends = (marketData: any[]): string[] => {
  return [...new Set(marketData.map(item => item.trend))].slice(0, 5);
};

const calculateSalaryRange = (marketData: any[]): LinkedInAnalysis['marketInsights']['salaryRange'] => {
  const salaries = marketData.map(item => item.salary).filter(Boolean);
  return {
    min: Math.min(...salaries),
    max: Math.max(...salaries),
    average: salaries.reduce((a, b) => a + b, 0) / salaries.length
  };
};