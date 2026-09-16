import React from 'react';
import { UserGoal } from '../types/trade';
import { Target, CheckCircle2, Calendar, Award, ArrowRight } from 'lucide-react';

interface HistoryTabProps {
  goal: UserGoal | null;
  onGoToReview: () => void;
}

export const HistoryTab: React.FC<HistoryTabProps> = ({ goal, onGoToReview }) => {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Personal Action History
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track your next-month focus commitments and behavioral review history.
          </p>
        </div>
        <button
          onClick={onGoToReview}
          className="px-4 py-2 bg-[#141923] hover:bg-[#1B2230] text-slate-300 text-xs font-semibold rounded-xl border border-[#1E2638] transition-colors"
        >
          Back to Review
        </button>
      </div>

      {goal ? (
        <div className="bg-[#141923] rounded-2xl border border-blue-500/30 p-6 space-y-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-[#1E2638] pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                ACTIVE NEXT-MONTH FOCUS
              </span>
            </div>
            <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>Saved {new Date(goal.savedAt).toLocaleDateString()}</span>
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">
              "{goal.actionText}"
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-[#0B0E14] p-3.5 rounded-xl border border-[#1E2638]">
              <strong className="text-slate-200">Rationale:</strong> {goal.rationale}
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-[#1E2638]">
            <span className="flex items-center gap-1.5 text-blue-400 font-medium">
              <Award className="w-4 h-4 text-blue-400" />
              <span>Next review scheduled for next month</span>
            </span>
            <button
              onClick={onGoToReview}
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white font-semibold"
            >
              <span>View current trades</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#141923] p-8 rounded-2xl border border-[#1E2638] text-center space-y-4">
          <Target className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No active goal set</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Complete a retrospective review of your month and select one insight to save as your next-month focus.
          </p>
          <button
            onClick={onGoToReview}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all"
          >
            Review my month now
          </button>
        </div>
      )}
    </div>
  );
};
