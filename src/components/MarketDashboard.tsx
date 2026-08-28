import React, { useEffect, useState, useRef } from 'react';
import { Activity, Globe, TrendingUp, TrendingDown, Clock, ShieldCheck } from 'lucide-react';
import { ACADEMY_CONFIG } from '../data/academyData';

interface PriceCardData {
  price: number;
  change: number;
  isUp: boolean;
  type: string;
}

export const MarketDashboard: React.FC = () => {
  const [prices, setPrices] = useState<Record<string, PriceCardData>>({
    'XAU/USD': { price: 2915.40, change: 1.45, isUp: true, type: 'Gold / US Dollar' },
    'BTC/USD': { price: 92450.00, change: 3.12, isUp: true, type: 'Bitcoin / US Dollar' },
    'VIX 75': { price: 428500.00, change: 2.15, isUp: true, type: 'Volatility 75 Index' },
    'BOOM 1000': { price: 12450.00, change: -0.42, isUp: false, type: 'Boom 1000 Index' },
  });

  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Simulated micro tick jitter for specialized assets
  useEffect(() => {
    if (!isVisible) return;

    const timer = setInterval(() => {
      if (document.hidden) return;

      setPrices((prev) => {
        const next = { ...prev };
        const keys = Object.keys(next);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        const item = next[randomKey];
        const delta = (Math.random() - 0.47) * (randomKey.includes('VIX') ? 65 : randomKey.includes('BTC') ? 45.0 : randomKey.includes('XAU') ? 0.75 : 4.5);
        const newPrice = Math.max(0.001, item.price + delta);
        const isUp = delta >= 0;

        next[randomKey] = {
          ...item,
          price: parseFloat(newPrice.toFixed(2)),
          change: parseFloat((item.change + (delta > 0 ? 0.05 : -0.05)).toFixed(2)),
          isUp,
        };

        return next;
      });
    }, 2500);

    return () => clearInterval(timer);
  }, [isVisible]);

  const marketSessions = [
    { name: 'London Session (Gold & Metals Open)', status: 'PEAK LIQUIDITY', volume: 'Prime Gold Volatility', hours: '08:00 - 16:00 GMT', color: 'text-[#00C853] bg-[#00C853]/15' },
    { name: 'New York Session (BTC & Gold Overlap)', status: 'ACTIVE', volume: 'Massive Gold & Crypto Volume', hours: '13:00 - 21:00 GMT', color: 'text-[#00C853] bg-[#00C853]/15' },
    { name: 'Synthetic 24/7 Engine (VIX / Boom)', status: 'ALWAYS ACTIVE', volume: 'Constant Volatility', hours: '24 Hours / 7 Days / 365', color: 'text-[#F5C542] bg-[#F5C542]/15' },
    { name: 'Asian Session (Range Formulation)', status: 'ACCUMULATION', volume: 'Range Formulation', hours: '00:00 - 08:00 GMT', color: 'text-neutral-400 bg-neutral-800' },
  ];

  return (
    <section ref={containerRef} className="w-full bg-[#0a0a0d] border-t border-[#202028] py-16 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#F5C542] uppercase tracking-wider mb-2 font-bold">
              <Activity className="w-4 h-4" />
              <span>Specialized Trading Assets</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
              GOLD, BTC/USD & SYNTHETIC INDICES
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 bg-[#14141a] px-3.5 py-1.5 rounded-xl border border-[#2b2b36]">
            <span className="w-2 h-2 rounded-full bg-[#00C853] animate-ping" />
            <span>Market Specialization:</span>
            <strong className="text-[#00C853]">Guaranteed Profit Focus</strong>
          </div>
        </div>

        {/* 4 Asset Price Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {(Object.entries(prices) as [string, PriceCardData][]).map(([pair, data]) => {
            const isBull = data.change >= 0;
            return (
              <div
                key={pair}
                className="bg-[#121217] border border-[#242430] hover:border-[#D4AF37]/50 rounded-2xl p-5 transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1">
                  <span className="font-bold text-white text-base">{pair}</span>
                  <span className="text-[10px] uppercase text-[#F5C542] font-semibold">{data.type}</span>
                </div>

                <div className="font-mono font-black text-2xl sm:text-3xl text-white my-2">
                  {pair.startsWith('X') ? '$' : ''}{data.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>

                <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#1e1e28]">
                  <span className={`inline-flex items-center gap-0.5 font-bold ${isBull ? 'text-[#00C853]' : 'text-[#E53935]'}`}>
                    {isBull ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {isBull ? '+' : ''}{data.change}%
                  </span>
                  <span className="text-neutral-400 text-[11px]">Active Tick</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Grid: Market Sessions + Strategy Framework */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Forex & Synthetics Sessions Matrix (7 Cols) */}
          <div className="lg:col-span-7 bg-[#121217] border border-[#242430] rounded-2xl p-6">
            <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#D4AF37]" />
              Market Sessions & Volatility Windows
            </h3>

            <div className="space-y-3">
              {marketSessions.map((session, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#181820] border border-[#262634] text-xs font-mono"
                >
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${session.color}`}>
                      {session.status}
                    </span>
                    <div>
                      <div className="font-bold text-white">{session.name}</div>
                      <div className="text-[11px] text-neutral-400">{session.hours}</div>
                    </div>
                  </div>

                  <div className="text-right text-neutral-300 text-xs">
                    <span className="text-[#F5C542]">{session.volume}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Educational Framework & Slogan Notice (5 Cols) */}
          <div className="lg:col-span-5 bg-[#121217] border border-[#242430] rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-bold text-lg text-white mb-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#00C853]" />
                Guaranteed Profit Framework
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans mb-4">
                At Brownie Forex Academy, we teach students to focus solely on high-volatility assets where clear market structures generate guaranteed profit.
              </p>
              <div className="p-3.5 rounded-xl bg-[#191924] border border-[#2d2d40] text-xs font-mono text-neutral-200">
                <div className="text-[#F5C542] font-bold uppercase mb-1">{ACADEMY_CONFIG.slogan}</div>
                <div className="text-neutral-400 text-[11px] leading-relaxed">
                  {ACADEMY_CONFIG.tagline}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#20202a] flex items-center gap-2 text-xs font-mono text-[#00C853] font-bold">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Mentorship by Brownie Fx (Founder & Lead Instructor)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
