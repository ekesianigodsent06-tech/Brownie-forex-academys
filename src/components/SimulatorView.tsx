import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Layers,
  BarChart2,
  DollarSign,
  Maximize2,
  Minimize2,
  Info,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { MARKET_PAIRS } from '../data/academyData';
import { Candle, CurrencyPairId, PositionType, Timeframe, TradePosition, ClosedTrade } from '../types';

export const SimulatorView: React.FC = () => {
  // Simulator State
  const [selectedPair, setSelectedPair] = useState<CurrencyPairId>('XAU/USD');
  const [timeframe, setTimeframe] = useState<Timeframe>('5M');
  const [balance, setBalance] = useState<number>(() => {
    const saved = localStorage.getItem('bfa_sim_balance');
    return saved ? parseFloat(saved) : 10000;
  });
  const [openPositions, setOpenPositions] = useState<TradePosition[]>(() => {
    const saved = localStorage.getItem('bfa_sim_positions');
    return saved ? JSON.parse(saved) : [];
  });
  const [closedTrades, setClosedTrades] = useState<ClosedTrade[]>(() => {
    const saved = localStorage.getItem('bfa_sim_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Order Form Inputs
  const [lotSize, setLotSize] = useState<number>(0.10);
  const [stopLossPips, setStopLossPips] = useState<number>(25);
  const [takeProfitPips, setTakeProfitPips] = useState<number>(50);
  const [activeTab, setActiveTab] = useState<'positions' | 'history' | 'calculator'>('positions');
  const [chartType, setChartType] = useState<'candlestick' | 'line'>('candlestick');
  const [showNotification, setShowNotification] = useState<{ message: string; type: 'success' | 'danger' | 'info' } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Monitor visibility so simulator does not waste mobile CPU / GPU when scrolled past
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

  // Active pair details
  const pairInfo = useMemo(() => {
    return MARKET_PAIRS.find((p) => p.id === selectedPair) || MARKET_PAIRS[0];
  }, [selectedPair]);

  // Real-time market state for chart
  const [currentPrice, setCurrentPrice] = useState<number>(pairInfo.basePrice);
  const [candles, setCandles] = useState<Candle[]>([]);

  // Persistent storage helper
  useEffect(() => {
    localStorage.setItem('bfa_sim_balance', balance.toString());
  }, [balance]);

  useEffect(() => {
    localStorage.setItem('bfa_sim_positions', JSON.stringify(openPositions));
  }, [openPositions]);

  useEffect(() => {
    localStorage.setItem('bfa_sim_history', JSON.stringify(closedTrades));
  }, [closedTrades]);

  // Generate initial candle series when pair or timeframe changes
  useEffect(() => {
    let price = pairInfo.basePrice;
    const count = 35;
    const generated: Candle[] = [];
    const now = Date.now() - count * 60 * 1000;

    for (let i = 0; i < count; i++) {
      const isBull = Math.random() > 0.47;
      const step = pairInfo.volatility * (0.5 + Math.random() * 1.5);
      const open = price;
      const close = isBull ? open + step : open - step;
      const high = Math.max(open, close) + pairInfo.volatility * Math.random() * 0.8;
      const low = Math.min(open, close) - pairInfo.volatility * Math.random() * 0.8;
      const volume = Math.floor(800 + Math.random() * 2500);

      generated.push({
        time: now + i * 60 * 1000,
        open,
        high,
        low,
        close,
        volume,
      });

      price = close;
    }

    setCandles(generated);
    setCurrentPrice(price);
  }, [selectedPair, timeframe, pairInfo]);

  // Live streaming ticks & price movement engine
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      if (document.hidden) return;

      const deltaDirection = Math.random() > 0.48 ? 1 : -1;
      const delta = deltaDirection * (pairInfo.volatility * (0.3 + Math.random() * 0.9));

      setCandles((prev) => {
        if (!prev.length) return prev;
        const lastIdx = prev.length - 1;
        const last = { ...prev[lastIdx] };
        const newClose = Math.max(0.0001, last.close + delta);
        last.close = newClose;
        last.high = Math.max(last.high, newClose);
        last.low = Math.min(last.low, newClose);
        last.volume += Math.floor(Math.random() * 25);

        const updated = [...prev];
        updated[lastIdx] = last;
        return updated;
      });

      setCurrentPrice((prev) => {
        const nextPrice = parseFloat((prev + delta).toFixed(pairInfo.pipDecimals));
        return nextPrice;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [pairInfo, isVisible]);

  // Update open positions P&L on price changes
  useEffect(() => {
    if (openPositions.length === 0) return;

    setOpenPositions((prev) =>
      prev.map((pos) => {
        // If this position matches the current active pair, update with current price
        const priceToUse = pos.pair === selectedPair ? currentPrice : pos.currentPrice;
        const pipMultiplier = pos.pair.includes('JPY') || pos.pair.includes('XAU') || pos.pair.includes('BTC') ? 100 : 10000;
        
        let pipGain = 0;
        if (pos.type === 'BUY') {
          pipGain = (priceToUse - pos.entryPrice) * pipMultiplier;
        } else {
          pipGain = (pos.entryPrice - priceToUse) * pipMultiplier;
        }

        // Standard pip value estimate ($10 per pip on 1 standard lot for EUR/USD)
        const dollarPerPip = pos.lotSize * 10;
        const pnl = parseFloat((pipGain * dollarPerPip).toFixed(2));

        return {
          ...pos,
          currentPrice: priceToUse,
          pipGain: parseFloat(pipGain.toFixed(1)),
          pnl,
        };
      })
    );
  }, [currentPrice, selectedPair]);

  // Calculate live unrealized P&L
  const totalUnrealizedPnl = useMemo(() => {
    return openPositions.reduce((acc, pos) => acc + pos.pnl, 0);
  }, [openPositions]);

  const equity = balance + totalUnrealizedPnl;
  const marginUsed = openPositions.reduce((acc, pos) => acc + pos.lotSize * 1000, 0);
  const freeMargin = Math.max(0, equity - marginUsed);

  // Notification helper
  const triggerNotification = (message: string, type: 'success' | 'danger' | 'info') => {
    setShowNotification({ message, type });
    setTimeout(() => setShowNotification(null), 3500);
  };

  // Open position handler
  const handleOpenTrade = (type: PositionType) => {
    if (freeMargin < lotSize * 500) {
      triggerNotification('Insufficient Demo Free Margin to open this lot size.', 'danger');
      return;
    }

    const pipMultiplier = pairInfo.pipDecimals === 2 ? 0.01 : 0.0001;
    const entryPrice = currentPrice;

    // Calculate TP / SL absolute prices
    let calculatedSL: number | undefined;
    let calculatedTP: number | undefined;

    if (stopLossPips > 0) {
      calculatedSL = type === 'BUY'
        ? entryPrice - stopLossPips * pipMultiplier
        : entryPrice + stopLossPips * pipMultiplier;
    }

    if (takeProfitPips > 0) {
      calculatedTP = type === 'BUY'
        ? entryPrice + takeProfitPips * pipMultiplier
        : entryPrice - takeProfitPips * pipMultiplier;
    }

    const newPosition: TradePosition = {
      id: 'trade-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      pair: selectedPair,
      type,
      lotSize,
      entryPrice,
      currentPrice,
      openTime: Date.now(),
      stopLoss: calculatedSL ? parseFloat(calculatedSL.toFixed(pairInfo.pipDecimals)) : undefined,
      takeProfit: calculatedTP ? parseFloat(calculatedTP.toFixed(pairInfo.pipDecimals)) : undefined,
      pnl: 0,
      pipGain: 0,
    };

    setOpenPositions((prev) => [newPosition, ...prev]);
    triggerNotification(`Opened ${type} ${lotSize} Lots on ${selectedPair} @ ${entryPrice}`, 'success');
  };

  // Close position handler
  const handleClosePosition = (id: string) => {
    const pos = openPositions.find((p) => p.id === id);
    if (!pos) return;

    const closed: ClosedTrade = {
      ...pos,
      closeTime: Date.now(),
      closePrice: pos.currentPrice,
      realizedPnl: pos.pnl,
    };

    setBalance((prev) => parseFloat((prev + pos.pnl).toFixed(2)));
    setClosedTrades((prev) => [closed, ...prev]);
    setOpenPositions((prev) => prev.filter((p) => p.id !== id));

    const pnlSign = pos.pnl >= 0 ? '+$' : '-$';
    triggerNotification(
      `Closed ${pos.type} ${pos.pair}. Realized P&L: ${pnlSign}${Math.abs(pos.pnl).toFixed(2)}`,
      pos.pnl >= 0 ? 'success' : 'danger'
    );
  };

  // Close all open positions
  const handleCloseAll = () => {
    if (openPositions.length === 0) return;

    let netRealized = 0;
    const newlyClosed: ClosedTrade[] = openPositions.map((pos) => {
      netRealized += pos.pnl;
      return {
        ...pos,
        closeTime: Date.now(),
        closePrice: pos.currentPrice,
        realizedPnl: pos.pnl,
      };
    });

    setBalance((prev) => parseFloat((prev + netRealized).toFixed(2)));
    setClosedTrades((prev) => [...newlyClosed, ...prev]);
    setOpenPositions([]);
    triggerNotification(`Closed all ${openPositions.length} positions. Net P&L: $${netRealized.toFixed(2)}`, 'info');
  };

  // Reset simulator
  const handleResetAccount = () => {
    if (window.confirm('Reset demo account back to $10,000 initial balance and clear open positions?')) {
      setBalance(10000);
      setOpenPositions([]);
      setClosedTrades([]);
      localStorage.removeItem('bfa_sim_balance');
      localStorage.removeItem('bfa_sim_positions');
      localStorage.removeItem('bfa_sim_history');
      triggerNotification('Demo account reset to $10,000.00 initial balance.', 'info');
    }
  };

  // Win/Loss statistics
  const winCount = closedTrades.filter((t) => t.realizedPnl > 0).length;
  const lossCount = closedTrades.filter((t) => t.realizedPnl < 0).length;
  const winRate = closedTrades.length > 0 ? ((winCount / closedTrades.length) * 100).toFixed(1) : '0.0';

  // SVG Chart Calculations
  const minPrice = candles.length ? Math.min(...candles.map((c) => c.low)) * 0.9992 : pairInfo.basePrice * 0.99;
  const maxPrice = candles.length ? Math.max(...candles.map((c) => c.high)) * 1.0008 : pairInfo.basePrice * 1.01;
  const priceRange = maxPrice - minPrice || 1;

  const svgWidth = 720;
  const svgHeight = 320;
  const paddingX = 15;
  const paddingY = 25;

  const getY = (val: number) => {
    return svgHeight - paddingY - ((val - minPrice) / priceRange) * (svgHeight - paddingY * 2);
  };

  const candleSpacing = candles.length > 1 ? (svgWidth - paddingX * 2) / candles.length : 18;

  const linePoints = candles.map((c, i) => {
    const x = paddingX + i * candleSpacing + candleSpacing / 2;
    const y = getY(c.close);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div ref={containerRef} className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 select-none">
      {/* Demo Disclaimer Watermark Banner */}
      <div className="mb-4 bg-gradient-to-r from-[#D4AF37]/15 via-[#18181b] to-[#00C853]/15 border border-[#D4AF37]/40 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#D4AF37]/20 text-[#F5C542] flex-shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="font-display font-bold text-white text-sm sm:text-base flex items-center justify-center sm:justify-start gap-2">
              <span>DEMO TRADING SIMULATOR</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#00C853]/20 text-[#00C853] font-extrabold border border-[#00C853]/30">
                100% Risk-Free Demo
              </span>
            </div>
            <p className="text-xs text-neutral-300 mt-0.5">
              Fictional educational environment. No real funds, broker deposits, or financial risk involved.
            </p>
          </div>
        </div>

        <button
          onClick={handleResetAccount}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#202026] hover:bg-[#2b2b34] text-neutral-200 text-xs font-mono border border-neutral-700 transition-colors cursor-pointer"
          title="Reset account to $10,000"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#F5C542]" />
          Reset Demo Account
        </button>
      </div>

      {/* Account Balances Header Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {/* Balance */}
        <div className="bg-[#111115] border border-[#26262d] rounded-xl p-3 sm:p-4">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center justify-between">
            <span>Demo Balance</span>
            <DollarSign className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>
          <div className="text-lg sm:text-2xl font-bold font-mono text-white mt-1">
            ${balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        {/* Equity */}
        <div className="bg-[#111115] border border-[#26262d] rounded-xl p-3 sm:p-4">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center justify-between">
            <span>Account Equity</span>
            <Layers className="w-3.5 h-3.5 text-neutral-400" />
          </div>
          <div className={`text-lg sm:text-2xl font-bold font-mono mt-1 ${equity >= balance ? 'text-white' : 'text-neutral-200'}`}>
            ${equity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        {/* Unrealized P&L */}
        <div className={`border rounded-xl p-3 sm:p-4 transition-colors ${
          totalUnrealizedPnl > 0
            ? 'bg-[#00C853]/10 border-[#00C853]/40'
            : totalUnrealizedPnl < 0
            ? 'bg-[#E53935]/10 border-[#E53935]/40'
            : 'bg-[#111115] border-[#26262d]'
        }`}>
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center justify-between">
            <span>Floating P&L</span>
            {totalUnrealizedPnl >= 0 ? (
              <TrendingUp className="w-3.5 h-3.5 text-[#00C853]" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-[#E53935]" />
            )}
          </div>
          <div className={`text-lg sm:text-2xl font-bold font-mono mt-1 ${
            totalUnrealizedPnl > 0
              ? 'text-[#00C853]'
              : totalUnrealizedPnl < 0
              ? 'text-[#E53935]'
              : 'text-neutral-300'
          }`}>
            {totalUnrealizedPnl >= 0 ? '+' : ''}${totalUnrealizedPnl.toFixed(2)}
          </div>
        </div>

        {/* Free Margin & Win Rate */}
        <div className="bg-[#111115] border border-[#26262d] rounded-xl p-3 sm:p-4">
          <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center justify-between">
            <span>Win Rate / Trades</span>
            <BarChart2 className="w-3.5 h-3.5 text-[#F5C542]" />
          </div>
          <div className="text-lg sm:text-2xl font-bold font-mono text-[#F5C542] mt-1 flex items-baseline gap-2">
            <span>{winRate}%</span>
            <span className="text-xs text-neutral-400 font-normal">({closedTrades.length} closed)</span>
          </div>
        </div>
      </div>

      {/* Main Terminal Grid: Left Chart & Right Order Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
        
        {/* Left Side: Chart Section (8 Cols) */}
        <div className="lg:col-span-8 bg-[#101014] border border-[#26262e] rounded-2xl p-4 sm:p-5 flex flex-col shadow-xl">
          {/* Pair & Timeframe selector header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#22222a] mb-3">
            {/* Pair Switcher Dropdown */}
            <div className="flex items-center gap-2">
              <label htmlFor="pair-select" className="text-xs font-mono text-neutral-400">Pair:</label>
              <select
                id="pair-select"
                value={selectedPair}
                onChange={(e) => setSelectedPair(e.target.value as CurrencyPairId)}
                className="bg-[#191920] text-white font-mono font-bold text-sm sm:text-base px-3 py-1.5 rounded-lg border border-[#383844] focus:outline-none focus:border-[#D4AF37] cursor-pointer"
              >
                {MARKET_PAIRS.map((pair) => (
                  <option key={pair.id} value={pair.id}>
                    {pair.id} — {pair.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Timeframe & Chart Style controls */}
            <div className="flex items-center gap-2">
              <div className="flex bg-[#18181f] p-1 rounded-lg border border-[#2b2b36]">
                {(['1M', '5M', '15M', '1H', '4H', '1D'] as Timeframe[]).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2 py-0.5 text-xs font-mono rounded transition-colors ${
                      timeframe === tf
                        ? 'bg-gold-gradient text-black font-bold'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              {/* Candlestick / Line toggle */}
              <button
                onClick={() => setChartType((prev) => (prev === 'candlestick' ? 'line' : 'candlestick'))}
                className="px-2.5 py-1 text-xs font-mono bg-[#18181f] hover:bg-[#22222c] text-neutral-300 rounded-lg border border-[#2b2b36] transition-colors"
                title="Toggle Candlestick / Line chart"
              >
                {chartType === 'candlestick' ? 'Line' : 'Candles'}
              </button>
            </div>
          </div>

          {/* Real-time price banner */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-baseline gap-3">
              <span className="text-xl sm:text-3xl font-mono font-extrabold text-white tracking-tight">
                {currentPrice.toLocaleString(undefined, {
                  minimumFractionDigits: pairInfo.pipDecimals,
                  maximumFractionDigits: pairInfo.pipDecimals,
                })}
              </span>
              <span className="text-xs font-mono text-neutral-400">
                Spread: <strong className="text-[#D4AF37]">{pairInfo.spreadPips} pips</strong>
              </span>
            </div>

            <div className="text-xs font-mono text-neutral-400 hidden sm:flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00C853] animate-pulse" />
              <span>Simulated Tick Engine Active</span>
            </div>
          </div>

          {/* SVG Candlestick Chart Area */}
          <div className="relative w-full h-72 sm:h-96 bg-[#08080a] rounded-xl border border-[#1d1d24] overflow-hidden p-1">
            <div className="absolute inset-0 trading-grid-pattern opacity-50 pointer-events-none" />

            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
            >
              {/* Grid Lines */}
              {[0.2, 0.4, 0.6, 0.8].map((ratio, idx) => {
                const pVal = maxPrice - ratio * priceRange;
                const yPos = getY(pVal);
                return (
                  <g key={idx}>
                    <line x1={0} y1={yPos} x2={svgWidth} y2={yPos} stroke="#1b1b22" strokeDasharray="4 4" />
                    <text x={svgWidth - 6} y={yPos - 3} fill="#555" fontSize="9" fontFamily="monospace" textAnchor="end">
                      {pVal.toFixed(pairInfo.pipDecimals)}
                    </text>
                  </g>
                );
              })}

              {/* Line Chart mode */}
              {chartType === 'line' && (
                <polyline
                  points={linePoints}
                  fill="none"
                  stroke="#00C853"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="filter drop-shadow-[0_0_8px_rgba(0,200,83,0.5)]"
                />
              )}

              {/* Candlestick Chart mode */}
              {chartType === 'candlestick' &&
                candles.map((candle, idx) => {
                  const isBull = candle.close >= candle.open;
                  const color = isBull ? '#00C853' : '#E53935';
                  const xCenter = paddingX + idx * candleSpacing + candleSpacing / 2;
                  const candleW = Math.max(4, candleSpacing * 0.7);

                  const yHigh = getY(candle.high);
                  const yLow = getY(candle.low);
                  const yOpen = getY(candle.open);
                  const yClose = getY(candle.close);

                  const topY = Math.min(yOpen, yClose);
                  const bHeight = Math.max(2, Math.abs(yClose - yOpen));

                  return (
                    <g key={candle.time + idx}>
                      {/* Wick */}
                      <line x1={xCenter} y1={yHigh} x2={xCenter} y2={yLow} stroke={color} strokeWidth="1.2" />
                      {/* Candle Body */}
                      <rect
                        x={xCenter - candleW / 2}
                        y={topY}
                        width={candleW}
                        height={bHeight}
                        fill={color}
                        rx="1"
                      />
                    </g>
                  );
                })}

              {/* Active Open Positions Price Horizontal Lines */}
              {openPositions
                .filter((p) => p.pair === selectedPair)
                .map((pos) => {
                  const yEntry = getY(pos.entryPrice);
                  const isBuy = pos.type === 'BUY';
                  return (
                    <g key={pos.id}>
                      <line
                        x1={0}
                        y1={yEntry}
                        x2={svgWidth}
                        y2={yEntry}
                        stroke={isBuy ? '#00C853' : '#E53935'}
                        strokeWidth="1.5"
                        strokeDasharray="6 3"
                      />
                      <rect
                        x={6}
                        y={yEntry - 10}
                        width={90}
                        height={18}
                        rx={3}
                        fill={isBuy ? '#00C853' : '#E53935'}
                      />
                      <text
                        x={51}
                        y={yEntry + 3}
                        fill="#fff"
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                      >
                        {pos.type} {pos.lotSize}L ({pos.pnl >= 0 ? '+' : ''}${pos.pnl})
                      </text>
                    </g>
                  );
                })}

              {/* Current Price Tracker */}
              <line
                x1={0}
                y1={getY(currentPrice)}
                x2={svgWidth}
                y2={getY(currentPrice)}
                stroke="#D4AF37"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />
              <g transform={`translate(${svgWidth - 70}, ${getY(currentPrice) - 10})`}>
                <rect width="70" height="20" rx="3" fill="#D4AF37" />
                <text x="35" y="14" fill="#000" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  {currentPrice.toFixed(pairInfo.pipDecimals)}
                </text>
              </g>
            </svg>
          </div>

          {/* Quick Pair Switcher Buttons */}
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-[#202028]">
            {['EUR/USD', 'GBP/USD', 'USD/JPY', 'GBP/JPY', 'XAU/USD', 'BTC/USD'].map((pair) => (
              <button
                key={pair}
                onClick={() => setSelectedPair(pair as CurrencyPairId)}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                  selectedPair === pair
                    ? 'bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F5C542] font-bold'
                    : 'bg-[#15151b] border border-[#262630] text-neutral-400 hover:text-white'
                }`}
              >
                {pair}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Order Execution Panel (4 Cols) */}
        <div className="lg:col-span-4 bg-[#101014] border border-[#26262e] rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between border-b border-[#22222a] pb-3 mb-4">
              <h3 className="font-display font-bold text-white text-base flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#D4AF37]" />
                Order Execution
              </h3>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#202028] text-neutral-400">
                Market Order
              </span>
            </div>

            {/* Notification alert banner */}
            {showNotification && (
              <div
                className={`mb-4 p-2.5 rounded-lg text-xs font-mono flex items-center gap-2 transition-all ${
                  showNotification.type === 'success'
                    ? 'bg-[#00C853]/15 text-[#00C853] border border-[#00C853]/40'
                    : showNotification.type === 'danger'
                    ? 'bg-[#E53935]/15 text-[#E53935] border border-[#E53935]/40'
                    : 'bg-[#D4AF37]/15 text-[#F5C542] border border-[#D4AF37]/40'
                }`}
              >
                {showNotification.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <Info className="w-4 h-4 flex-shrink-0" />
                )}
                <span>{showNotification.message}</span>
              </div>
            )}

            {/* Lot Size Selector */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-300 mb-1.5">
                <label htmlFor="lot-size-input">Volume (Lot Size):</label>
                <span className="text-[#D4AF37] font-bold">
                  {lotSize} Lot ({lotSize === 1 ? '100,000' : (lotSize * 100000).toLocaleString()} units)
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 mb-2">
                {[0.01, 0.05, 0.10, 0.50, 1.00, 2.00, 5.00].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setLotSize(preset)}
                    className={`py-1 text-xs font-mono rounded border transition-colors ${
                      lotSize === preset
                        ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37]'
                        : 'bg-[#181820] text-neutral-300 border-[#2b2b36] hover:border-neutral-500'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <input
                id="lot-size-input"
                type="number"
                step="0.01"
                min="0.01"
                max="20"
                value={lotSize}
                onChange={(e) => setLotSize(Math.max(0.01, parseFloat(e.target.value) || 0.01))}
                className="w-full bg-[#181820] text-white font-mono px-3 py-2 rounded-lg border border-[#33333f] text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            {/* Stop Loss & Take Profit Parameters */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                  Stop Loss (Pips)
                </label>
                <input
                  type="number"
                  min="0"
                  max="500"
                  value={stopLossPips}
                  onChange={(e) => setStopLossPips(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-[#181820] text-white font-mono px-3 py-2 rounded-lg border border-[#33333f] text-xs focus:outline-none focus:border-[#E53935]"
                />
                <span className="text-[10px] font-mono text-neutral-400 mt-1 block">
                  Est. Risk: ${(stopLossPips * lotSize * 10).toFixed(2)}
                </span>
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 block mb-1">
                  Take Profit (Pips)
                </label>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={takeProfitPips}
                  onChange={(e) => setTakeProfitPips(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-[#181820] text-white font-mono px-3 py-2 rounded-lg border border-[#33333f] text-xs focus:outline-none focus:border-[#00C853]"
                />
                <span className="text-[10px] font-mono text-neutral-400 mt-1 block">
                  Est. Reward: ${(takeProfitPips * lotSize * 10).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Big Action Buttons: SELL & BUY */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* SELL / SHORT */}
              <button
                onClick={() => handleOpenTrade('SELL')}
                className="group relative flex flex-col items-center justify-center p-3.5 rounded-xl bg-gradient-to-b from-[#E53935] to-[#B71C1C] hover:from-[#EF5350] hover:to-[#C62828] text-white font-bold transition-all shadow-lg hover:shadow-[#E53935]/30 cursor-pointer active:scale-95"
              >
                <span className="font-display tracking-wider text-base sm:text-lg flex items-center gap-1.5">
                  <TrendingDown className="w-5 h-5" /> SELL
                </span>
                <span className="text-[11px] font-mono opacity-90 mt-0.5">
                  Short @ {currentPrice.toFixed(pairInfo.pipDecimals)}
                </span>
              </button>

              {/* BUY / LONG */}
              <button
                onClick={() => handleOpenTrade('BUY')}
                className="group relative flex flex-col items-center justify-center p-3.5 rounded-xl bg-gradient-to-b from-[#00C853] to-[#009624] hover:from-[#26E77A] hover:to-[#00A844] text-white font-bold transition-all shadow-lg hover:shadow-[#00C853]/30 cursor-pointer active:scale-95"
              >
                <span className="font-display tracking-wider text-base sm:text-lg flex items-center gap-1.5">
                  <TrendingUp className="w-5 h-5" /> BUY
                </span>
                <span className="text-[11px] font-mono opacity-90 mt-0.5">
                  Long @ {currentPrice.toFixed(pairInfo.pipDecimals)}
                </span>
              </button>
            </div>
          </div>

          {/* Risk Management Tip Box */}
          <div className="bg-[#16161d] border border-[#2c2c38] rounded-xl p-3 text-[11px] font-mono text-neutral-400">
            <div className="text-[#F5C542] font-bold mb-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Academy Rule of Thumb:
            </div>
            Never risk more than 1% to 2% of total demo equity on any single position.
          </div>
        </div>
      </div>

      {/* Bottom Tabs: Active Positions, Trade History, Calculator */}
      <div className="bg-[#101014] border border-[#26262e] rounded-2xl overflow-hidden shadow-xl">
        {/* Tab Headers */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#22222a] px-4 py-2.5 bg-[#14141a]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('positions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center gap-2 ${
                activeTab === 'positions'
                  ? 'bg-gold-gradient text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Open Positions ({openPositions.length})
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors flex items-center gap-2 ${
                activeTab === 'history'
                  ? 'bg-gold-gradient text-black font-bold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Trade History ({closedTrades.length})
            </button>
          </div>

          {openPositions.length > 0 && activeTab === 'positions' && (
            <button
              onClick={handleCloseAll}
              className="px-3 py-1 text-xs font-mono rounded bg-[#E53935]/20 hover:bg-[#E53935]/30 text-[#E53935] border border-[#E53935]/40 transition-colors"
            >
              Close All ({openPositions.length})
            </button>
          )}
        </div>

        {/* Tab 1: Open Positions Table */}
        {activeTab === 'positions' && (
          <div className="overflow-x-auto p-3 sm:p-4">
            {openPositions.length === 0 ? (
              <div className="text-center py-10 text-neutral-400 font-mono text-xs">
                <Layers className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#D4AF37]" />
                No active demo trades currently open. Click BUY or SELL above to initiate simulated positions.
              </div>
            ) : (
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="text-neutral-400 border-b border-[#22222a] pb-2">
                    <th className="py-2 px-2">Pair</th>
                    <th className="py-2 px-2">Type</th>
                    <th className="py-2 px-2">Lots</th>
                    <th className="py-2 px-2">Entry Price</th>
                    <th className="py-2 px-2">Current</th>
                    <th className="py-2 px-2">Pip Gain</th>
                    <th className="py-2 px-2">Profit/Loss ($)</th>
                    <th className="py-2 px-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e26]">
                  {openPositions.map((pos) => {
                    const isProfit = pos.pnl >= 0;
                    return (
                      <tr key={pos.id} className="hover:bg-[#16161e] transition-colors">
                        <td className="py-3 px-2 font-bold text-white">{pos.pair}</td>
                        <td className="py-3 px-2">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              pos.type === 'BUY'
                                ? 'bg-[#00C853]/20 text-[#00C853] border border-[#00C853]/40'
                                : 'bg-[#E53935]/20 text-[#E53935] border border-[#E53935]/40'
                            }`}
                          >
                            {pos.type}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-neutral-200">{pos.lotSize}</td>
                        <td className="py-3 px-2 text-neutral-300">{pos.entryPrice}</td>
                        <td className="py-3 px-2 text-white font-semibold">{pos.currentPrice}</td>
                        <td className={`py-3 px-2 font-bold ${isProfit ? 'text-[#00C853]' : 'text-[#E53935]'}`}>
                          {pos.pipGain >= 0 ? '+' : ''}{pos.pipGain} pips
                        </td>
                        <td className={`py-3 px-2 font-bold text-sm ${isProfit ? 'text-[#00C853]' : 'text-[#E53935]'}`}>
                          {pos.pnl >= 0 ? '+' : ''}${pos.pnl.toFixed(2)}
                        </td>
                        <td className="py-3 px-2 text-right">
                          <button
                            onClick={() => handleClosePosition(pos.id)}
                            className="px-2.5 py-1 rounded bg-[#2a2a36] hover:bg-[#E53935] text-neutral-200 hover:text-white text-[11px] transition-colors cursor-pointer"
                          >
                            Close
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Tab 2: Closed Trades History */}
        {activeTab === 'history' && (
          <div className="overflow-x-auto p-3 sm:p-4">
            {closedTrades.length === 0 ? (
              <div className="text-center py-10 text-neutral-400 font-mono text-xs">
                <Clock className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#D4AF37]" />
                No closed trades in session history yet.
              </div>
            ) : (
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="text-neutral-400 border-b border-[#22222a] pb-2">
                    <th className="py-2 px-2">Pair</th>
                    <th className="py-2 px-2">Type</th>
                    <th className="py-2 px-2">Lots</th>
                    <th className="py-2 px-2">Entry</th>
                    <th className="py-2 px-2">Close</th>
                    <th className="py-2 px-2">Realized P&L</th>
                    <th className="py-2 px-2 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e26]">
                  {closedTrades.map((t) => (
                    <tr key={t.id} className="hover:bg-[#16161e] transition-colors">
                      <td className="py-2.5 px-2 font-bold text-white">{t.pair}</td>
                      <td className="py-2.5 px-2">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            t.type === 'BUY' ? 'text-[#00C853]' : 'text-[#E53935]'
                          }`}
                        >
                          {t.type}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-neutral-300">{t.lotSize}</td>
                      <td className="py-2.5 px-2 text-neutral-400">{t.entryPrice}</td>
                      <td className="py-2.5 px-2 text-neutral-200">{t.closePrice}</td>
                      <td className={`py-2.5 px-2 font-bold ${t.realizedPnl >= 0 ? 'text-[#00C853]' : 'text-[#E53935]'}`}>
                        {t.realizedPnl >= 0 ? '+' : ''}${t.realizedPnl.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-2 text-right text-neutral-400 text-[10px]">
                        {new Date(t.closeTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
