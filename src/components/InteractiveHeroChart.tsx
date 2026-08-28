import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, ShieldCheck, Zap, Activity } from 'lucide-react';
import { Candle, Timeframe } from '../types';

export const InteractiveHeroChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<Timeframe>('15M');
  const [candles, setCandles] = useState<Candle[]>([]);
  const [currentPrice, setCurrentPrice] = useState(2915.50);
  const [priceChange, setPriceChange] = useState({ pips: 34.5, pct: 1.18, isBullish: true });
  const [selectedIndicator, setSelectedIndicator] = useState<'EMA' | 'LIQUIDITY' | 'SIGNALS'>('SIGNALS');
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate realistic initial candlestick series for Gold (XAU/USD)
  useEffect(() => {
    let price = 2902.00;
    const baseCount = 28;
    const initialCandles: Candle[] = [];
    const now = Date.now() - baseCount * 60 * 1000;

    for (let i = 0; i < baseCount; i++) {
      const isBull = Math.random() > 0.42;
      const range = 1.2 + Math.random() * 3.5;
      const open = price;
      const close = isBull ? open + range * (0.4 + Math.random() * 0.6) : open - range * (0.4 + Math.random() * 0.6);
      const high = Math.max(open, close) + Math.random() * 1.5;
      const low = Math.min(open, close) - Math.random() * 1.5;
      const volume = Math.floor(1200 + Math.random() * 3500);

      initialCandles.push({
        time: now + i * 60 * 1000,
        open,
        high,
        low,
        close,
        volume,
      });

      price = close;
    }

    setCandles(initialCandles);
    setCurrentPrice(price);
  }, [timeframe]);

  const [isVisible, setIsVisible] = useState(true);

  // Monitor visibility so we do zero work when scrolled past
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

  // Live streaming ticks updating the latest candle & creating new candles
  useEffect(() => {
    if (!isVisible) return;

    const tickTimer = setInterval(() => {
      // Pause ticker if user is in background tab or off-screen
      if (document.hidden) return;

      setCandles((prev) => {
        if (prev.length === 0) return prev;
        const lastIndex = prev.length - 1;
        const lastCandle = { ...prev[lastIndex] };

        // Micro price step for Gold
        const delta = (Math.random() - 0.47) * 0.45;
        const newClose = lastCandle.close + delta;
        const newHigh = Math.max(lastCandle.high, newClose);
        const newLow = Math.min(lastCandle.low, newClose);

        lastCandle.close = newClose;
        lastCandle.high = newHigh;
        lastCandle.low = newLow;

        const updated = [...prev];
        updated[lastIndex] = lastCandle;
        setCurrentPrice(newClose);

        const diff = newClose - updated[0].open;
        const pipDiff = diff * 10;
        setPriceChange({
          pips: parseFloat(pipDiff.toFixed(1)),
          pct: parseFloat(((diff / updated[0].open) * 100).toFixed(2)),
          isBullish: diff >= 0,
        });

        return updated;
      });
    }, 2000);

    return () => clearInterval(tickTimer);
  }, [isVisible]);

  // Compute bounding box for SVG chart
  const minPrice = candles.length ? Math.min(...candles.map((c) => c.low)) * 0.998 : 2890;
  const maxPrice = candles.length ? Math.max(...candles.map((c) => c.high)) * 1.002 : 2930;
  const priceRange = maxPrice - minPrice || 1;

  const svgWidth = 640;
  const svgHeight = 280;
  const paddingX = 20;
  const paddingY = 25;

  const getY = (val: number) => {
    return svgHeight - paddingY - ((val - minPrice) / priceRange) * (svgHeight - paddingY * 2);
  };

  const candleSpacing = candles.length > 1 ? (svgWidth - paddingX * 2) / candles.length : 15;

  // Trendline calculation for golden moving curve
  const trendPoints = candles.map((c, i) => {
    const x = paddingX + i * candleSpacing + candleSpacing / 2;
    const slice = candles.slice(Math.max(0, i - 4), i + 1);
    const avg = slice.reduce((acc, curr) => acc + curr.close, 0) / slice.length;
    const y = getY(avg);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl bg-[#0e0e11] border border-[#2a2a30] p-4 sm:p-5 shadow-2xl overflow-hidden group"
    >
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[radial-gradient(circle,_rgba(212,175,55,0.15)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[radial-gradient(circle,_rgba(0,200,83,0.12)_0%,_transparent_70%)] pointer-events-none" />

      {/* Header Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#222228] pb-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="px-2.5 py-1 rounded bg-[#18181d] border border-[#333] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00C853] animate-ping" />
            <span className="font-mono font-bold text-white text-sm">XAU/USD (Gold)</span>
            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#F5C542] font-semibold">
              Live Precious Metal
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs">
            <span className="text-white font-bold text-base">
              ${currentPrice.toFixed(2)}
            </span>
            <span
              className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                priceChange.isBullish
                  ? 'bg-[#00C853]/15 text-[#00C853]'
                  : 'bg-[#E53935]/15 text-[#E53935]'
              }`}
            >
              {priceChange.isBullish ? '+' : ''}{priceChange.pct}% ({priceChange.isBullish ? '+' : ''}{priceChange.pips} pips)
            </span>
          </div>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1 bg-[#141418] p-1 rounded-lg border border-[#26262c]">
          {(['1M', '5M', '15M', '1H', '4H', '1D'] as Timeframe[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2 py-0.5 text-xs font-mono font-medium rounded transition-all cursor-pointer ${
                timeframe === tf
                  ? 'bg-gold-gradient text-black font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-[#202026]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Tool Pill Bar */}
      <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-neutral-400">Indicators:</span>
          <button
            onClick={() => setSelectedIndicator('SIGNALS')}
            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
              selectedIndicator === 'SIGNALS'
                ? 'bg-[#D4AF37]/20 text-[#F5C542] border border-[#D4AF37]/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Structure Signals
          </button>
          <button
            onClick={() => setSelectedIndicator('EMA')}
            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
              selectedIndicator === 'EMA'
                ? 'bg-[#D4AF37]/20 text-[#F5C542] border border-[#D4AF37]/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Gold Trend (EMA 20)
          </button>
          <button
            onClick={() => setSelectedIndicator('LIQUIDITY')}
            className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
              selectedIndicator === 'LIQUIDITY'
                ? 'bg-[#00C853]/20 text-[#00C853] border border-[#00C853]/40'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Liquidity Pool
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-neutral-400">
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#00C853]" /> Bullish Candle
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#E53935] ml-2" /> Bearish Candle
          <span className="inline-block w-3 h-0.5 bg-[#F5C542] ml-2" /> Trend Path
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full h-64 sm:h-72 overflow-hidden select-none bg-[#09090b] rounded-xl border border-[#1e1e24] p-1">
        {/* Grid lines */}
        <div className="absolute inset-0 trading-grid-pattern opacity-60 pointer-events-none" />

        {/* Dynamic SVG Visual */}
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
            </linearGradient>
            <filter id="candleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Horizontal Price Grid Lines & Labels */}
          {[0.2, 0.4, 0.6, 0.8].map((ratio, idx) => {
            const priceVal = maxPrice - ratio * priceRange;
            const yPos = getY(priceVal);
            return (
              <g key={idx}>
                <line
                  x1={0}
                  y1={yPos}
                  x2={svgWidth}
                  y2={yPos}
                  stroke="#222228"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <text
                  x={svgWidth - 6}
                  y={yPos - 3}
                  fill="#666"
                  fontSize="9"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  ${priceVal.toFixed(1)}
                </text>
              </g>
            );
          })}

          {/* Liquidity Zone Overlays */}
          {selectedIndicator === 'LIQUIDITY' && (
            <>
              {/* Buy-side Liquidity Pool (BSL) */}
              <rect
                x={svgWidth * 0.4}
                y={getY(maxPrice * 0.9995)}
                width={svgWidth * 0.58}
                height={22}
                fill="#00C853"
                fillOpacity="0.12"
                stroke="#00C853"
                strokeDasharray="2 2"
                strokeWidth="1"
              />
              <text
                x={svgWidth * 0.42}
                y={getY(maxPrice * 0.9995) + 14}
                fill="#00C853"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
              >
                BSL • Buy-Side Liquidity Pool
              </text>

              {/* Sell-side Liquidity Pool (SSL) */}
              <rect
                x={svgWidth * 0.1}
                y={getY(minPrice * 1.001)}
                width={svgWidth * 0.65}
                height={22}
                fill="#E53935"
                fillOpacity="0.12"
                stroke="#E53935"
                strokeDasharray="2 2"
                strokeWidth="1"
              />
              <text
                x={svgWidth * 0.12}
                y={getY(minPrice * 1.001) + 14}
                fill="#E53935"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
              >
                SSL • Sell-Side Liquidity Pool
              </text>
            </>
          )}

          {/* Golden EMA 20 moving curve */}
          {(selectedIndicator === 'EMA' || selectedIndicator === 'SIGNALS') && (
            <polyline
              fill="none"
              stroke="#F5C542"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={trendPoints}
              opacity="0.85"
            />
          )}

          {/* Candlestick Rendering */}
          {candles.map((candle, idx) => {
            const xCenter = paddingX + idx * candleSpacing + candleSpacing / 2;
            const isBull = candle.close >= candle.open;
            const candleColor = isBull ? '#00C853' : '#E53935';

            const yHigh = getY(candle.high);
            const yLow = getY(candle.low);
            const yOpen = getY(candle.open);
            const yClose = getY(candle.close);

            const bodyTop = Math.min(yOpen, yClose);
            const bodyHeight = Math.max(2, Math.abs(yOpen - yClose));
            const candleWidth = Math.max(3, candleSpacing * 0.68);

            return (
              <g key={candle.time} className="transition-all duration-150">
                {/* Wick */}
                <line
                  x1={xCenter}
                  y1={yHigh}
                  x2={xCenter}
                  y2={yLow}
                  stroke={candleColor}
                  strokeWidth="1.2"
                  opacity="0.9"
                />

                {/* Candle Body */}
                <rect
                  x={xCenter - candleWidth / 2}
                  y={bodyTop}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={isBull ? '#00C853' : '#E53935'}
                  rx="1"
                  filter={idx === candles.length - 1 ? 'url(#candleGlow)' : undefined}
                />
              </g>
            );
          })}

          {/* Smart Money Concept (SMC) Annotation Badges */}
          {selectedIndicator === 'SIGNALS' && candles.length > 15 && (
            <>
              {/* Break of Structure (BOS) */}
              <g transform={`translate(${paddingX + 11 * candleSpacing}, ${getY(candles[11]?.high || 2920) - 18})`}>
                <rect x="-24" y="-12" width="48" height="18" rx="4" fill="#181822" stroke="#D4AF37" strokeWidth="1" />
                <text x="0" y="1" fill="#F5C542" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  BOS ↑
                </text>
              </g>

              {/* Order Block (OB) Entry Zone */}
              <g transform={`translate(${paddingX + 18 * candleSpacing}, ${getY(candles[18]?.low || 2905) + 12})`}>
                <rect x="-30" y="-12" width="60" height="18" rx="4" fill="#0c1e13" stroke="#00C853" strokeWidth="1" />
                <text x="0" y="1" fill="#00C853" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  SNIPER OB
                </text>
              </g>
            </>
          )}

          {/* Current Live Price Line with Tag */}
          <line
            x1={0}
            y1={getY(currentPrice)}
            x2={svgWidth}
            y2={getY(currentPrice)}
            stroke="#00C853"
            strokeDasharray="2 2"
            strokeWidth="1"
            opacity="0.75"
          />
          <rect
            x={svgWidth - 56}
            y={getY(currentPrice) - 9}
            width={52}
            height={18}
            rx="3"
            fill="#00C853"
          />
          <text
            x={svgWidth - 30}
            y={getY(currentPrice) + 3}
            fill="#000"
            fontSize="9"
            fontFamily="monospace"
            fontWeight="bold"
            textAnchor="middle"
          >
            ${currentPrice.toFixed(1)}
          </text>
        </svg>
      </div>

      {/* Footer live status bar */}
      <div className="mt-3 pt-3 border-t border-[#222228] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[#00C853] font-bold">
            <ShieldCheck className="w-3.5 h-3.5" /> Guaranteed Profit Strategy
          </span>
          <span className="hidden sm:inline text-neutral-500">|</span>
          <span className="hidden sm:inline text-neutral-300">
            Gold (XAU/USD) & Synthetic Indices Focus
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-[#F5C542] flex items-center gap-1 font-semibold">
            <Zap className="w-3.5 h-3.5 text-[#F5C542]" /> Institutional SMC Engine
          </span>
        </div>
      </div>
    </div>
  );
};
