/**
 * ============================================================================
 * FOUNDER CONFIGURATION FILE
 * ============================================================================
 */

export interface FounderInfo {
  fullName: string;
  professionalName: string;
  title: string;
  founded: string;
  affiliation: string;
  location: string;
  photoUrl: string;
  shortBio: string;
  fullBio: string;
  quote: string;
  philosophyPillars: {
    title: string;
    description: string;
  }[];
}

export const FOUNDER_INFO: FounderInfo = {
  fullName: 'Lucy Ogochukwu Ofozor',
  professionalName: 'Brownie Fx',
  title: 'Founder & Lead Instructor',
  founded: '2023',
  affiliation: 'Founder & Lead Mentor (BFXA)',
  location: 'Abuja, Nigeria',
  
  // Founder portrait photo located at /public/founder.jpeg
  photoUrl: '/founder.jpeg',

  shortBio: 'Lucy Ogochukwu Ofozor, professionally known as Brownie Fx, is the Founder and Lead Instructor of Brownie Forex Academy (BFXA), specializing exclusively in Gold (XAU/USD), Bitcoin (BTC/USD), and Synthetic Indices with a guaranteed profit framework.',
  
  fullBio: `Lucy Ogochukwu Ofozor, professionally known as Brownie Fx, is the Founder and Lead Instructor of Brownie Forex Academy (BFXA). With a relentless passion for high-precision price action, Gold (XAU/USD), Bitcoin (BTC/USD), and Synthetic Indices, she founded BFXA in 2023 to provide traders with a clear, profitable roadmap to financial freedom.

Her trading mastery specializes exclusively in Gold (XAU/USD), Bitcoin (BTC/USD), and Synthetic Indices (Volatility 75, Boom & Crash, Step Index), focusing on high-probability liquidity sweeps and guaranteed profit execution strategies.

As an independent trading mentor and educator, Brownie Fx mentors students under the academy's motto: Learn | Trade | Grow | Succeed — turning knowledge today into financial freedom tomorrow with guaranteed profit.`,

  quote: 'Master Gold, BTC/USD, and Synthetic Indices, execute with precision, and secure your guaranteed profit. Knowledge today, financial freedom tomorrow.',

  philosophyPillars: [
    {
      title: '1. Gold, BTC & Synthetic Precision',
      description: 'Mastering exact liquidity sweeps, order blocks, and session high/low mitigations across Gold (XAU/USD), Bitcoin (BTC/USD), and Synthetic Indices (VIX 75, Boom/Crash).',
    },
    {
      title: '2. Guaranteed Profit Strategy',
      description: 'Equipping every student with high-win-rate setups, strict risk-to-reward ratios, and execution discipline built for guaranteed profit.',
    },
    {
      title: '3. Learn | Trade | Grow | Succeed',
      description: 'A complete step-by-step pathway from fundamental understanding to live trade execution and long-term financial independence.',
    },
  ],
};
