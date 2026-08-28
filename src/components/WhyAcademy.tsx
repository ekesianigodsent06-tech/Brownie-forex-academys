import React from 'react';
import { BookOpen, LineChart, ShieldCheck, Laptop, CheckCircle2, ArrowRight, Brain, Sparkles, Scale, GraduationCap } from 'lucide-react';
import { PageId } from '../types';
import { ACADEMY_CONFIG } from '../data/academyData';

interface WhyAcademyProps {
  onNavigate: (page: PageId) => void;
}

export const WhyAcademy: React.FC<WhyAcademyProps> = ({ onNavigate }) => {
  const pillars = [
    {
      id: 'learn',
      title: '01. Learn The Market',
      subtitle: 'Structured Learning & Mechanics',
      description:
        'Understand why the market moves—not simply what button to press. From pip math and market structure to institutional order flow and macro drivers.',
      icon: <GraduationCap className="w-6 h-6 text-[#F5C542]" />,
      badge: 'Foundation First',
      points: ['Multi-timeframe price structure', 'Currency correlation & liquidity pools', 'Clear progressive curriculum'],
    },
    {
      id: 'understand-risk',
      title: '02. Understand The Risk',
      subtitle: 'Capital Defense & Preservation',
      description:
        'Longevity in financial markets begins with capital protection. We teach exact position sizing formulas and drawdown limitation protocols.',
      icon: <ShieldCheck className="w-6 h-6 text-[#00C853]" />,
      badge: 'Risk Management',
      points: ['1-2% strict position sizing math', 'Asymmetric Risk-to-Reward (1:3+)', 'Drawdown mitigation rules'],
    },
    {
      id: 'develop-skill',
      title: '03. Develop The Skill',
      subtitle: 'Practical Chart Application',
      description:
        'Bridge the gap between theory and execution through live chart breakdowns, systematic checklists, and our zero-risk interactive simulator.',
      icon: <LineChart className="w-6 h-6 text-[#D4AF37]" />,
      badge: 'Real-Chart Mastery',
      points: ['Interactive $10,000 demo simulator', 'Repeatable entry & exit checklists', 'Trade planning frameworks'],
    },
    {
      id: 'master-discipline',
      title: '04. Master The Discipline',
      subtitle: 'Trading Psychology & Consistency',
      description:
        'Eliminate FOMO, revenge trading, and emotional over-leveraging. Build the mental fortitude and journaling habits required for sustainable trading.',
      icon: <Brain className="w-6 h-6 text-[#00C853]" />,
      badge: 'Psychological Fortitude',
      points: ['Cognitive bias neutralization', 'Structured trade journaling logs', 'Emotional detachment habits'],
    },
  ];

  return (
    <section className="w-full bg-gradient-to-b from-[#f4f5f8] via-[#f9fafc] to-[#edf1f7] text-neutral-900 py-16 sm:py-24 border-t border-neutral-200/80 relative overflow-hidden">
      {/* Subtle luxury ambient gold & sapphire backdrop glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 ambient-glow-gold pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 ambient-glow-blue pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#856514] font-mono text-xs font-bold mb-3 uppercase tracking-wider">
            Why Choose BFXA
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-neutral-900 tracking-tight leading-tight">
            WHY BROWNIE FOREX ACADEMY?
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 mt-4 leading-relaxed">
            The financial markets can be complex, fast-moving, and highly rewarding—but they also carry significant risk. Too many aspiring traders enter the market without a proper foundation.
          </p>
          <div className="mt-4 p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm max-w-2xl mx-auto text-xs sm:text-sm font-mono font-bold text-neutral-800 uppercase tracking-wider">
            "{ACADEMY_CONFIG.slogan}"
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-2xl border border-neutral-200/80 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-[#D4AF37] transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-neutral-900 mb-1">
                  {pillar.title}
                </h3>
                <div className="text-xs font-mono font-bold text-[#856514] mb-3">
                  {pillar.subtitle}
                </div>

                <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                  {pillar.description}
                </p>

                <div className="space-y-2.5 border-t border-neutral-100 pt-4 mb-6">
                  {pillar.points.map((pt, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-neutral-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#00C853] flex-shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {pillar.id === 'develop-skill' ? (
                <button
                  onClick={() => onNavigate('simulator')}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm group/btn"
                >
                  <span>Practice On Trading Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F5C542] group-hover/btn:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  onClick={() => onNavigate('courses')}
                  className="w-full py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all cursor-pointer group/btn"
                >
                  <span>Explore Curriculum Modules</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#856514] group-hover/btn:translate-x-1 transition-transform" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

