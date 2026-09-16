import React from 'react';
import { PatternInsight, Trade } from '../types/trade';
import { X, CheckCircle2 } from 'lucide-react';
import { formatDuration } from '../engine/metricsEngine';

interface InsightDetailDrawerProps {
  insight: PatternInsight | null;
  trades: Trade[];
  onClose: () => void;
  onSelectTrade: (trade: Trade) => void;
  onSetFocusGoal: (insight: PatternInsight) => void;
}

export const InsightDetailDrawer: React.FC<InsightDetailDrawerProps> = ({
  insight,
  trades,
  onClose,
  onSelectTrade,
  onSetFocusGoal
}) => {
  if (!insight) return null;

  // Filter trades matching this insight's supporting IDs
  const supportingTrades = trades.filter((t) => insight.supportingTradeIds.includes(t.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      {/* Click outside backdrop */}
      <div className="flex-1 cursor-pointer" onClick={onClose} />

      {/* Drawer Container */}
      <div className="w-full max-w-2xl bg-[#0B0E14] border-l border-[#1E2638] h-full overflow-y-auto flex flex-col justify-between p-6 sm:p-8 space-y-8 shadow-2xl">
        
        {/* Header Bar */}
        <div className="space-y-4 border-b border-[#1E2638] pb-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-800/40">
              INSIGHT DETAIL #{insight.numberTag}
            </span>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-[#141923] text-slate-400 hover:text-white hover:bg-[#1B2230] border border-[#1E2638] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Why we're showing you this
            </span>
            <h2 className="text-2xl font-extrabold text-white mt-1">
              {insight.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 font-normal leading-relaxed">
              "{insight.headline}"
            </p>
          </div>
        </div>

        {/* Key Evidence & Metrics Grid */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Key Evidence Metrics
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {insight.metrics.map((m, idx) => (
              <div key={idx} className="bg-[#141923] p-4 rounded-xl border border-[#1E2638] space-y-1">
                <div className="text-[11px] font-medium text-slate-400">
                  {m.label}
                </div>
                <div className="text-lg font-bold text-white">{m.value}</div>
                {m.helper && (
                  <div className="text-[10px] text-slate-500">{m.helper}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Simple Visual Comparison Bar */}
        {insight.visualComparison && (
          <div className="bg-[#141923] p-5 rounded-2xl border border-[#1E2638] space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {insight.visualComparison.unit === '%'
                ? 'VISUAL LOSS PROTECTION COMPARISON'
                : 'VISUAL HOLDING DURATION COMPARISON'}
            </h3>

            <div className="space-y-3">
              {/* Item A */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>{insight.visualComparison.labelA}</span>
                  <span className="text-red-400">{insight.visualComparison.valueA}</span>
                </div>
                <div className="w-full bg-[#0B0E14] h-2.5 rounded-full overflow-hidden border border-[#1E2638]">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (insight.visualComparison.rawA /
                          Math.max(
                            insight.visualComparison.rawA,
                            insight.visualComparison.rawB
                          )) *
                          100
                      )}%`
                    }}
                  />
                </div>
              </div>

              {/* Item B */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>{insight.visualComparison.labelB}</span>
                  <span className="text-emerald-400">{insight.visualComparison.valueB}</span>
                </div>
                <div className="w-full bg-[#0B0E14] h-2.5 rounded-full overflow-hidden border border-[#1E2638]">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (insight.visualComparison.rawB /
                          Math.max(
                            insight.visualComparison.rawA,
                            insight.visualComparison.rawB
                          )) *
                          100
                      )}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trades Behind This Pattern Table */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Trades Matching This Pattern ({supportingTrades.length})
            </h3>
            <span className="text-[11px] text-slate-500">Click any trade row for breakdown</span>
          </div>

          <div className="bg-[#141923] rounded-xl border border-[#1E2638] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-[#0B0E14] text-slate-400 font-semibold border-b border-[#1E2638]">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Symbol</th>
                    <th className="p-3">Duration</th>
                    <th className="p-3 text-right">P&L</th>
                    <th className="p-3 text-center">Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E2638]">
                  {supportingTrades.slice(0, 10).map((t) => {
                    const isLoss = t.pnl < 0;
                    return (
                      <tr
                        key={t.id}
                        onClick={() => onSelectTrade(t)}
                        className="hover:bg-[#1B2230] cursor-pointer transition-colors"
                      >
                        <td className="p-3 font-mono text-slate-400">{t.date}</td>
                        <td className="p-3 font-bold text-white">{t.symbol}</td>
                        <td className="p-3 font-mono text-slate-300">
                          {formatDuration(t.durationMinutes)}
                        </td>
                        <td
                          className={`p-3 font-mono text-right font-bold ${
                            isLoss ? 'text-red-400' : 'text-emerald-400'
                          }`}
                        >
                          {isLoss ? `-₹${Math.abs(t.pnl)}` : `+₹${t.pnl}`}
                        </td>
                        <td className="p-3 text-center">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              isLoss
                                ? 'bg-red-950/60 text-red-400 border border-red-800/40'
                                : 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                            }`}
                          >
                            {t.outcome}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {supportingTrades.length > 10 && (
              <div className="p-2.5 text-center text-[11px] text-slate-500 bg-[#0B0E14] border-t border-[#1E2638]">
                Showing top 10 of {supportingTrades.length} trades matching this pattern
              </div>
            )}
          </div>
        </div>

        {/* Action Intervention & Goal CTA */}
        <div className="bg-blue-950/40 p-5 rounded-2xl border border-blue-800/40 space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>What to try next month</span>
          </div>

          <p className="text-sm font-semibold text-white leading-relaxed">
            "{insight.nextMonthAction}"
          </p>

          <p className="text-xs text-slate-300 leading-relaxed">
            {insight.actionRationale}
          </p>

          <button
            onClick={() => onSetFocusGoal(insight)}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.01]"
          >
            <span>Set as next-month focus</span>
          </button>
        </div>

      </div>
    </div>
  );
};
