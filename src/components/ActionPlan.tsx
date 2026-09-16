import React, { useState } from 'react';
import { UserGoal, PatternInsight } from '../types/trade';
import { CheckCircle, Target, ArrowRight, RotateCcw, Calendar, Award } from 'lucide-react';

interface ActionPlanProps {
  currentGoal: UserGoal | null;
  onSaveGoal: (insight: PatternInsight) => void;
  onResetReview: () => void;
}

export const ActionPlan: React.FC<ActionPlanProps> = ({
  currentGoal,
  onResetReview
}) => {
  if (!currentGoal) {
    return (
      <div className="bg-[#141923] p-8 rounded-2xl border border-[#1E2638] text-center space-y-4 max-w-xl mx-auto my-12">
        <Target className="w-10 h-10 text-slate-500 mx-auto" />
        <h3 className="text-lg font-bold text-white">No Next-Month Focus Set Yet</h3>
        <p className="text-xs text-slate-400">
          Review your month and select one behavioural insight to set your single focus goal for next month.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-8 animate-fade-in">
      {/* Confirmation Card */}
      <div className="bg-[#141923] rounded-2xl border border-emerald-500/30 p-8 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Badge */}
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 text-xs font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Focus Saved</span>
          </div>

          <div className="text-xs font-mono text-slate-500 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>Saved {new Date(currentGoal.savedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Focus Details */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Your Next-Month Focus
          </span>
          <h2 className="text-2xl font-extrabold text-white">
            "{currentGoal.actionText}"
          </h2>
          <div className="bg-[#0B0E14] p-4 rounded-xl border border-[#1E2638] space-y-1">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Why this focus matters
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-normal">
              {currentGoal.rationale}
            </p>
          </div>
        </div>

        {/* Commitment Statement */}
        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
          <Award className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-slate-300 leading-relaxed">
            Next month, TradeBack will review your order history specifically against this single commitment to track whether your execution improved.
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={onResetReview}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all"
          >
            <span>Got it</span>
            <CheckCircle className="w-4 h-4" />
          </button>

          <button
            onClick={onResetReview}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0B0E14] hover:bg-[#1B2230] text-slate-300 text-xs font-medium rounded-xl border border-[#1E2638] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Review again next month</span>
          </button>
        </div>
      </div>
    </div>
  );
};
