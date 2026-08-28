import { Course } from '../types';

/**
 * ============================================================================
 * COURSES, PRICING & SYLLABUS CONFIGURATION FILE
 * ============================================================================
 * 
 * ACADEMY OWNER: To add, remove, or modify courses, change course fees, 
 * update durations, or edit syllabus topics, edit this file.
 */

export const COURSES: Course[] = [
  {
    id: 'forex-fundamentals',
    title: 'Forex Fundamentals & Market Mechanics',
    level: 'Beginner',
    duration: '4 Weeks (Self-Paced + Live Mentorship)',
    modulesCount: 8,
    featured: true,
    price: '$150 / ₦180,000', // Change price here (or write 'Contact for Promo' if preferred)
    priceNote: 'Flexible installment plans available',
    description: 'Master the foundational architecture of the global currency market. Learn how currencies are paired, how pips, spreads, lots, and leverage operate, and build a solid foundation from scratch.',
    topics: [
      'What is Forex & Who Participates (Banks, Institutions, Retail)',
      'Currency Pairs: Majors, Minors, and Exotics',
      'Understanding Pips, Point Value, Spreads, and Lots',
      'Margin, Leverage & Liquidation Mechanics',
      'Forex Market Sessions (London, New York, Tokyo, Sydney)',
      'Trading Platform Setup (MT4/MT5/cTrader/TradingView)'
    ],
    prerequisites: 'None. Ideal for complete beginners with zero trading experience.',
    targetAudience: 'Individuals seeking a genuine, structured, hype-free introduction to the financial markets.',
    syllabus: [
      {
        title: 'Module 1: Introduction to Global Currency Exchange',
        description: 'Explore the $7.5 Trillion/day foreign exchange ecosystem and participant structure.',
        lessons: [
          'History & Evolution of Forex',
          'Central Banks & Commercial Liquidity',
          'Retail vs Institutional Flow'
        ]
      },
      {
        title: 'Module 2: Trading Terminology & Math Calculations',
        description: 'Demystify financial math so you calculate risk before placing any trade.',
        lessons: [
          'Pip Calculation for 4-decimal & JPY pairs',
          'Standard, Mini & Micro Lot sizing',
          'Spread cost and swap fee analysis'
        ]
      },
      {
        title: 'Module 3: Order Execution & Broker Selection',
        description: 'Learn how orders are filled and how to distinguish reputable brokers from scams.',
        lessons: [
          'Market Orders vs Limit/Stop Orders',
          'A-Book vs B-Book Brokers',
          'Regulated Environment Essentials'
        ]
      }
    ]
  },
  {
    id: 'technical-analysis',
    title: 'Technical Analysis & Chart Mastery',
    level: 'Intermediate',
    duration: '6 Weeks (In-Depth Technical Workshop)',
    modulesCount: 12,
    featured: true,
    price: '$250 / ₦300,000', // Change price here
    priceNote: 'Includes live chart breakdown sessions',
    description: 'Learn how professional traders deconstruct price charts, identify trends, draw dynamic support & resistance levels, and apply indicators with mathematical precision.',
    topics: [
      'Multi-Timeframe Trend Analysis (Monthly to 15-Minute)',
      'Horizontal Support & Resistance vs Dynamic Channels',
      'Classic Reversal & Continuation Chart Formations',
      'Moving Averages (EMA 20, 50, 200) for Bias Identification',
      'Relative Strength Index (RSI) & Momentum Divergence',
      'Fibonacci Retracement & Golden Ratio Confluence'
    ],
    prerequisites: 'Completion of Forex Fundamentals or basic understanding of candlestick charts.',
    targetAudience: 'Traders who know the basics but struggle with consistent chart interpretation.',
    syllabus: [
      {
        title: 'Module 1: Candlestick Science & Anatomy',
        description: 'Read the struggle between buyers and sellers behind every single candle wick and body.',
        lessons: [
          'Engulfing Bars, Pin Bars & Dojis',
          'Wick Rejections at Key Levels',
          'Volume Spread Analysis Intro'
        ]
      },
      {
        title: 'Module 2: Market Structure & Breakouts',
        description: 'Spot true structural breaks (BOS) vs fakeouts designed to trap retail traders.',
        lessons: [
          'Higher Highs/Higher Lows tracking',
          'True Break vs Liquidity Sweep',
          'Retest confirmation rules'
        ]
      },
      {
        title: 'Module 3: Confluence Checklist System',
        description: 'Build a repeatable rulebook requiring 3+ technical factors before pulling the trigger.',
        lessons: [
          'Trend + Key Level + Indicator confluence',
          'Trade invalidation protocols',
          'Real-world case study walkthroughs'
        ]
      }
    ]
  },
  {
    id: 'price-action-liquidity',
    title: 'Price Action & Smart Money Concepts',
    level: 'Intermediate',
    duration: '6 Weeks (Advanced Structure & Order Flow)',
    modulesCount: 10,
    featured: true,
    price: '$350 / ₦420,000', // Change price here
    priceNote: 'Includes direct mentor trade reviews',
    description: 'Look beneath retail indicator lag. Study raw price action, institutional order blocks, liquidity pools, fair value gaps (FVG), and change of character (CHoCH).',
    topics: [
      'Institutional Liquidity Grabs & Stop Hunts',
      'Order Blocks (OB) & Imbalances (FVG)',
      'Break of Structure (BOS) & Change of Character (CHoCH)',
      'Premium vs Discount Pricing Zones',
      'Asian Session Range Sweeps (Judas Swing)',
      'High-Probability Entry Refinements'
    ],
    prerequisites: 'Strong grasp of Support/Resistance and basic technical analysis.',
    targetAudience: 'Traders looking to upgrade from retail lagging indicators to institutional order flow.',
    syllabus: [
      {
        title: 'Module 1: Understanding Market Liquidity',
        description: 'Where do stop losses cluster and why does price gravitate toward these liquidity pools?',
        lessons: [
          'Buy-side vs Sell-side Liquidity',
          'Equal Highs/Equal Lows Target Zones',
          'Session highs & lows'
        ]
      },
      {
        title: 'Module 2: Order Blocks & Imbalance Gaps',
        description: 'Identify the footprints left behind by institutional accumulation and distribution.',
        lessons: [
          'Valid vs Invalid Order Blocks',
          'Fair Value Gap fill probabilities',
          'Mitigation and re-entry tactics'
        ]
      }
    ]
  },
  {
    id: 'risk-management',
    title: 'Capital Preservation & Risk Management',
    level: 'Beginner',
    duration: '3 Weeks (Mandatory Foundation)',
    modulesCount: 6,
    featured: false,
    price: '$120 / ₦140,000', // Change price here
    priceNote: 'Includes position sizing calculator tools',
    description: 'The difference between professional traders and gamblers is risk control. Learn exact position sizing math, maximum drawdown caps, risk-to-reward asymmetry, and portfolio protection.',
    topics: [
      'The 1% - 2% Risk Rule & Account Longevity Math',
      'Risk-to-Reward (R:R) Ratios & Win Rate Matrix',
      'Dynamic Position Sizing Calculator Formula',
      'Trailing Stops, Break-Even Mechanics & Scaling Out',
      'Correlated Pair Exposure (e.g. EUR/USD + GBP/USD)',
      'Managing News Events (NFP, CPI, FOMC volatility)'
    ],
    prerequisites: 'None. Highly recommended for every trader at every stage.',
    targetAudience: 'Anyone who has ever blown an account or struggled with managing trade risk.',
    syllabus: [
      {
        title: 'Module 1: The Mathematics of Drawdown',
        description: 'Why losing 50% requires 100% gain to break even, and how to never hit critical drawdown.',
        lessons: [
          'Recovery Math & Ruin Probabilities',
          'Position sizing according to stop distance',
          'Account equity preservation'
        ]
      },
      {
        title: 'Module 2: Trade Execution Management',
        description: 'Managing a live trade objectively without panic or greed.',
        lessons: [
          'When to move to Breakeven',
          'Partial profit taking rules',
          'Hedging vs cutting losses'
        ]
      }
    ]
  },
  {
    id: 'trading-psychology',
    title: 'Trading Psychology & Emotional Discipline',
    level: 'Intermediate',
    duration: '4 Weeks (Mindset Mastery)',
    modulesCount: 8,
    featured: false,
    price: '$180 / ₦210,000', // Change price here
    priceNote: 'Includes personalized trade journaling audit',
    description: 'Master the mental game of trading. Overcome Fear of Missing Out (FOMO), revenge trading, over-leveraging, and hesitation. Build an unshakeable trader mindset.',
    topics: [
      'Overcoming FOMO & The Urge to Over-Trade',
      'Coping with Inevitable Losing Streaks Gracefully',
      'Removing Fear of Execution & Analysis Paralysis',
      'Building a Professional Trading Journal & Audit Log',
      'Daily Pre-Market Routine & Post-Market Debrief',
      'Maintaining Detachment from Monetary Outcomes'
    ],
    prerequisites: 'Open mind and willingness to follow a strict trading plan.',
    targetAudience: 'Traders with technical knowledge whose emotions sabotage their consistency.',
    syllabus: [
      {
        title: 'Module 1: The Biases of the Human Brain in Risk',
        description: 'Understand cognitive biases that cause poor financial decisions under uncertainty.',
        lessons: [
          'Loss Aversion Bias',
          'Gambler\'s Fallacy in Trading',
          'Dunning-Kruger Effect'
        ]
      },
      {
        title: 'Module 2: Constructing Your Trading Rulebook',
        description: 'Creating non-negotiable rules and checklists to eliminate impulse decisions.',
        lessons: [
          'Daily loss limits',
          'Mandatory journaling templates',
          'Routine optimization for peak focus'
        ]
      }
    ]
  },
  {
    id: 'advanced-market-analysis',
    title: 'Advanced Macro & Institutional Analysis',
    level: 'Advanced',
    duration: '8 Weeks (Comprehensive Masterclass)',
    modulesCount: 14,
    featured: false,
    price: '$450 / ₦540,000', // Change price here
    priceNote: 'Includes funded account evaluation preparation',
    description: 'For advanced students seeking a holistic macro view: bond yields, central bank interest rate differentials, inflation matrices, commitment of traders (COT) reports, and commodities.',
    topics: [
      'Central Bank Policy (Fed, ECB, BOE, BOJ) & Interest Rate Differentials',
      'Treasury Yield Curves (2Y vs 10Y) & US Dollar Index (DXY)',
      'Commitment of Traders (COT) Institutional Positioning Reports',
      'Gold (XAU/USD) & Oil (WTI) Intermarket Relationships',
      'Building Systematic Algorithmic Backtesting Protocols',
      'Portfolio Construction & Prop Firm Evaluation Strategies'
    ],
    prerequisites: 'Completion of Technical Analysis and Price Action courses.',
    targetAudience: 'Experienced traders aiming for institutional-grade analytical depth.',
    syllabus: [
      {
        title: 'Module 1: Intermarket Analysis',
        description: 'Connecting bonds, equities, currencies, and precious metals into one cohesive thesis.',
        lessons: [
          'DXY correlations',
          'Yield spread drivers',
          'Risk-On vs Risk-Off market regimes'
        ]
      },
      {
        title: 'Module 2: Prop Firm & Capital Scaling Preparation',
        description: 'Rules and frameworks for managing institutional / funded capital.',
        lessons: [
          'Evaluation challenge compliance',
          'Consistency rules',
          'Scaling plans'
        ]
      }
    ]
  }
];
