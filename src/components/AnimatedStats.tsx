import React, { useEffect, useState } from 'react';
import { BookOpen, Target, Clock, Laptop, ShieldCheck } from 'lucide-react';

interface StatItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

export const AnimatedStats: React.FC = () => {
  const stats: StatItem[] = [
    {
      id: 'modules',
      target: 10,
      suffix: '+',
      label: 'Learning Modules',
      sublabel: 'Structured from beginner basics to institutional analysis',
      icon: <BookOpen className="w-5 h-5 text-[#F5C542]" />,
    },
    {
      id: 'practical',
      target: 100,
      suffix: '%',
      label: 'Practical Focus',
      sublabel: 'Zero fluff, real chart examples & disciplined execution',
      icon: <Target className="w-5 h-5 text-[#00C853]" />,
    },
    {
      id: 'access',
      target: 24,
      suffix: '/7',
      label: 'Learning Access',
      sublabel: 'Self-paced course curriculum & mentor office hours',
      icon: <Clock className="w-5 h-5 text-[#F5C542]" />,
    },
    {
      id: 'simulator',
      target: 1,
      suffix: '',
      label: 'Interactive Simulator',
      sublabel: 'Test execution skills without risking real capital',
      icon: <Laptop className="w-5 h-5 text-[#00C853]" />,
    },
  ];

  const [counts, setCounts] = useState<{ [key: string]: number }>({
    modules: 10,
    practical: 100,
    access: 24,
    simulator: 1,
  });
  const sectionRef = React.useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const startTime = performance.now();
          const duration = 1200;

          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts({
              modules: Math.floor(ease * 10),
              practical: Math.floor(ease * 100),
              access: Math.floor(ease * 24),
              simulator: Math.min(1, Math.floor(ease * 1.5)),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="w-full bg-[#0d0d10] border-y border-[#202026] py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-32 ambient-glow-gold pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-[#141419] border border-[#262630] rounded-2xl p-5 hover:border-[#D4AF37]/40 transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-[#1b1b24] border border-[#333340] group-hover:scale-105 transition-transform">
                  {stat.icon}
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  Verified Metric
                </span>
              </div>

              <div className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight flex items-baseline gap-0.5">
                <span>{counts[stat.id] ?? stat.target}</span>
                <span className="text-gold-gradient">{stat.suffix}</span>
              </div>

              <div className="font-display font-bold text-sm sm:text-base text-neutral-200 mt-1">
                {stat.label}
              </div>

              <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                {stat.sublabel}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
