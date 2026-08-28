import React from 'react';
import { Target, Compass, Award, Shield, User, Sparkles, MessageSquare, BookOpen, Layers, Users, TrendingUp, CheckCircle, ArrowRight, Building2, MapPin, Calendar, HeartHandshake, ShieldCheck } from 'lucide-react';
import { ACADEMY_CONFIG } from '../data/academyData';
import { Logo } from './Logo';
import { PageId } from '../types';

interface AboutSectionProps {
  onNavigate?: (page: PageId) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-gradient-to-b from-[#f4f5f8] via-[#edf2f9] to-[#e4ebf5] text-neutral-900 py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 ambient-glow-gold pointer-events-none" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 ambient-glow-blue pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-20 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#856514] font-mono text-xs font-bold mb-3 uppercase tracking-wider">
            About Brownie Forex Academy (BFXA)
          </div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-neutral-900 tracking-tight leading-tight uppercase">
            Where Knowledge Becomes Strategy
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 mt-4 leading-relaxed font-medium">
            {ACADEMY_CONFIG.subTagline}
          </p>
        </div>

        {/* Story & Institution Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 text-white font-mono text-xs font-semibold">
              Established in 2023 • Abuja, Nigeria
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-neutral-900 leading-tight">
              Structured, Practical & Responsible Forex Education
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-neutral-600 leading-relaxed">
              <p>
                <strong>Brownie Forex Academy (BFXA)</strong> is a professional forex education and trader-development academy founded in 2023 by <strong>Lucy Ogochukwu Ofozor</strong>, widely known as <strong>Brownie_Fx</strong>.
              </p>
              <p>
                BFXA was established with a clear purpose: to provide structured, practical, and responsible forex education to individuals who want to understand the financial markets beyond the surface.
              </p>
              <p>
                We believe that trading is not simply about finding an entry point. It is about understanding the market, managing risk, controlling emotions, developing discipline, and continuously improving one's decision-making process.
              </p>
              <p>
                Whether you are taking your first steps into forex or seeking to strengthen your existing knowledge, Brownie Forex Academy is designed to provide an environment where learning is intentional, practical, and progressive.
              </p>
            </div>

            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#856514] uppercase">
                  <Target className="w-4 h-4 text-[#D4AF37]" />
                  <span>Our Vision</span>
                </div>
                <div className="text-xs text-neutral-700 leading-relaxed">
                  To build a new generation of knowledgeable, disciplined, and responsible traders.
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#008f3a] uppercase">
                  <Award className="w-4 h-4 text-[#00C853]" />
                  <span>Our Mission</span>
                </div>
                <div className="text-xs text-neutral-700 leading-relaxed">
                  <strong>Education before execution.</strong> To simplify forex education without compromising depth or quality.
                </div>
              </div>
            </div>
          </div>

          {/* Right Brand Card */}
          <div className="lg:col-span-6 bg-[#0c0c10] border border-[#262630] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 trading-grid-pattern opacity-30 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 ambient-glow-gold pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <Logo size="hero" variant="card" className="mb-6 max-w-md w-full" />

              <div className="inline-block px-4 py-1.5 rounded-full bg-[#1c1c24] border border-[#D4AF37]/40 text-[#F5C542] font-mono text-xs font-bold uppercase tracking-wider mb-4">
                {ACADEMY_CONFIG.philosophy}
              </div>

              <blockquote className="italic text-sm text-neutral-300 border-t border-b border-[#242430] py-4 my-2 leading-relaxed max-w-lg">
                "{ACADEMY_CONFIG.founder.quote}"
              </blockquote>

              <div className="text-xs font-mono text-[#F5C542] mt-3">
                — {ACADEMY_CONFIG.founder.fullName} ({ACADEMY_CONFIG.founder.professionalName}), {ACADEMY_CONFIG.founder.title}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-neutral-900/80 border border-[#333] text-[11px] font-mono text-neutral-300">
                  Specialization: Gold, BTC/USD & Synthetics
                </span>
                <span className="px-3 py-1 rounded-full bg-neutral-900/80 border border-[#333] text-[11px] font-mono text-neutral-300">
                  Location: Abuja, Nigeria
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* FOUNDER & LEAD INSTRUCTOR SPOTLIGHT */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-12 shadow-md">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Founder Profile Card (5 cols) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[280px] rounded-3xl bg-gradient-to-br from-[#181820] to-[#08080a] border-2 border-[#D4AF37] p-3 shadow-2xl group">
                <div className="w-full rounded-2xl bg-[#111116] flex flex-col items-center p-6 border border-[#2a2a36] text-center space-y-4">
                  <div className="w-28 h-28 rounded-2xl bg-gold-gradient p-1 shadow-lg overflow-hidden flex-shrink-0">
                    <div className="w-full h-full rounded-[14px] bg-black flex items-center justify-center overflow-hidden">
                      {ACADEMY_CONFIG.founder.photoUrl ? (
                        <img 
                          src={ACADEMY_CONFIG.founder.photoUrl} 
                          alt={`${ACADEMY_CONFIG.founder.fullName} - Founder & Lead Instructor`} 
                          width={144}
                          height={144}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            if (!e.currentTarget.src.includes('brownie-logo-square.jpg')) {
                              e.currentTarget.src = '/brownie-logo-square.jpg';
                            }
                          }}
                        />
                      ) : (
                        <img 
                          src="/brownie-logo-square.jpg" 
                          alt={`${ACADEMY_CONFIG.founder.fullName} - Founder & Lead Instructor`}
                          width={144}
                          height={144}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-lg text-white">
                      {ACADEMY_CONFIG.founder.fullName}
                    </h4>
                    <div className="text-xs font-mono text-[#F5C542] font-bold mt-0.5">
                      {ACADEMY_CONFIG.founder.professionalName}
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono mt-1">
                      {ACADEMY_CONFIG.founder.title}
                    </div>
                  </div>

                  <div className="w-full space-y-1.5 pt-3 border-t border-[#262632] text-[11px] font-mono text-neutral-300 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">Academy Founded:</span>
                      <span className="text-white font-bold">{ACADEMY_CONFIG.founder.founded}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">Affiliation:</span>
                      <span className="text-[#00C853] font-bold truncate max-w-[130px]">{ACADEMY_CONFIG.founder.affiliation}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-neutral-500">Based in:</span>
                      <span className="text-white font-bold">{ACADEMY_CONFIG.founder.location}</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-gradient text-black font-mono text-[10px] font-black uppercase tracking-wider shadow-lg whitespace-nowrap">
                  Founder & Lead Instructor
                </div>
              </div>
            </div>

            {/* Founder Bio Info (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00C853]/15 text-[#008f3a] font-mono text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" /> Instructor Profile
              </div>

              <h3 className="font-display font-black text-2xl sm:text-3xl text-neutral-900">
                {ACADEMY_CONFIG.founder.fullName}{' '}
                <span className="text-[#856514] font-normal text-xl font-mono">({ACADEMY_CONFIG.founder.professionalName})</span>
              </h3>
              
              <div className="text-xs font-mono text-neutral-500 font-bold uppercase tracking-wider">
                Founder, Brownie Forex Academy • Lead Instructor
              </div>

              <div className="text-sm text-neutral-600 leading-relaxed space-y-3">
                <p>
                  <strong>Lucy Ogochukwu Ofozor</strong>, professionally known as <strong>Brownie_Fx</strong>, is the Founder and Lead Instructor of Brownie Forex Academy.
                </p>
                <p>
                  With a passion for forex trading and financial-market education, Lucy founded BFXA in 2023 with the ambition of creating a structured learning platform for aspiring traders. Her approach to trading education is centered around practical knowledge, market understanding, discipline, risk awareness, and continuous development.
                </p>
                <p>
                  Through Brownie Forex Academy, her focus is to help students move beyond the excitement surrounding forex and develop a deeper understanding of what it takes to approach the market with institutional preparation, discipline, and guaranteed profit risk management.
                </p>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-3">
                {onNavigate && (
                  <button
                    onClick={() => onNavigate('founder')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-mono font-bold transition-all shadow-md cursor-pointer"
                  >
                    <User className="w-4 h-4 text-[#F5C542]" />
                    <span>View Dedicated Founder Page</span>
                  </button>
                )}
                <a
                  href={ACADEMY_CONFIG.contact.whatsappCommunity}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00C853] hover:bg-[#009624] text-white text-xs font-mono font-bold transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Join BFXA WhatsApp Community</span>
                </a>
                <a
                  href={ACADEMY_CONFIG.contact.telegramCommunity}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#229ED9] hover:bg-[#1a80b0] text-white text-xs font-mono font-bold transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Join BFXA Telegram Community</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 6 CORE VALUES */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#856514] font-mono text-xs font-bold uppercase mb-2">
              Our Principles
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-neutral-900">
              OUR CORE VALUES
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              These six core tenets define our culture, our instructional methodology, and our institutional commitment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACADEMY_CONFIG.coreValues.map((val) => (
              <div
                key={val.num}
                className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm hover:border-[#D4AF37] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono font-black text-lg text-[#856514] px-3 py-1 rounded-lg bg-[#D4AF37]/15">
                      {val.num}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-neutral-300 group-hover:bg-[#00C853] transition-colors" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-neutral-900 mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* THE BFXA EXPERIENCE: LEARN → APPLY → DEVELOP */}
        <div className="bg-[#0e0e13] rounded-3xl border border-[#262632] p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-1/4 w-72 h-72 ambient-glow-gold pointer-events-none" />
          
          <div className="relative z-10 max-w-5xl mx-auto space-y-10">
            <div className="text-center max-w-2xl mx-auto">
              <span className="font-mono text-xs font-bold text-[#F5C542] uppercase tracking-wider">
                The BFXA Experience
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-white mt-1">
                Learn With Purpose. Practice With Discipline. Grow With Knowledge.
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed">
                At BFXA, we believe quality education should be more than a collection of recorded lessons. Our educational philosophy is built around three progressive stages:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {ACADEMY_CONFIG.stages.map((stg) => (
                <div
                  key={stg.step}
                  className="p-6 rounded-2xl bg-[#14141c] border border-[#2b2b38] hover:border-[#D4AF37] transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-[#F5C542] bg-[#F5C542]/10 px-2.5 py-1 rounded-md border border-[#F5C542]/30">
                      STAGE {stg.step}
                    </span>
                    <span className="font-display font-black text-xl text-white tracking-widest">
                      {stg.title}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-sm text-[#00C853]">
                    {stg.action}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {stg.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WHAT WE TEACH */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C853]/15 text-[#008f3a] font-mono text-xs font-bold uppercase mb-2">
              Comprehensive Curriculum
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-neutral-900">
              WHAT WE TEACH
            </h2>
            <p className="text-sm text-neutral-600 mt-2">
              Brownie Forex Academy focuses on developing the knowledge and foundational skills required to understand the forex market. Our programs are designed to help students understand why the market moves—not simply what button to press.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {ACADEMY_CONFIG.curriculumAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-white border border-neutral-200 shadow-sm flex items-center gap-3 hover:border-[#00C853] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#00C853]/10 text-[#008f3a] flex items-center justify-center flex-shrink-0 font-mono text-xs font-bold">
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
                <span className="font-medium text-xs sm:text-sm text-neutral-800">
                  {area}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* OUR PROMISE TO STUDENTS */}
        <div className="bg-white rounded-3xl border-2 border-[#D4AF37]/60 p-8 sm:p-12 shadow-lg">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 font-mono text-xs font-bold uppercase">
                <ShieldCheck className="w-4 h-4 text-red-600" />
                Our Institutional Pledge
              </div>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-neutral-900">
                OUR PROMISE TO STUDENTS
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {ACADEMY_CONFIG.promise.pledges.map((pledge, i) => (
                <div key={i} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-xs sm:text-sm text-neutral-800 font-semibold flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                  <span>{pledge}</span>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-[#0c0c10] text-white text-xs sm:text-sm leading-relaxed border border-[#262630] space-y-2">
              <div className="text-[#F5C542] font-bold font-mono uppercase tracking-wider text-xs">
                What Brownie Forex Academy Delivers Instead:
              </div>
              <p className="text-neutral-300">
                {ACADEMY_CONFIG.promise.value}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

