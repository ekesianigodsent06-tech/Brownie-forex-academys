import React, { useState } from 'react';
import { 
  Briefcase, 
  ShieldCheck, 
  TrendingUp, 
  Lock, 
  Building2, 
  Percent, 
  MessageSquare, 
  ExternalLink, 
  CheckCircle2, 
  Globe, 
  Award,
  Sparkles,
  ChevronDown,
  Coins
} from 'lucide-react';
import { ACADEMY_CONFIG } from '../data/academyData';
import { saveInquiryToFirestore } from '../lib/firebase';

const CAPITAL_TIERS = [
  { amount: '$1,000', label: 'Starter Tier', min: 1000, desc: 'Entry allocation for personal accounts' },
  { amount: '$5,000', label: 'Growth Tier', min: 5000, desc: 'Enhanced compounding allocation' },
  { amount: '$7,000', label: 'Standard Tier', min: 7000, desc: 'Balanced risk portfolio' },
  { amount: '$10,000', label: 'Strategic Tier', min: 10000, desc: 'Dedicated lot sizing framework' },
  { amount: '$20,000', label: 'Premier Tier', min: 20000, desc: 'Multi-asset diversification' },
  { amount: '$50,000', label: 'Executive Tier', min: 50000, desc: 'Priority execution & weekly updates' },
  { amount: '$100,000', label: 'Institutional Tier', min: 100000, desc: 'Bespoke risk limits & reporting' },
  { amount: '$500,000', label: 'Sovereign Tier', min: 500000, desc: 'Syndicate & private treasury' },
  { amount: '$1,000,000+', label: 'Enterprise Tier', min: 1000000, desc: 'Institutional liquidity partnership' },
];

const POPULAR_BROKERS = [
  'Exness (Recommended for Gold/Forex PAMM)',
  'Deriv (Recommended for Synthetic Indices & FX)',
  'IC Markets',
  'Vantage Markets',
  'HFM (HotForex)',
  'XM Global',
  'FP Markets',
  'Other / Custom Broker...',
];

interface CapitalPartnershipSectionProps {
  onBackToHome?: () => void;
}

