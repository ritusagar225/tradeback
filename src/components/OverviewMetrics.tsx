import React from 'react';
import { MetricSummary } from '../types/trade';

interface OverviewMetricsProps {
  metrics: MetricSummary;
}

export const OverviewMetrics: React.FC<OverviewMetricsProps> = ({ metrics }) => {
  const isPnlNegative = metrics.totalPnl < 0;
  const formattedPnl = `₹${Math.abs(metrics.totalPnl).toLocaleString('en-IN')}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white tracking-tight">
          Your month in one view
        </h2>
        <span className="text-xs text-slate-500 font-mono">Calculated from 1 month order history</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Metric 1: Total Trades */}
        <div className="bg-[#141923] p-5 rounded-2xl border border-[#1E2638] space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {metrics.totalTrades}
          </div>
          <div className="text-xs font-medium text-slate-400">Trades</div>
        </div>

        {/* Metric 2: Win Rate */}
        <div className="bg-[#141923] p-5 rounded-2xl border border-[#1E2638] space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {metrics.winRate}%
          </div>
          <div className="text-xs font-medium text-slate-400">Win rate</div>
        </div>

        {/* Metric 3: Net P&L */}
        <div className="bg-[#141923] p-5 rounded-2xl border border-[#1E2638] space-y-1">
          <div
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isPnlNegative ? 'text-red-400' : 'text-emerald-400'
            }`}
          >
            {isPnlNegative ? `-${formattedPnl}` : `+${formattedPnl}`}
          </div>
          <div className="text-xs font-medium text-slate-400">Net P&L</div>
        </div>

        {/* Metric 4: Avg Win / Avg Loss Ratio */}
        <div className="bg-[#141923] p-5 rounded-2xl border border-[#1E2638] space-y-1">
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {metrics.winLossRatio} : 1
          </div>
          <div className="text-xs font-medium text-slate-400">Avg win / avg loss</div>
        </div>
      </div>
    </div>
  );
};
