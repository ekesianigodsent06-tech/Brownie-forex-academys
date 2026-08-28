/**
 * ============================================================================
 * BROWNIE FOREX ACADEMY - CENTRAL CONTENT EXPORT HUB
 * ============================================================================
 * 
 * NOTE FOR ACADEMY OWNER / DEVELOPER:
 * Content has been split into dedicated, easy-to-edit configuration files:
 * 
 * 1. 🏢 Academy Info & Contacts  -> /src/data/academyConfig.ts
 * 2. 👤 Founder Profile & Photo   -> /src/data/founderData.ts
 * 3. 📚 Courses, Pricing, Syllabus -> /src/data/coursesData.ts
 * 4. 💬 Student Testimonials      -> /src/data/testimonialsData.ts
 * 5. ❓ Frequently Asked Questions -> /src/data/faqData.ts
 * 6. 📝 Registration Instructions -> /src/data/registrationData.ts
 * 
 * This file re-exports everything cleanly for seamless backwards compatibility.
 */

import { ACADEMY_CONFIG as BASE_ACADEMY_CONFIG } from './academyConfig';
import { FOUNDER_INFO } from './founderData';
import { COURSES } from './coursesData';
import { TESTIMONIALS } from './testimonialsData';
import { FAQS } from './faqData';
import { REGISTRATION_GUIDE } from './registrationData';
import { MarketPairInfo } from '../types';

// Merged master config combining academy settings and founder profile
export const ACADEMY_CONFIG = {
  ...BASE_ACADEMY_CONFIG,
  founder: {
    fullName: FOUNDER_INFO.fullName,
    name: FOUNDER_INFO.fullName,
    professionalName: FOUNDER_INFO.professionalName,
    title: FOUNDER_INFO.title,
    founded: FOUNDER_INFO.founded,
    affiliation: FOUNDER_INFO.affiliation,
    location: FOUNDER_INFO.location,
    photoUrl: FOUNDER_INFO.photoUrl,
    shortBio: FOUNDER_INFO.shortBio,
    bio: FOUNDER_INFO.fullBio,
    quote: FOUNDER_INFO.quote,
    philosophyPillars: FOUNDER_INFO.philosophyPillars,
  },
  registrationGuide: REGISTRATION_GUIDE,
};

export { FOUNDER_INFO } from './founderData';
export { COURSES } from './coursesData';
export { TESTIMONIALS } from './testimonialsData';
export { FAQS } from './faqData';
export { REGISTRATION_GUIDE } from './registrationData';

export const MARKET_PAIRS: MarketPairInfo[] = [
  {
    id: 'EUR/USD',
    name: 'Euro / US Dollar',
    type: 'Forex Major',
    basePrice: 1.0845,
    pipDecimals: 4,
    spreadPips: 0.8,
    volatility: 0.00015,
    description: 'The world\'s most heavily traded currency pair, representing the two largest global economies.'
  },
  {
    id: 'GBP/USD',
    name: 'British Pound / US Dollar',
    type: 'Forex Major',
    basePrice: 1.2980,
    pipDecimals: 4,
    spreadPips: 1.2,
    volatility: 0.00025,
    description: 'Known as "Cable", characterized by healthy intraday volatility and responsive trend structure.'
  },
  {
    id: 'USD/JPY',
    name: 'US Dollar / Japanese Yen',
    type: 'Forex Major',
    basePrice: 154.60,
    pipDecimals: 2,
    spreadPips: 1.0,
    volatility: 0.04,
    description: 'A classic benchmark of US economic momentum and Asian market liquidity dynamics.'
  },
  {
    id: 'GBP/JPY',
    name: 'British Pound / Japanese Yen',
    type: 'Forex Cross',
    basePrice: 200.75,
    pipDecimals: 2,
    spreadPips: 2.2,
    volatility: 0.08,
    description: 'Nicknamed "The Beast" or "Dragon" due to its aggressive price swings and wide ranges.'
  },
  {
    id: 'EUR/GBP',
    name: 'Euro / British Pound',
    type: 'Forex Cross',
    basePrice: 0.8355,
    pipDecimals: 4,
    spreadPips: 1.1,
    volatility: 0.00010,
    description: 'A cross pair reflecting intra-European monetary policy dynamics and steady ranges.'
  },
  {
    id: 'AUD/USD',
    name: 'Australian Dollar / US Dollar',
    type: 'Forex Major',
    basePrice: 0.6520,
    pipDecimals: 4,
    spreadPips: 1.0,
    volatility: 0.00018,
    description: 'A resource-tied major currency reflecting commodity flows and Asia-Pacific trade health.'
  },
  {
    id: 'USD/CAD',
    name: 'US Dollar / Canadian Dollar',
    type: 'Forex Major',
    basePrice: 1.3910,
    pipDecimals: 4,
    spreadPips: 1.3,
    volatility: 0.00020,
    description: 'Known as the "Loonie", strongly correlated with North American energy trade.'
  },
  {
    id: 'XAU/USD',
    name: 'Gold / US Dollar',
    type: 'Precious Metal',
    basePrice: 2915.50,
    pipDecimals: 2,
    spreadPips: 2.5,
    volatility: 1.25,
    description: 'The ultimate global store of value and safe-haven asset, traded in standard troy ounces.'
  },
  {
    id: 'BTC/USD',
    name: 'Bitcoin / US Dollar',
    type: 'Crypto',
    basePrice: 96450.00,
    pipDecimals: 2,
    spreadPips: 15.0,
    volatility: 65.0,
    description: 'The premier digital asset offering high volatility and 24/7 educational chart simulation.'
  }
];
