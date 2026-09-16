import React, { useState } from 'react';
import { Trade, MetricSummary, PatternInsight } from '../types/trade';
import { OverviewMetrics } from './OverviewMetrics';
import { InsightCard } from './InsightCard';
import { InsightDetailDrawer } from './InsightDetailDrawer';
import { TradeDetailModal } from './TradeDetailModal';
import { ShieldCheck } from 'lucide-react';

interface ReviewScreenProps {
  trades: Trade[];
  metrics: MetricSummary;
  insights: PatternInsight[];
  onSetFocusGoal: (insight: PatternInsight) => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  trades,
  metrics,
  insights,
  onSetFocusGoal
}) => {
  const [activeDrawerInsight, setActiveDrawerInsight] = useState<PatternInsight | null>(null);
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-10 animate-fade-in">
      {/* Overview Metrics Banner */}
      <OverviewMetrics metrics={metrics} />

      {/* Surfaced Insights Section */}
      <div className="space-y-6 pt-4 border-t border-[#1E2638]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-widest">
              Empirical Behavioural Analysis
            </span>
            <h2 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
              {insights.length} behaviours worth reviewing
            </h2>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-[#141923] px-3 py-1.5 rounded-lg border border-[#1E2638]">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            <span>Ranked by evidence &amp; impact</span>
          </div>
        </div>

        {/* 2-3 Surfaced Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((insight) => (
            <InsightCard
              key={insight.id}
              insight={insight}
              onOpenDetail={(i) => setActiveDrawerInsight(i)}
            />
          ))}
        </div>
      </div>

      {/* Detail Drawer Slide-over */}
      <InsightDetailDrawer
        insight={activeDrawerInsight}
        trades={trades}
        onClose={() => setActiveDrawerInsight(null)}
        onSelectTrade={(trade) => setSelectedTrade(trade)}
        onSetFocusGoal={(insight) => {
          onSetFocusGoal(insight);
          setActiveDrawerInsight(null);
        }}
      />

      {/* Trade Detail Inspector Modal */}
      <TradeDetailModal
        trade={selectedTrade}
        activeInsight={activeDrawerInsight}
        onClose={() => setSelectedTrade(null)}
      />
    </div>
  );
};
