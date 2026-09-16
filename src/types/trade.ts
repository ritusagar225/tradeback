export interface Trade {
  id: string;
  date: string; // YYYY-MM-DD
  symbol: string;
  instrument: "Equity" | "F&O";
  type: "BUY" | "SELL";
  entryPrice: number;
  exitPrice: number;
  quantity: number;
  pnl: number;
  durationMinutes: number;
  entryTime: string; // HH:MM
  exitTime: string;  // HH:MM
  stopLossUsed: boolean;
  targetUsed: boolean;
  outcome: "WIN" | "LOSS" | "BREAKEVEN";
  positionValue?: number; // entryPrice * quantity
  tag?: string;
}

export interface MetricSummary {
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  breakevenTrades: number;
  winRate: number; // percentage e.g. 42.6
  totalPnl: number; // net sum
  avgWin: number;
  avgLoss: number;
  winLossRatio: number; // avgWin / avgLoss
  medianWinDurationMinutes: number;
  medianLossDurationMinutes: number;
  durationRatio: number; // medianLoss / medianWin
  largestWin: number;
  largestLoss: number;
  stopLossUsageRate: number; // percentage of all trades
  stopLossLossesRate: number; // percentage of losing trades without stoploss
  rapidReentryCount: number;
}

export type PatternType = 
  | "losers_held_longer" 
  | "rapid_reentry" 
  | "missing_stop_loss" 
  | "cutting_winners_short" 
  | "position_size_spike";

export interface PatternInsight {
  id: string;
  patternType: PatternType;
  numberTag: string; // "01", "02", "03"
  title: string; // What are you doing?
  headline: string; // Concise summary sentence
  evidenceStatement: string; // 18 of 27 losing trades matched this behaviour
  impactStatement: string; // ₹4,860 of losses associated with this pattern
  impactPnl: number; // Absolute loss magnitude (positive number)
  confidence: "High" | "Medium" | "Low";
  confidenceScore: number; // 0 to 100
  affectedTradesCount: number;
  totalLosingTradesCount: number;
  nextMonthAction: string; // What to try instead
  actionRationale: string;
  supportingTradeIds: string[];
  metrics: {
    label: string;
    value: string;
    helper?: string;
  }[];
  visualComparison?: {
    labelA: string;
    valueA: string;
    rawA: number;
    labelB: string;
    valueB: string;
    rawB: number;
    unit: string;
  };
  priorityScore: number;
}

export interface UserGoal {
  insightId: string;
  patternType: PatternType;
  title: string;
  actionText: string;
  rationale: string;
  savedAt: string; // ISO date string
}
