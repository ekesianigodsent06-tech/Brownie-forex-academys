import React, { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Activity } from 'lucide-react';
import { MARKET_PAIRS } from '../data/academyData';
import { TickerData } from '../types';

export const ForexTicker: React.FC = () => {
  const [tickerList, setTickerList] = useState<TickerData[]>(() =>
    MARKET_PAIRS.map((pair) => {
      const initialChange = (Math.random() * 0.8 - 0.35);
      return {
        pair: pair.id,
        price: pair.basePrice,
        change: parseFloat((pair.basePrice * (initialChange / 100)).toFixed(pair.pipDecimals)),
        changePercent: parseFloat(initialChange.toFixed(2)),
        spread: pair.spreadPips,
        high24h: pair.basePrice * 1.008,
        low24h: pair.basePrice * 0.992,
        isUp: initialChange >= 0,
      };
    })
  );

  const [flashingPair, setFlashingPair] = useState<string | null>(null);

  // Live simulated tick engine
  useEffect(() => {
    const interval = setInterval(() => {
      // Pick a random pair to update
      const randomIndex = Math.floor(Math.random() * tickerList.length);
      
      setTickerList((prev) => {
        const next = [...prev];
        const item = next[randomIndex];
        const pairConfig = MARKET_PAIRS.find((p) => p.id === item.pair)!;

        // Random micro tick delta
        const deltaDirection = Math.random() > 0.48 ? 1 : -1;
        const tickDelta = deltaDirection * (pairConfig.volatility * (0.4 + Math.random() * 0.8));
        
        const newPrice = Math.max(0.0001, item.price + tickDelta);
        const diffFromBase = newPrice - pairConfig.basePrice;
        const newChangePct = (diffFromBase / pairConfig.basePrice) * 100;
        const isUp = deltaDirection > 0;

        next[randomIndex] = {
          ...item,
          price: parseFloat(newPrice.toFixed(pairConfig.pipDecimals)),
          change: parseFloat(diffFromBase.toFixed(pairConfig.pipDecimals)),
          changePercent: parseFloat(newChangePct.toFixed(2)),
          isUp,
        };

        return next;
      });

      setFlashingPair(tickerList[randomIndex]?.pair || null);
      const timer = setTimeout(() => setFlashingPair(null), 800);
      return () => clearTimeout(timer);
    }, 1800);

    return () => clearInterval(interval);
  }, [tickerList.length]);

  return (
    <div className="w-full bg-[#0a0a0c] border-y border-[#262626] py-2 overflow-hidden relative select-none">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-3 text-xs mb-1.5 text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C853] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C853]"></span>
          </span>
          <span className="font-mono uppercase tracking-wider text-[11px] text-neutral-300 font-semibold flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#D4AF37]" />
            Simulated FX Ticker
          </span>
        </div>
        <div className="text-[10px] font-mono text-neutral-400 hidden md:block">
          <span className="text-[#D4AF37]">DEMO VALUES</span> • EDUCATIONAL CHART SIMULATION
        </div>
      </div>

      {/* Marquee track */}
      <div className="flex overflow-x-hidden group">
        <div className="flex items-center gap-6 animate-[marquee_35s_linear_infinite] group-hover:[animation-play-state:paused] whitespace-nowrap">
          {[...tickerList, ...tickerList].map((item, idx) => {
            const isFlashing = flashingPair === item.pair;
            const pairConfig = MARKET_PAIRS.find((p) => p.id === item.pair);
            const decimals = pairConfig ? pairConfig.pipDecimals : 4;

            return (
              <div
                key={`${item.pair}-${idx}`}
                className={`inline-flex items-center gap-2.5 px-3 py-1 rounded-md transition-colors font-mono text-xs ${
                  isFlashing
                    ? item.isUp
                      ? 'bg-[#00C853]/20 border border-[#00C853]/50'
                      : 'bg-[#E53935]/20 border border-[#E53935]/50'
                    : 'bg-[#121214] border border-[#222]'
                }`}
              >
                <span className="font-bold text-neutral-200">{item.pair}</span>
                <span className="text-white font-semibold">
                  {item.price.toLocaleString(undefined, {
                    minimumFractionDigits: decimals,
                    maximumFractionDigits: decimals,
                  })}
                </span>
                <span
                  className={`inline-flex items-center text-[11px] font-bold ${
                    item.changePercent >= 0 ? 'text-[#00C853]' : 'text-[#E53935]'
                  }`}
                >
                  {item.changePercent >= 0 ? (
                    <ArrowUpRight className="w-3 h-3 inline mr-0.5" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 inline mr-0.5" />
                  )}
                  {item.changePercent >= 0 ? '+' : ''}
                  {item.changePercent.toFixed(2)}%
                </span>
                <span className="text-[10px] text-neutral-400 border-l border-neutral-700 pl-2">
                  Sprd: {item.spread}p
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
