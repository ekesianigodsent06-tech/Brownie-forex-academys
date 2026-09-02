export type PageId = 
  | 'home'
  | 'courses'
  | 'about'
  | 'founder'
  | 'simulator'
  | 'faq'
  | 'contact'
  | 'partnership'
  | 'privacy'
  | 'terms'
  | 'risk';

export interface Course {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  duration: string;
  modulesCount: number;
  featured?: boolean;
  price: string;
  priceNote?: string;
  topics: string[];
  prerequisites: string;
  targetAudience: string;
  syllabus: {
    title: string;
    description: string;
    lessons: string[];
  }[];
}

export type CurrencyPairId = 'EUR/USD' | 'GBP/USD' | 'USD/JPY' | 'GBP/JPY' | 'EUR/GBP' | 'AUD/USD' | 'USD/CAD' | 'XAU/USD' | 'BTC/USD';

export interface MarketPairInfo {
  id: CurrencyPairId;
  name: string;
  type: 'Forex Major' | 'Forex Cross' | 'Precious Metal' | 'Crypto';
  basePrice: number;
  pipDecimals: number;
  spreadPips: number;
  volatility: number; // tick variance
  description: string;
}

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type Timeframe = '1M' | '5M' | '15M' | '1H' | '4H' | '1D';

export type PositionType = 'BUY' | 'SELL';

export interface TradePosition {
  id: string;
  pair: CurrencyPairId;
  type: PositionType;
  lotSize: number;
  entryPrice: number;
  currentPrice: number;
  openTime: number;
  stopLoss?: number;
  takeProfit?: number;
  pnl: number;
  pipGain: number;
}

export interface ClosedTrade extends TradePosition {
  closeTime: number;
  closePrice: number;
  realizedPnl: number;
}

export interface SimulatorAccount {
  balance: number;
  equity: number;
  unrealizedPnl: number;
  openPositions: TradePosition[];
  closedTrades: ClosedTrade[];
}

export interface TickerData {
  pair: CurrencyPairId;
  price: number;
  change: number;
  changePercent: number;
  spread: number;
  high24h: number;
  low24h: number;
  isUp: boolean;
}

export interface TestimonialItem {
  id: string;
  studentName: string;
  role: string;
  experienceLevel: string;
  location?: string;
  courseTaken?: string;
  headline?: string;
  content: string;
  rating: number;
  date: string;
  isVerified?: boolean;
  isPlaceholder?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Enrollment' | 'Trading & Simulator' | 'Curriculum';
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  courseInterest: string;
  message: string;
}