export const CapitalPartnershipSection: React.FC<CapitalPartnershipSectionProps> = () => {
  const [selectedTier, setSelectedTier] = useState<string>('$10,000');
  const [investorName, setInvestorName] = useState('');
  const [investorEmail, setInvestorEmail] = useState('');
  const [investorPhone, setInvestorPhone] = useState('');
  const [investorCountry, setInvestorCountry] = useState('');
  const [brokerChoice, setBrokerChoice] = useState('Exness (Recommended for Gold/Forex PAMM)');
  const [customBrokerName, setCustomBrokerName] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const effectiveBroker = brokerChoice === 'Other / Custom Broker...'
    ? (customBrokerName.trim() || 'Custom Broker (Not Specified)')
    : brokerChoice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!investorName.trim()) {
      setFormError('Please enter your full name or entity name.');
      return;
    }
    if (!investorCountry.trim()) {
      setFormError('Please enter your country of residence.');
      return;
    }
    if (!investorPhone.trim()) {
      setFormError('Please enter your phone or WhatsApp number.');
      return;
    }
    if (brokerChoice === 'Other / Custom Broker...' && !customBrokerName.trim()) {
      setFormError('Please specify the name of your preferred broker.');
      return;
    }

    setFormError('');

    // Construct VIP WhatsApp Inquiry message
    const vipMessage = 
      `💼 *VIP CAPITAL PARTNERSHIP & INVESTMENT INQUIRY*\n` +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `👤 *Investor / Partner:* ${investorName.trim()}\n` +
      `🌍 *Country:* ${investorCountry.trim()}\n` +
      `📱 *WhatsApp / Phone:* ${investorPhone.trim()}\n` +
      (investorEmail.trim() ? `📧 *Email:* ${investorEmail.trim()}\n` : '') +
      `💰 *Target Capital Tier:* ${selectedTier}\n` +
      `🏛️ *Preferred Broker:* ${effectiveBroker}\n` +
      `📊 *PAMM Model:* Non-Custodial PAMM Account\n` +
      `🎯 *Target Yield:* 80% - 100% Monthly Target\n` +
      `⚖️ *Profit Split:* 30% - 50% Performance-Based\n` +
      (notes.trim() ? `📝 *Objective / Notes:* ${notes.trim()}\n` : '') +
      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
      `_Submitted via Brownie Forex Academy Institutional Desk_`;

    const cleanNumber = (ACADEMY_CONFIG.contact.whatsappInternational || '2349038768321').replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(vipMessage)}`;

    // Background backup in Firestore
    saveInquiryToFirestore({
      name: investorName.trim(),
      email: investorEmail.trim() || 'investor@bfxa.portal',
      phone: investorPhone.trim(),
      course: `Capital Partnership: ${selectedTier} [${effectiveBroker}]`,
      message: `Country: ${investorCountry.trim()} | Broker: ${effectiveBroker} | Notes: ${notes.trim() || 'N/A'}`,
    }).catch((err) => console.warn('Firestore partnership backup note:', err));

    setSubmitted(true);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="partnership" className="w-full bg-[#07090e] text-white py-16 sm:py-24 relative overflow-hidden border-t border-[#1a2333]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0055ff]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 trading-grid-pattern opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#121826] border border-[#D4AF37]/40 shadow-lg">
            <Briefcase className="w-4 h-4 text-[#F5C542]" />
            <span className="font-mono text-xs font-bold text-[#F5C542] tracking-wider uppercase">
              Institutional & Private Capital
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
            Capital Partnership <br className="hidden sm:inline" />
            <span className="text-gold-gradient">& Investment</span>
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            Partner with <strong className="text-white">Brownie Forex Academy</strong> through an institutional, non-custodial PAMM framework. You retain 100% custody of your capital in your regulated broker account while our master traders execute high-probability positions.
          </p>
        </div>

        {/* 3 Core Institutional Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Pillar 1: Non-Custodial Capital Security */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0c121e] border border-[#1e2a40] shadow-xl hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#00C853]/15 border border-[#00C853]/30 flex items-center justify-center text-[#00C853]">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white group-hover:text-[#F5C542] transition-colors">
                100% Non-Custodial Security
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Your investment capital <strong className="text-white">never leaves your personal broker account</strong>. You hold full ownership and exclusive 24/7 withdrawal rights on Exness, Deriv, or your preferred regulated broker. We only link execution permissions via PAMM.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#1a2538] flex items-center gap-2 text-xs font-mono text-[#00C853]">
              <ShieldCheck className="w-4 h-4" />
              <span>Zero Third-Party Custody Risk</span>
            </div>
          </div>

          {/* Pillar 2: Target Performance Yield */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0c121e] border border-[#1e2a40] shadow-xl hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#F5C542]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white group-hover:text-[#F5C542] transition-colors">
                80% – 100% Target Monthly Return
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Our master execution targets <strong className="text-[#F5C542]">80% minimum to 100% maximum</strong> monthly yields through precision Smart Money Concepts (SMC) on Gold (XAU/USD), FX Majors, and Deriv Synthetic Indices, backed by strict drawdown caps.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#1a2538] flex items-center gap-2 text-xs font-mono text-[#F5C542]">
              <Sparkles className="w-4 h-4" />
              <span>Precision Institutional Execution</span>
            </div>
          </div>

          {/* Pillar 3: Aligned Profit-Split */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0c121e] border border-[#1e2a40] shadow-xl hover:border-[#D4AF37]/50 transition-all flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0088ff]/15 border border-[#0088ff]/30 flex items-center justify-center text-[#0088ff]">
                <Percent className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-xl text-white group-hover:text-[#F5C542] transition-colors">
                30% – 50% Profit Sharing
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                True partnership alignment: We operate on a <strong className="text-white">30% to 50% performance-based profit split</strong>. No fixed monthly ROI promises or hidden management fees. Our compensation is directly tied to your real, audited trading profit.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#1a2538] flex items-center gap-2 text-xs font-mono text-[#0088ff]">
              <Award className="w-4 h-4" />
              <span>100% Performance-Aligned Incentives</span>
            </div>
          </div>
        </div>

        {/* Capital Partnership Tiers & Selection Grid */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
              Capital Partnership Tiers
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400">
              Minimum capital allocation starts at $1,000 and scales up to $1,000,000+. Select your target budget to pre-fill your partnership application.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3.5 sm:gap-4">
            {CAPITAL_TIERS.map((tier) => {
              const isSelected = selectedTier === tier.amount;
              return (
                <button
                  key={tier.amount}
                  type="button"
                  onClick={() => setSelectedTier(tier.amount)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#1b253b] to-[#121929] border-[#F5C542] shadow-lg shadow-[#F5C542]/10 ring-1 ring-[#F5C542]'
                      : 'bg-[#0b101a] border-[#1c2638] hover:border-[#30405c] hover:bg-[#101724]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
                      {tier.label}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" />
                    )}
                  </div>
                  <div className="font-display font-black text-xl sm:text-2xl text-white text-gold-gradient">
                    {tier.amount}
                  </div>
                  <div className="text-[11px] text-neutral-400 mt-1 leading-snug">
                    {tier.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* VIP Inquiry Submission Form */}
        <div className="max-w-3xl mx-auto">
          <div className="rounded-3xl bg-gradient-to-b from-[#0e1524] to-[#0a0f1a] border border-[#202c42] p-6 sm:p-10 shadow-2xl relative">
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-[#1b263b]">
              <div className="w-10 h-10 rounded-xl bg-gold-gradient text-black flex items-center justify-center font-bold">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  Initiate Capital Partnership
                </h3>
                <p className="text-xs text-neutral-400">
                  Connect with the fund manager directly via VIP WhatsApp Desk
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#00C853]/10 border border-[#00C853]/30 text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-[#00C853]/20 border border-[#00C853]/40 flex items-center justify-center mx-auto text-[#00C853]">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl text-white">
                    VIP Inquiry Formatted & Ready!
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md mx-auto mt-1">
                    Thank you, <strong className="text-white">{investorName}</strong>. Your inquiry for <strong className="text-[#F5C542]">{selectedTier}</strong> on <strong className="text-white">{effectiveBroker}</strong> has been structured.
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href={`https://wa.me/${(ACADEMY_CONFIG.contact.whatsappInternational || '2349038768321').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `💼 *VIP CAPITAL PARTNERSHIP & INVESTMENT INQUIRY*\n` +
                      `━━━━━━━━━━━━━━━━━━━━━━━━━━━\n` +
                      `👤 *Investor / Partner:* ${investorName}\n` +
                      `🌍 *Country:* ${investorCountry}\n` +
                      `📱 *WhatsApp / Phone:* ${investorPhone}\n` +
                      `💰 *Target Capital Tier:* ${selectedTier}\n` +
                      `🏛️ *Preferred Broker:* ${effectiveBroker}\n` +
                      `📊 *PAMM Model:* Non-Custodial PAMM Account\n` +
                      `🎯 *Target Yield:* 80% - 100% Monthly Target\n` +
                      `⚖️ *Profit Split:* 30% - 50% Performance-Based\n` +
                      (notes ? `📝 *Notes:* ${notes}` : '')
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl bg-[#00C853] hover:bg-[#00b047] text-white font-mono font-bold text-sm shadow-lg shadow-[#00C853]/25 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Open VIP Chat in WhatsApp</span>
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setInvestorName('');
                      setInvestorEmail('');
                      setInvestorPhone('');
                      setInvestorCountry('');
                      setCustomBrokerName('');
                      setNotes('');
                    }}
                    className="text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {formError && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                    {formError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name / Entity */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-neutral-300 font-medium">
                      Investor / Entity Name <span className="text-[#F5C542]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Alex Morgan / Apex Holdings"
                      value={investorName}
                      onChange={(e) => setInvestorName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#080c14] border border-[#1f2b40] text-white text-xs sm:text-sm focus:outline-none focus:border-[#F5C542] transition-colors"
                    />
                  </div>

                  {/* Country of Residence */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-neutral-300 font-medium">
                      Country of Residence <span className="text-[#F5C542]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. United Kingdom, Nigeria, UAE, USA"
                      value={investorCountry}
                      onChange={(e) => setInvestorCountry(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#080c14] border border-[#1f2b40] text-white text-xs sm:text-sm focus:outline-none focus:border-[#F5C542] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone / WhatsApp */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-neutral-300 font-medium">
                      WhatsApp / Phone Number <span className="text-[#F5C542]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+44 ... or +234 ..."
                      value={investorPhone}
                      onChange={(e) => setInvestorPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#080c14] border border-[#1f2b40] text-white text-xs sm:text-sm focus:outline-none focus:border-[#F5C542] transition-colors"
                    />
                  </div>

                  {/* Email (Optional) */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono text-neutral-300 font-medium">
                      Email Address <span className="text-neutral-500">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="investor@domain.com"
                      value={investorEmail}
                      onChange={(e) => setInvestorEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#080c14] border border-[#1f2b40] text-white text-xs sm:text-sm focus:outline-none focus:border-[#F5C542] transition-colors"
                    />
                  </div>
                </div>

                {/* Capital Tier Selector */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-neutral-300 font-medium">
                    Allocated Capital Tier <span className="text-[#F5C542]">*</span>
                  </label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#080c14] border border-[#1f2b40] text-white text-xs sm:text-sm focus:outline-none focus:border-[#F5C542] transition-colors font-mono cursor-pointer"
                  >
                    {CAPITAL_TIERS.map((tier) => (
                      <option key={tier.amount} value={tier.amount} className="bg-[#080c14] text-white">
                        {tier.amount} — {tier.label} ({tier.desc})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Broker Selection with Custom Option */}
                <div className="space-y-2">
                  <label className="block text-xs font-mono text-neutral-300 font-medium">
                    Preferred Regulated Broker <span className="text-[#F5C542]">*</span>
                  </label>
                  <select
                    value={brokerChoice}
                    onChange={(e) => setBrokerChoice(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#080c14] border border-[#1f2b40] text-white text-xs sm:text-sm focus:outline-none focus:border-[#F5C542] transition-colors font-mono cursor-pointer"
                  >
                    {POPULAR_BROKERS.map((broker) => (
                      <option key={broker} value={broker} className="bg-[#080c14] text-white">
                        {broker}
                      </option>
                    ))}
                  </select>

                  {/* Conditional Custom Broker Input Field */}
                  {brokerChoice === 'Other / Custom Broker...' && (
                    <div className="pt-2 animate-in fade-in duration-200">
                      <input
                        type="text"
                        required
                        placeholder="Type your broker name (e.g. Pepperstone, RoboForex, Tickmill, ThinkMarkets...)"
                        value={customBrokerName}
                        onChange={(e) => setCustomBrokerName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#0e1624] border border-[#D4AF37] text-white text-xs sm:text-sm focus:outline-none placeholder:text-neutral-500 shadow-inner"
                      />
                      <p className="text-[11px] font-mono text-[#F5C542] mt-1.5">
                        ✓ You can specify any regulated MT4/MT5 broker of your choice.
                      </p>
                    </div>
                  )}
                </div>

                {/* Investment Objectives / Notes */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono text-neutral-300 font-medium">
                    Investment Objectives or Questions <span className="text-neutral-500">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your timeline, risk preferences, or existing accounts..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#080c14] border border-[#1f2b40] text-white text-xs sm:text-sm focus:outline-none focus:border-[#F5C542] transition-colors resize-none"
                  />
                </div>

                {/* Submit VIP Button */}
                <button
                  type="submit"
                  id="investor-whatsapp-submit-btn"
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5C542] to-[#D4AF37] hover:brightness-110 text-black font-mono font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#D4AF37]/20"
                >
                  <MessageSquare className="w-4 h-4 text-black" />
                  <span>Submit Partnership Inquiry via VIP WhatsApp</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </button>

                <div className="text-[11px] font-mono text-neutral-400 text-center pt-1 flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00C853]" />
                  <span>Direct VIP channel to Brownie Forex Academy Institutional Desk (+234 903 876 8321)</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
