// Types for SnapTrade AI

export type Language = 'pt' | 'en' | 'fr';

export type SignalType = 'BUY' | 'SELL' | 'HOLD';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type MarketType = 'FOREX' | 'CRYPTO' | 'STOCKS' | 'INDICES' | 'COMMODITIES';

export interface Analysis {
  id: string;
  imageUrl: string;
  signal: SignalType;
  confidence: number;
  stopLoss: string;
  takeProfit1: string;
  takeProfit2: string;
  technicalSummary: string;
  pair: string;
  timeframe: string;
  riskLevel: RiskLevel;
  marketType: MarketType;
  detectedPatterns: string[];
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  subscription: 'FREE' | 'MONTHLY' | 'ANNUAL';
  subscriptionEndsAt?: Date;
  trialEndsAt?: Date;
  language: Language;
  createdAt: Date;
}

export interface Testimonial {
  name: string;
  location: string;
  text: string;
  rating: number;
}
