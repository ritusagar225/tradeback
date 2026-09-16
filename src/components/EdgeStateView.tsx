import React from 'react';
import { ShieldAlert, ArrowRight, AlertCircle } from 'lucide-react';

interface EdgeStateViewProps {
  reason: 'fewer_than_10_trades' | 'no_strong_pattern';
  tradeCount: number;
  onLoadSampleTrades: () => void;
}

export const EdgeStateView: React.FC<EdgeStateViewProps> = ({
  reason,
  tradeCount,
  onLoadSampleTrades
}) => {
  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-[#141923] p-8 rounded-2xl border border-[#1E2638] shadow-2xl text-center space-y-6">
        
        {/* Restraint Icon */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <ShieldAlert className="w-8 h-8" />
        </div>

        {/* Dynamic Title & Copy */}
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Not enough evidence yet
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            {reason === 'fewer_than_10_trades'
              ? `We reviewed ${tradeCount} trades, but we don't have enough trading history to confidently identify a repeatable behaviour.`
              : `Your recent trades don't show a pattern strong enough for us to confidently recommend a behavioural change.`}
          </p>
        </div>

        {/* Product Restraint Banner */}
        <div className="bg-[#0B0E14] p-4 rounded-xl border border-[#1E2638] text-xs text-slate-400 space-y-1 text-left">
          <div className="font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Product Restraint Promise</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            "We won't guess. TradeBack only surfaces insights when backed by repeatable frequency, meaningful financial impact, and strong empirical evidence."
          </p>
        </div>

        {/* CTA */}
        <div className="pt-2">
          <button
            onClick={onLoadSampleTrades}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all"
          >
            <span>Try with 47 sample trades</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
