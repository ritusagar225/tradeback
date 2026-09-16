import React from 'react';
import { Trade, PatternInsight } from '../types/trade';
import { X, Clock, AlertCircle, ShieldCheck, ShieldOff } from 'lucide-react';
import { formatDuration } from '../engine/metricsEngine';

interface TradeDetailModalProps {
  trade: Trade | null;
  activeInsight: PatternInsight | null;
  onClose: () => void;
}

export const TradeDetailModal: React.FC<TradeDetailModalProps> = ({
  trade,
  activeInsight,
  onClose
}) => {
  if (!trade) return null;

  const isLoss = trade.pnl < 0;

  // Generate factual explanation based on why trade was flagged
  let factualExplanation = `This trade resulted in a P&L of ${isLoss ? '-' : '+'}₹${Math.abs(trade.pnl)} after holding for ${formatDuration(trade.durationMinutes)}.`;

  if (activeInsight?.patternType === 'losers_held_longer') {
    factualExplanation = `This trade was held for ${formatDuration(trade.durationMinutes)} and lost ₹${Math.abs(trade.pnl)}. That is considerably longer than your median winning trade duration of 1h 18m.`;
  } else if (activeInsight?.patternType === 'rapid_reentry') {
    factualExplanation = `This trade was entered at ${trade.entryTime}, within 20 minutes of closing a prior losing trade, resulting in a loss of ₹${Math.abs(trade.pnl)}.`;
  } else if (activeInsight?.patternType === 'missing_stop_loss') {
    factualExplanation = `This trade lost ₹${Math.abs(trade.pnl)} without a pre-defined stop-loss trigger recorded at entry.`;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-[#141923] rounded-2xl border border-[#1E2638] shadow-2xl p-6 sm:p-7 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1E2638] pb-4">
          <div>
            <div className="text-[11px] font-mono font-semibold text-slate-400">
              TRADE ID: {trade.id} • {trade.date}
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mt-0.5">
              <span>{trade.symbol}</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#1E2638] text-slate-300">
                {trade.instrument}
              </span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#0B0E14] text-slate-400 hover:text-white hover:bg-[#1B2230] border border-[#1E2638] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-[#0B0E14] p-3 rounded-xl border border-[#1E2638]">
            <div className="text-[11px] font-medium text-slate-400">Side / Type</div>
            <div className="text-sm font-bold text-white">{trade.type}</div>
          </div>

          <div className="bg-[#0B0E14] p-3 rounded-xl border border-[#1E2638]">
            <div className="text-[11px] font-medium text-slate-400">Entry Price</div>
            <div className="text-sm font-bold text-white">₹{trade.entryPrice}</div>
          </div>

          <div className="bg-[#0B0E14] p-3 rounded-xl border border-[#1E2638]">
            <div className="text-[11px] font-medium text-slate-400">Exit Price</div>
            <div className="text-sm font-bold text-white">₹{trade.exitPrice}</div>
          </div>

          <div className="bg-[#0B0E14] p-3 rounded-xl border border-[#1E2638]">
            <div className="text-[11px] font-medium text-slate-400">Quantity</div>
            <div className="text-sm font-bold text-white">{trade.quantity}</div>
          </div>

          <div className="bg-[#0B0E14] p-3 rounded-xl border border-[#1E2638]">
            <div className="text-[11px] font-medium text-slate-400">Holding Duration</div>
            <div className="text-sm font-bold text-white flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span>{formatDuration(trade.durationMinutes)}</span>
            </div>
          </div>

          <div className="bg-[#0B0E14] p-3 rounded-xl border border-[#1E2638]">
            <div className="text-[11px] font-medium text-slate-400">Net P&L</div>
            <div
              className={`text-sm font-bold ${
                isLoss ? 'text-red-400' : 'text-emerald-400'
              }`}
            >
              {isLoss ? `-₹${Math.abs(trade.pnl)}` : `+₹${trade.pnl}`}
            </div>
          </div>
        </div>

        {/* Protection Badges */}
        <div className="flex items-center justify-between bg-[#0B0E14] p-3 rounded-xl border border-[#1E2638] text-xs">
          <div className="flex items-center gap-2">
            {trade.stopLossUsed ? (
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            ) : (
              <ShieldOff className="w-4 h-4 text-red-400" />
            )}
            <span className="text-slate-300">
              Stop-loss order: <strong className="text-white">{trade.stopLossUsed ? 'Used' : 'Not recorded'}</strong>
            </span>
          </div>

          <div className="text-slate-400">
            Target order: <strong className="text-white">{trade.targetUsed ? 'Used' : 'Not recorded'}</strong>
          </div>
        </div>

        {/* Why Flagged Explanation */}
        <div className="bg-amber-950/30 p-4 rounded-xl border border-amber-800/40 space-y-1.5">
          <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Why this trade appears in the insight</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            "{factualExplanation}"
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#1E2638] hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors"
        >
          Close trade details
        </button>

      </div>
    </div>
  );
};
