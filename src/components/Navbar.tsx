import React from 'react';
import { ShieldCheck, Upload } from 'lucide-react';

interface NavbarProps {
  onOpenUpload: () => void;
  onResetToLanding: () => void;
  selectedDataset?: string;
  onSelectDataset?: (key: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenUpload,
  onResetToLanding,
  selectedDataset = 'sample',
  onSelectDataset
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0B0E14]/90 backdrop-blur-md border-b border-[#1E2638]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={onResetToLanding}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <ShieldCheck className="w-4.5 h-4.5" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
              TradeBack
            </span>
            <span className="hidden sm:inline-block text-[10px] font-medium text-slate-500 uppercase tracking-wider">
              Personal Trading Review
            </span>
          </div>
        </div>

        {/* Actions: Test dataset & Import CSV */}
        <div className="flex items-center gap-3 sm:gap-4">
          {onSelectDataset && (
            <div className="flex items-center gap-2 bg-[#141923] border border-[#1E2638] rounded-xl px-3 py-1.5">
              <label htmlFor="test-dataset-select" className="text-[11px] font-medium text-slate-400 whitespace-nowrap">
                Test dataset:
              </label>
              <select
                id="test-dataset-select"
                value={selectedDataset}
                onChange={(e) => onSelectDataset(e.target.value)}
                className="bg-transparent text-slate-200 text-xs font-medium focus:outline-none cursor-pointer"
              >
                <option value="sample" className="bg-[#141923] text-slate-200">Sample trades (47)</option>
                <option value="few" className="bg-[#141923] text-slate-200">Few trades (&lt;10)</option>
                <option value="disciplined" className="bg-[#141923] text-slate-200">Disciplined trader</option>
                {selectedDataset === 'custom' && (
                  <option value="custom" className="bg-[#141923] text-slate-200">Custom CSV</option>
                )}
              </select>
            </div>
          )}

          <button
            onClick={onOpenUpload}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-[#141923] hover:bg-[#1B2230] px-3.5 py-2 rounded-xl border border-[#1E2638] transition-all shadow-sm"
          >
            <Upload className="w-3.5 h-3.5 text-slate-400" />
            <span>Import CSV</span>
          </button>
        </div>
      </div>
    </header>
  );
};
