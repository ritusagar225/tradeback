import React from 'react';
import { PatternInsight } from '../types/trade';
import { ArrowRight, AlertTriangle, CheckCircle2, TrendingDown } from 'lucide-react';

interface InsightCardProps {
  insight: PatternInsight;
  onOpenDetail: (insight: PatternInsight) => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({ insight, onOpenDetail }) => {
  return (
    <div className="bg-[#141923] hover:bg-[#161C28] rounded-2xl border border-[#1E2638] p-6 transition-all shadow-lg flex flex-col justify-between space-y-6">
      
      {/* Top Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-md border border-blue-800/40">
            {insight.numberTag}
          </span>
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
              insight.confidence === 'High'
                ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                : 'bg-amber-950/60 text-amber-400 border-amber-800/40'
            }`}
          >
            {insight.confidence} Confidence ({insight.confidenceScore}%)
          </span>
        </div>

        <h3 className="text-base font-bold text-white tracking-tight uppercase leading-snug">
          {insight.title}
        </h3>

        <p className="text-xs text-slate-300 font-normal leading-relaxed">
          "{insight.headline}"
        </p>
      </div>

      {/* Core Evidence & Impact Block */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <div className="bg-[#0B0E14] p-3.5 rounded-xl border border-[#1E2638]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span>Evidence</span>
          </div>
          <p className="text-xs text-slate-200 font-medium leading-normal">
            {insight.evidenceStatement}
          </p>
        </div>

        <div className="bg-[#0B0E14] p-3.5 rounded-xl border border-[#1E2638]">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <TrendingDown className="w-3.5 h-3.5 text-red-400" />
            <span>Financial Impact</span>
          </div>
          <p className="text-xs text-red-400 font-bold leading-normal">
            {insight.impactStatement}
          </p>
        </div>
      </div>

      {/* Action Recommendation Box */}
      <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-1.5">
        <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
          <span>Try Next Month</span>
        </div>
        <p className="text-xs text-slate-200 font-medium leading-relaxed">
          {insight.nextMonthAction}
        </p>
      </div>

      {/* Bottom CTA */}
      <button
        onClick={() => onOpenDetail(insight)}
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1E2638] hover:bg-blue-600 text-slate-200 hover:text-white text-xs font-semibold rounded-xl transition-colors"
      >
        <span>See the trades</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
