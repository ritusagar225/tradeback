import React from 'react';
import { ArrowRight, ShieldCheck, FileSpreadsheet, Lock } from 'lucide-react';

interface LandingScreenProps {
  onStartSampleAnalysis: () => void;
  onOpenUpload: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({
  onStartSampleAnalysis,
  onOpenUpload
}) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between py-12 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Top Hero Section */}
      <div className="flex-1 flex flex-col justify-center items-center text-center max-w-3xl mx-auto space-y-8 my-auto">
        
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-950/60 border border-blue-800/40 text-blue-400 text-xs font-semibold tracking-wide">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Retrospective Self-Review &amp; Behaviour Analysis</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
          Know what is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">costing you money</span>.
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
          Turn one month of trades into the 2–3 behaviours worth reviewing.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
          <button
            onClick={onStartSampleAnalysis}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Use sample trades</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenUpload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#141923] hover:bg-[#1B2230] text-slate-200 text-sm font-semibold rounded-xl border border-[#1E2638] transition-all hover:text-white"
          >
            <FileSpreadsheet className="w-4 h-4 text-slate-400" />
            <span>Review my month</span>
          </button>
        </div>

        {/* Cautious Micro Statement */}
        <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5 pt-2">
          <Lock className="w-3 h-3 text-slate-600" />
          <span>No predictions. No market advice. Just your trading behaviour.</span>
        </p>

      </div>

      {/* Product Core Promise Box */}
      <div className="mt-16 pt-8 border-t border-[#1E2638]/60">
        <div className="text-center mb-8">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Core Product Principle
          </p>
          <p className="text-xl sm:text-2xl font-semibold text-white mt-1">
            "Don't show me all my trades. Tell me what I keep doing."
          </p>
        </div>

        {/* 4 Step Analytical Loop */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-[#141923] p-4.5 rounded-xl border border-[#1E2638] text-left space-y-1">
            <div className="text-xs font-mono text-blue-400 font-semibold">01. TRADES</div>
            <h4 className="text-sm font-semibold text-white">1 Month History</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Order timestamps, entry/exit prices, SL usage &amp; holding times.</p>
          </div>

          <div className="bg-[#141923] p-4.5 rounded-xl border border-[#1E2638] text-left space-y-1">
            <div className="text-xs font-mono text-indigo-400 font-semibold">02. PATTERNS</div>
            <h4 className="text-sm font-semibold text-white">2–3 Habits Flagged</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Separates signal from noise to isolate high-frequency drawdown habits.</p>
          </div>

          <div className="bg-[#141923] p-4.5 rounded-xl border border-[#1E2638] text-left space-y-1">
            <div className="text-xs font-mono text-amber-400 font-semibold">03. EVIDENCE</div>
            <h4 className="text-sm font-semibold text-white">Empirical Math</h4>
            <p className="text-xs text-slate-400 leading-relaxed">Exact holding-duration ratios, trade counts, and ₹ loss impact.</p>
          </div>

          <div className="bg-[#141923] p-4.5 rounded-xl border border-[#1E2638] text-left space-y-1">
            <div className="text-xs font-mono text-emerald-400 font-semibold">04. ACTION</div>
            <h4 className="text-sm font-semibold text-white">Next Month Focus</h4>
            <p className="text-xs text-slate-400 leading-relaxed">One concrete behaviour change to test during next month's trading.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
