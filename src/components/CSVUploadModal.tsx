import React, { useState } from 'react';
import { Trade } from '../types/trade';
import { X, Upload, FileText, CheckCircle2, AlertTriangle, Download } from 'lucide-react';

interface CSVUploadModalProps {
  onClose: () => void;
  onSuccess: (customTrades: Trade[]) => void;
}

export const CSVUploadModal: React.FC<CSVUploadModalProps> = ({ onClose, onSuccess }) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [parsedCount, setParsedCount] = useState<number | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        if (!text) throw new Error('File is empty.');

        const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
        if (lines.length < 2) {
          throw new Error('CSV must contain a header row and at least one data row.');
        }

        const headers = lines[0].split(',').map((h) => h.trim().toLowerCase());
        
        // Validate required headers
        const required = ['date', 'symbol', 'entryprice', 'exitprice', 'quantity', 'pnl', 'durationminutes'];
        const missing = required.filter((r) => !headers.includes(r));

        if (missing.length > 0) {
          throw new Error(`Missing required columns: ${missing.join(', ')}`);
        }

        const parsedTrades: Trade[] = [];

        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map((c) => c.trim());
          if (cols.length < headers.length) continue;

          const getValue = (field: string) => cols[headers.indexOf(field)];

          const date = getValue('date');
          const symbol = getValue('symbol').toUpperCase();
          const entryPrice = parseFloat(getValue('entryprice')) || 0;
          const exitPrice = parseFloat(getValue('exitprice')) || 0;
          const quantity = parseInt(getValue('quantity')) || 10;
          const pnl = parseFloat(getValue('pnl')) || 0;
          const durationMinutes = parseInt(getValue('durationminutes')) || 30;
          const stopLossUsed = getValue('stoplossused')?.toLowerCase() === 'true';

          const outcome = pnl > 0 ? 'WIN' : pnl < 0 ? 'LOSS' : 'BREAKEVEN';

          parsedTrades.push({
            id: `CSV-${100 + i}`,
            date,
            symbol,
            instrument: symbol.includes('NIFTY') ? 'F&O' : 'Equity',
            type: pnl >= 0 ? 'BUY' : 'BUY',
            entryPrice,
            exitPrice,
            quantity,
            pnl,
            durationMinutes,
            entryTime: '10:00',
            exitTime: '11:00',
            stopLossUsed,
            targetUsed: true,
            outcome
          });
        }

        if (parsedTrades.length === 0) {
          throw new Error('No valid trade rows could be parsed from the file.');
        }

        setParsedCount(parsedTrades.length);
        setErrorMsg(null);

        setTimeout(() => {
          onSuccess(parsedTrades);
        }, 800);
      } catch (err: any) {
        setErrorMsg(err.message || 'Failed to parse CSV file.');
        setParsedCount(null);
      }
    };
    reader.readAsText(file);
  };

  const downloadSampleTemplate = () => {
    const sampleCsv = `date,symbol,entryprice,exitprice,quantity,pnl,durationminutes,stoplossused
2026-08-17,RELIANCE,2950,2985,25,875,45,true
2026-08-17,TATAMOTORS,1040,1015,50,-1250,310,false
2026-08-18,INFY,1820,1845,40,1000,65,true
2026-08-18,BANKNIFTY,51200,50875,15,-4875,240,false`;

    const blob = new Blob([sampleCsv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tradeback_sample_schema.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-[#141923] rounded-2xl border border-[#1E2638] shadow-2xl p-6 sm:p-7 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1E2638] pb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-blue-400" />
              <span>Import Trading History CSV</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Upload your 1-month trade logs for instant client-side review.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#0B0E14] text-slate-400 hover:text-white border border-[#1E2638]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Upload Dropzone */}
        <div className="border-2 border-dashed border-[#1E2638] hover:border-blue-500/50 rounded-2xl p-8 text-center bg-[#0B0E14]/60 transition-colors relative">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <FileText className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <p className="text-sm font-semibold text-white">Click or drag CSV file here</p>
          <p className="text-xs text-slate-400 mt-1">Supports standard order log exports</p>
        </div>

        {/* Parsing Feedback */}
        {parsedCount !== null && (
          <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-800/40 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{parsedCount} trades successfully parsed! Loading review...</span>
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-950/40 p-4 rounded-xl border border-red-800/40 flex items-start gap-2.5 text-xs text-red-400">
            <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold">Some rows couldn't be understood</strong>
              <span>{errorMsg}</span>
            </div>
          </div>
        )}

        {/* Sample Template Footer */}
        <div className="flex items-center justify-between pt-2 text-xs text-slate-400 border-t border-[#1E2638]">
          <span>Need the format template?</span>
          <button
            onClick={downloadSampleTemplate}
            className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-semibold"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Sample CSV</span>
          </button>
        </div>

      </div>
    </div>
  );
};
