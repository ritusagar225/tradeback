import React, { useEffect, useState } from 'react';
import { Loader2, Sparkles, Filter, Database } from 'lucide-react';

interface LoadingAnalysisProps {
  tradeCount: number;
  onComplete: () => void;
}

export const LoadingAnalysis: React.FC<LoadingAnalysisProps> = ({
  tradeCount,
  onComplete
}) => {
  const [stage, setStage] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    const timer1 = setTimeout(() => setStage(2), 650);
    const timer2 = setTimeout(() => setStage(3), 1300);
    const timer3 = setTimeout(() => onComplete(), 1900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-md bg-[#141923] p-8 rounded-2xl border border-[#1E2638] shadow-2xl space-y-6">
        {/* Animated Icon */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500">
          {stage === 1 && <Database className="w-7 h-7 animate-pulse text-blue-400" />}
          {stage === 2 && <Sparkles className="w-7 h-7 animate-pulse text-indigo-400" />}
          {stage === 3 && <Filter className="w-7 h-7 animate-pulse text-emerald-400" />}
        </div>

        {/* Dynamic Stage Message */}
        <div className="space-y-2 h-16 flex flex-col justify-center">
          {stage === 1 && (
            <div className="space-y-1 transition-all">
              <h3 className="text-lg font-semibold text-white">
                Reviewing {tradeCount} trades...
              </h3>
              <p className="text-xs text-slate-400">Parsing order history & timestamp logs</p>
            </div>
          )}

          {stage === 2 && (
            <div className="space-y-1 transition-all">
              <h3 className="text-lg font-semibold text-white">
                Looking for repeatable patterns...
              </h3>
              <p className="text-xs text-slate-400">Comparing holding times, re-entries & stop-losses</p>
            </div>
          )}

          {stage === 3 && (
            <div className="space-y-1 transition-all">
              <h3 className="text-lg font-semibold text-white">
                Separating signal from noise...
              </h3>
              <p className="text-xs text-slate-400">Ranking top 2–3 behaviours by impact & evidence</p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#0B0E14] h-2 rounded-full overflow-hidden border border-[#1E2638]">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 ease-out"
            style={{
              width: stage === 1 ? '33%' : stage === 2 ? '66%' : '100%'
            }}
          />
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 font-mono">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>Deterministic Client-Side Analysis Engine</span>
        </div>
      </div>
    </div>
  );
};
