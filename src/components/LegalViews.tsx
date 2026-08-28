import React from 'react';
import { ShieldAlert, FileText, Lock, AlertCircle } from 'lucide-react';
import { ACADEMY_CONFIG } from '../data/academyData';

interface LegalViewProps {
  type: 'privacy' | 'terms' | 'risk';
}

export const LegalViews: React.FC<LegalViewProps> = ({ type }) => {
  if (type === 'risk') {
    return (
      <div className="w-full bg-gradient-to-b from-[#f4f5f8] via-[#edf2f9] to-[#e4ebf5] text-neutral-900 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-3xl bg-white border border-neutral-200 shadow-lg space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
              <div className="p-3 rounded-2xl bg-[#E53935]/15 text-[#E53935]">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <div>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-neutral-900">
                  RISK DISCLOSURE STATEMENT
                </h1>
                <p className="text-xs font-mono text-neutral-500 mt-0.5">
                  CFTC / FCA Standard Educational Compliance Notice
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#E53935]/10 border border-[#E53935]/30 text-xs sm:text-sm text-neutral-800 leading-relaxed font-medium">
              <strong>High Risk Warning:</strong> Trading foreign exchange (Forex), contracts for difference (CFDs), and leveraged financial instruments carries a high level of risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you.
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
              <h3 className="font-display font-bold text-base text-neutral-900">1. Educational Nature of Content</h3>
              <p>
                All content, courses, video tutorials, market commentary, simulator exercises, and publications provided by <strong>Brownie Forex Academy (BFXA)</strong> and founder/lead instructor <strong>Lucy Ogochukwu Ofozor ({ACADEMY_CONFIG.founder.professionalName})</strong> are strictly for educational and trader-development purposes. Nothing contained on this website or in our academy constitutes investment, financial, tax, or legal advice.
              </p>

              <h3 className="font-display font-bold text-base text-neutral-900">2. No Guarantee of Profits or Performance</h3>
              <p>
                Past performance is not indicative of future results. No representation is being made that any account will or is likely to achieve profits or losses similar to those discussed in educational examples or simulator tests. We explicitly reject and do not use claims of "guaranteed profits" or "get-rich-quick" promises.
              </p>

              <h3 className="font-display font-bold text-base text-neutral-900">3. Simulation Environment Notice</h3>
              <p>
                The trading simulator hosted on this website utilizes fictional, locally generated demo data. It does not interface with any live financial exchange, liquidity provider, or regulated broker. No actual money is traded, deposited, or withdrawn via the simulator.
              </p>

              <h3 className="font-display font-bold text-base text-neutral-900">4. Independent Advice</h3>
              <p>
                Before deciding to participate in foreign exchange trading, you should carefully consider your investment objectives, level of experience, and risk appetite. You should never trade with capital you cannot afford to lose.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'privacy') {
    return (
      <div className="w-full bg-gradient-to-b from-[#f4f5f8] via-[#edf2f9] to-[#e4ebf5] text-neutral-900 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-3xl bg-white border border-neutral-200 shadow-lg space-y-6">
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
              <div className="p-3 rounded-2xl bg-[#D4AF37]/15 text-[#856514]">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-neutral-900">
                  PRIVACY POLICY
                </h1>
                <p className="text-xs font-mono text-neutral-500 mt-0.5">
                  Last Updated: 2026 • Brownie Forex Academy
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
              <p>
                At <strong>Brownie Forex Academy</strong>, we are committed to safeguarding the privacy and personal data of our students and visitors.
              </p>
              <h3 className="font-display font-bold text-base text-neutral-900">Information We Collect</h3>
              <p>
                We collect personal information that you voluntarily provide when submitting an inquiry, registering for courses, or contacting us via WhatsApp and email ({ACADEMY_CONFIG.contact.email}). This may include your name, email address, phone number, and course preferences.
              </p>
              <h3 className="font-display font-bold text-base text-neutral-900">How We Use Your Information</h3>
              <p>
                Your information is used solely to respond to admissions inquiries, manage course enrollments, deliver educational materials, and provide customer support. We never sell, lease, or distribute your personal details to third-party advertisers.
              </p>
              <h3 className="font-display font-bold text-base text-neutral-900">Local Browser Storage</h3>
              <p>
                Our interactive trading simulator stores demo trade histories and balance states in your local browser storage (localStorage) for continuous practice across sessions. No financial information is transmitted to external servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Terms & Conditions
  return (
    <div className="w-full bg-gradient-to-b from-[#f4f5f8] via-[#edf2f9] to-[#e4ebf5] text-neutral-900 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="p-8 rounded-3xl bg-white border border-neutral-200 shadow-lg space-y-6">
          <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
            <div className="p-3 rounded-2xl bg-[#00C853]/15 text-[#008f3a]">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-neutral-900">
                TERMS & CONDITIONS
              </h1>
              <p className="text-xs font-mono text-neutral-500 mt-0.5">
                Standard Student Agreement & Educational Terms
              </p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-neutral-700 leading-relaxed">
            <h3 className="font-display font-bold text-base text-neutral-900">1. Acceptance of Terms</h3>
            <p>
              By accessing Brownie Forex Academy website, enrolling in training cohorts, or utilizing our interactive simulator, you agree to comply with and be bound by these Terms and Conditions.
            </p>
            <h3 className="font-display font-bold text-base text-neutral-900">2. Intellectual Property Rights</h3>
            <p>
              All course curriculum, syllabus structures, videos, graphic badges, and proprietary frameworks created by Brownie Forex Academy and Brownie FX are the exclusive intellectual property of the academy and may not be reproduced, re-distributed, or resold without prior written consent.
            </p>
            <h3 className="font-display font-bold text-base text-neutral-900">3. Non-Financial Advice Acknowledgment</h3>
            <p>
              Students acknowledge that Brownie Forex Academy is an educational institution. Instructors do not provide personalized financial advice, manage third-party funds, or solicit client accounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
