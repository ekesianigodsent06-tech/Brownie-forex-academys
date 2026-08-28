import React, { useState } from 'react';
import { Calculator, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { MARKET_PAIRS } from '../data/academyData';
import { CurrencyPairId } from '../types';

export const PositionCalculator: React.FC = () => {
  const [accountBalance, setAccountBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1.0);
  const [stopLossPips, setStopLossPips] = useState<number>(25);
  const [selectedPair, setSelectedPair] = useState<CurrencyPairId>('EUR/USD');

  // Math
  const dollarRisk = (accountBalance * (riskPercent / 100));
  const pipValuePerStandardLot = selectedPair.includes('JPY') || selectedPair.includes('XAU') ? 10 : 10;
  const calculatedLots = stopLossPips > 0 ? dollarRisk / (stopLossPips * pipValuePerStandardLot) : 0;

  return (
    <section className="w-full bg-gradient-to-b from-[#0a1128] via-[#0d1b3a] to-[#080d1e] border-y border-[#1e293b]/80 py-16 sm:py-20 text-white relative overflow-hidden">
      {/* Luxurious Sapphire and Gold Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 ambient-glow-blue pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 ambient-glow-gold pointer-events-none" />
      <div className="absolute inset-0 trading-grid-pattern opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1d4ed8]/20 border border-[#3b82f6]/40 text-[#60a5fa] font-mono text-xs font-bold mb-3 uppercase tracking-wider shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-[#60a5fa]" />
            Practical Risk Management Suite
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white tracking-tight">
            POSITION SIZING & RISK CALCULATOR
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 mt-2 font-sans">
            Calculate your exact institutional lot size before taking any trade to protect your capital and guarantee mathematical edge.
          </p>
        </div>

        <div className="bg-[#0b152d] border border-[#1e3a6a]/70 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#030712]/80 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Inputs (7 Cols) */}
          <div className="md:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1 font-bold">
                  Account Balance ($)
                </label>
                <input
                  type="number"
                  min="100"
                  step="500"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(Math.max(10, parseFloat(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1b38] border border-[#234277] text-white font-mono text-sm focus:outline-none focus:border-[#D4AF37] shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1 font-bold">
                  Risk Per Trade (%)
                </label>
                <div className="flex items-center gap-1.5">
                  {[0.5, 1.0, 2.0].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setRiskPercent(preset)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                        riskPercent === preset
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5C542] text-black font-bold border-[#D4AF37] shadow-md shadow-[#D4AF37]/20'
                          : 'bg-[#0e1b38] text-neutral-300 border-[#234277] hover:border-neutral-400'
                      }`}
                    >
                      {preset}%
                    </button>
                  ))}
                  <input
                    type="number"
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={riskPercent}
                    onChange={(e) => setRiskPercent(parseFloat(e.target.value) || 1)}
                    className="w-16 px-2 py-2 rounded-xl bg-[#0e1b38] border border-[#234277] text-white font-mono text-xs text-center focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1 font-bold">
                  Currency / Asset Pair
                </label>
                <select
                  value={selectedPair}
                  onChange={(e) => setSelectedPair(e.target.value as CurrencyPairId)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1b38] border border-[#234277] text-white font-mono text-sm focus:outline-none focus:border-[#D4AF37] cursor-pointer"
                >
                  {MARKET_PAIRS.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#0a1128] text-white">{p.id} ({p.name})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 mb-1 font-bold">
                  Stop Loss Distance (Pips / Points)
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={stopLossPips}
                  onChange={(e) => setStopLossPips(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0e1b38] border border-[#234277] text-white font-mono text-sm focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>
          </div>

          {/* Calculated Output Card (5 Cols) */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#101f42] via-[#0b1733] to-[#071024] border border-[#234277] rounded-2xl p-6 text-center space-y-4 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/10 rounded-bl-full pointer-events-none" />
            <div className="text-xs font-mono text-neutral-300 uppercase tracking-wider font-bold">
              Recommended Position Size
            </div>

            <div className="font-mono font-black text-4xl sm:text-5xl text-gold-gradient tracking-tight">
              {calculatedLots.toFixed(2)} <span className="text-lg text-white font-normal">Lots</span>
            </div>

            <div className="space-y-2 text-xs font-mono pt-3 border-t border-[#1e3a6a] text-neutral-300">
              <div className="flex justify-between">
                <span className="text-neutral-400">Total Capital at Risk:</span>
                <span className="text-[#EF4444] font-bold">${dollarRisk.toFixed(2)} ({riskPercent}%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Target 1:3 R:R Reward:</span>
                <span className="text-[#00C853] font-bold">${(dollarRisk * 3).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
