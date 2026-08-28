import React from 'react';
import { 
  User, 
  Sparkles, 
  Award, 
  Target, 
  ShieldCheck, 
  CheckCircle, 
  MessageSquare, 
  Send, 
  Calendar, 
  Building2, 
  MapPin, 
  ArrowRight,
  BookOpen,
  LineChart,
  Brain,
  Quote
} from 'lucide-react';
import { ACADEMY_CONFIG } from '../data/academyData';
import { PageId } from '../types';

interface FounderSectionProps {
  onNavigate?: (page: PageId) => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ onNavigate }) => {
  return (
    <div id="founder-section" className="w-full bg-gradient-to-b from-[#f4f5f8] via-[#edf2f9] to-[#e4ebf5] text-neutral-900 py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 ambient-glow-gold pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 ambient-glow-blue pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#856514] font-mono text-xs font-bold mb-3 uppercase tracking-wider">
            Leadership & Mentorship
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-neutral-900 tracking-tight leading-tight uppercase">
            MEET THE FOUNDER & LEAD INSTRUCTOR
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 mt-4 leading-relaxed font-medium">
            Discover the vision, experience, and educational philosophy behind Brownie Forex Academy (BFXA).
          </p>
        </div>

        {/* Hero Founder Profile Box */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Founder Card / Visual Profile */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-[#181820] to-[#08080a] border-2 border-[#D4AF37] p-4 shadow-2xl relative">
                
                <div className="w-full rounded-2xl bg-[#111116] flex flex-col items-center p-6 border border-[#2b2b38] text-center space-y-5">
                  {/* Avatar Frame / Founder Photo */}
                  <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gold-gradient p-1 shadow-2xl overflow-hidden flex-shrink-0">
                    <div className="w-full h-full rounded-[22px] bg-black flex items-center justify-center overflow-hidden">
                      {ACADEMY_CONFIG.founder.photoUrl ? (
                        <img 
                          src={ACADEMY_CONFIG.founder.photoUrl} 
                          alt={`${ACADEMY_CONFIG.founder.fullName} - Founder & Lead Instructor of Brownie Forex Academy`}
                          width={176}
                          height={176}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            // Fallback to academy square logo if image fails to load
                            if (!e.currentTarget.src.includes('brownie-logo-square.jpg')) {
                              e.currentTarget.src = '/brownie-logo-square.jpg';
                            }
                          }}
                        />
                      ) : (
                        <img 
                          src="/brownie-logo-square.jpg" 
                          alt={`${ACADEMY_CONFIG.founder.fullName} - Founder & Lead Instructor`}
                          width={176}
                          height={176}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <h2 className="font-display font-black text-2xl text-white tracking-tight">
                      {ACADEMY_CONFIG.founder.fullName}
                    </h2>
                    <div className="inline-block mt-1 px-3 py-0.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#F5C542] font-mono text-xs font-bold">
                      {ACADEMY_CONFIG.founder.professionalName}
                    </div>
                    <div className="text-xs text-neutral-400 font-mono mt-1.5 font-semibold">
                      {ACADEMY_CONFIG.founder.title}
                    </div>
                  </div>

                  {/* Quick Profile Specs */}
                  <div className="w-full space-y-2.5 pt-4 border-t border-[#262634] text-xs font-mono text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Founded:</span>
                      </span>
                      <span className="text-white font-bold">{ACADEMY_CONFIG.founder.founded}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#00C853]" />
                        <span>Affiliation:</span>
                      </span>
                      <span className="text-[#00C853] font-bold truncate max-w-[170px]">
                        {ACADEMY_CONFIG.founder.affiliation}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#E53935]" />
                        <span>Base:</span>
                      </span>
                      <span className="text-white font-bold">{ACADEMY_CONFIG.founder.location}</span>
                    </div>
                  </div>

                  {/* Community Quick Links */}
                  <div className="w-full pt-3 flex flex-col gap-2">
                    <a
                      href={ACADEMY_CONFIG.contact.whatsappCommunity}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl bg-[#00C853] hover:bg-[#009624] text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors shadow-md"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Join WhatsApp Community</span>
                    </a>

                    <a
                      href={ACADEMY_CONFIG.contact.telegramCommunity}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-3 rounded-xl bg-[#229ED9] hover:bg-[#1a80b0] text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors shadow-md"
                    >
                      <Send className="w-4 h-4" />
                      <span>Join Telegram Community</span>
                    </a>
                  </div>
                </div>

                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-gradient text-black font-mono text-[10px] font-black uppercase tracking-wider shadow-lg whitespace-nowrap">
                  Founder & Head Trader
                </div>
              </div>
            </div>

            {/* Right: Full Biography & Vision Statement */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00C853]/15 text-[#008f3a] font-mono text-xs font-bold uppercase">
                  <Sparkles className="w-3.5 h-3.5" /> Official Biography
                </div>
                <h2 className="font-display font-black text-2xl sm:text-4xl text-neutral-900 leading-tight">
                  {ACADEMY_CONFIG.founder.fullName}
                </h2>
                <div className="text-xs sm:text-sm font-mono text-[#856514] font-bold uppercase tracking-wider">
                  Founder, {ACADEMY_CONFIG.name} • Known as {ACADEMY_CONFIG.founder.professionalName}
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed">
                {ACADEMY_CONFIG.founder.bio.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx}>
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Founder's Direct Quote */}
              <div className="p-6 rounded-2xl bg-[#0c0c10] border border-[#262632] text-white relative overflow-hidden shadow-md space-y-3">
                <Quote className="w-8 h-8 text-[#D4AF37]/40 absolute top-3 right-4 pointer-events-none" />
                <div className="text-xs font-mono font-bold text-[#F5C542] uppercase tracking-wider">
                  The Founder's Standard
                </div>
                <blockquote className="text-xs sm:text-sm italic text-neutral-300 leading-relaxed">
                  "{ACADEMY_CONFIG.founder.quote}"
                </blockquote>
                <div className="text-xs font-mono text-neutral-400">
                  — {ACADEMY_CONFIG.founder.fullName} ({ACADEMY_CONFIG.founder.professionalName})
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 3 Core Pillars of Lucy's Teaching */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="font-display font-black text-2xl sm:text-3xl text-neutral-900 uppercase">
              The Lead Instructor's Teaching Philosophy
            </h2>
            <p className="text-sm text-neutral-600 mt-2 font-mono">
              "Learn the market. Understand the risk. Develop the skill. Master the discipline."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 text-[#856514] flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-neutral-900">
                1. Structural Foundation
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Understanding why prices move across market sessions, decoding liquidity pools, and recognizing high-probability institutional setups rather than relying on indicators.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#00C853]/15 text-[#008f3a] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-neutral-900">
                2. Risk As Absolute Priority
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Teaching capital preservation from Day 1. No trader succeeds long term without mastering position sizing math, drawdown limits, and stop loss defense.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="font-display font-bold text-lg text-neutral-900">
                3. Psychological Discipline
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Transforming mindset from impulsive lottery expectations to a calm, rule-based execution process that withstands winning and losing streaks alike.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Banner */}
        <div className="bg-[#0c0c10] border border-[#262630] rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 ambient-glow-gold pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="font-mono text-xs font-bold text-[#F5C542] uppercase tracking-wider">
              Ready to learn from Lucy (Brownie_Fx)?
            </span>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white">
              START YOUR TRADING EDUCATION JOURNEY TODAY
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Explore our structured course curriculum or join our official community to receive market updates and class announcements.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              {onNavigate && (
                <button
                  id="founder-explore-courses-btn"
                  onClick={() => onNavigate('courses')}
                  className="px-6 py-3 rounded-xl bg-gold-gradient hover:opacity-95 text-black font-mono font-bold text-xs shadow-lg transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Explore Course Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <a
                href={ACADEMY_CONFIG.contact.whatsappCommunity}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-[#00C853] hover:bg-[#009624] text-white font-mono font-bold text-xs shadow-lg transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Join Official WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

