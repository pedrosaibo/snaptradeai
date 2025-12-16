// Types for user onboarding questionnaire

export interface UserProfile {
  // Section 1 - Profile
  mainGoal: 'learn' | 'analysis' | 'automate' | 'other';
  knowledgeLevel: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  experienceTime: 'none' | 'less6months' | '6months2years' | 'more2years';
  
  // Section 2 - Financial Situation
  investmentCapital: 'less100' | '100to500' | '500to2000' | '2000to10000' | 'more10000';
  operationFrequency: 'daily' | 'weekly' | 'monthly' | 'occasional';
  riskTolerance: 'veryLow' | 'low' | 'moderate' | 'high' | 'veryHigh';
  financialGoal: 'extraIncome' | 'hobby' | 'wealth' | 'autonomy' | 'other';
  
  // Section 3 - Analysis Preferences
  favoriteMarkets: ('forex' | 'crypto' | 'indices' | 'stocks' | 'commodities')[];
  preferredTimeframe: 'scalping' | 'intraday' | 'swing' | 'longTerm';
  analysisDetail: 'quick' | 'detailed' | 'both';
  
  // Section 4 - Technical Knowledge
  technicalConcepts: {
    supportResistance: number; // 0-5
    trend: number;
    priceAction: number;
    marketStructure: number;
    chartPatterns: number;
    fvgs: number;
    riskManagement: number;
  };
  hasTradingStrategy: 'yes' | 'no' | 'learning';
  
  // Section 5 - Personalization
  alertTypes: ('strongOpportunities' | 'volatility' | 'myAnalysisOnly' | 'none')[];
  preferredExperience: 'simple' | 'complete' | 'balanced';
  receiveEducationalTips: boolean;
  
  // Generated Profile
  generatedProfile?: {
    analysisDepth: 'basic' | 'intermediate' | 'advanced';
    notificationStyle: 'minimal' | 'moderate' | 'detailed';
    suggestedMarkets: string[];
    detailLevel: 'summary' | 'detailed' | 'comprehensive';
  };
}

export type OnboardingStep = 1 | 2 | 3 | 4 | 5;
