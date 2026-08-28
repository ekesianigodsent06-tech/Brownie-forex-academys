/**
 * ============================================================================
 * REGISTRATION INSTRUCTIONS & ENROLLMENT CONFIGURATION FILE
 * ============================================================================
 * 
 * ACADEMY OWNER: Edit the step-by-step registration guide, payment methods,
 * bank details, onboarding timeline, and WhatsApp hotline messages here.
 */

export interface RegistrationGuide {
  title: string;
  subtitle: string;
  steps: {
    stepNumber: string;
    title: string;
    instruction: string;
    details: string;
  }[];
  paymentMethods: {
    name: string;
    description: string;
    iconType: string;
  }[];
  importantNotes: string[];
  enrollmentHotline: {
    display: string;
    international: string;
    whatsappUrl: string;
  };
}

export const REGISTRATION_GUIDE: RegistrationGuide = {
  title: 'How to Register & Enroll at BFXA',
  subtitle: 'A straightforward, 4-step onboarding process to begin your trading education.',
  
  steps: [
    {
      stepNumber: '01',
      title: 'Select Your Course',
      instruction: 'Review our course catalog and choose the curriculum that matches your current trading experience level (Beginner, Intermediate, or Advanced).',
      details: 'If you are unsure where to start, our admissions team provides free skill assessment to recommend the right course.'
    },
    {
      stepNumber: '02',
      title: 'Reach Out via WhatsApp or Contact Form',
      instruction: 'Contact our official admissions desk via WhatsApp (+234 903 876 8321) or Call (+234 913 587 1115) to submit your enrollment inquiry.',
      details: 'State the course you wish to join and whether you prefer self-paced video modules, interactive cohort classes, or 1-on-1 mentorship.'
    },
    {
      stepNumber: '03',
      title: 'Complete Tuition Payment',
      instruction: 'Make your tuition fee payment using any of our accepted payment channels (Bank Transfer, Card, or Crypto USDT).',
      details: 'Official academy bank account details and crypto wallet addresses are provided directly by our verified admissions team.'
    },
    {
      stepNumber: '04',
      title: 'Instant Onboarding & Community Access',
      instruction: 'Receive instant confirmation, your student portal onboarding credentials, syllabus pack, and exclusive access to the VIP student Telegram/WhatsApp group.',
      details: 'You will also be introduced to your mentor and scheduled for your first orientation session.'
    }
  ],

  paymentMethods: [
    {
      name: 'Nigerian Bank Transfer (NGN)',
      description: 'Instant local bank transfer via GTBank, Zenith, Access, or Kuda.',
      iconType: 'bank'
    },
    {
      name: 'Cryptocurrency (USDT / BTC)',
      description: 'USDT (TRC20 / BEP20) and Bitcoin for international and African diaspora students.',
      iconType: 'crypto'
    },
    {
      name: 'Debit / Credit Card & Online Gateway',
      description: 'Secure card checkout via Paystack / Flutterwave.',
      iconType: 'card'
    }
  ],

  importantNotes: [
    'Always verify you are speaking with our official WhatsApp number: +234 903 876 8321 or Call hotline: +234 913 587 1115.',
    'Brownie Forex Academy will NEVER ask you to deposit trading funds into personal accounts to "trade on your behalf".',
    'Tuition covers education, mentorship, trading tools, and community access only.'
  ],

  enrollmentHotline: {
    display: '+234 903 876 8321',
    international: '2349038768321',
    whatsappUrl: 'https://wa.me/2349038768321?text=Hello%20Brownie%20Forex%20Academy%2C%20I%20am%20ready%20to%20register%20for%20a%20course.%20Please%20guide%20me%20with%20payment%20and%20onboarding.'
  }
};
