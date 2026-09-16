import { Trade, MetricSummary } from '../types/trade';

/**
 * Calculates position value: entryPrice * quantity.
 */
export function getPositionValue(trade: Trade): number {
  if (trade.positionValue !== undefined) return trade.positionValue;
  return trade.entryPrice * trade.quantity;
}

/**
 * Calculates accurate median for an array of numbers.
 */
export function calculateMedian(values: number[]): number {
  if (!values || values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }
  return Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

/**
 * Parses time string (HH:MM) to total minutes from midnight.
 */
export function timeToMinutes(timeStr: string): number {
  if (!timeStr) return 0;
  const [h, m] = timeStr.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

/**
 * Checks if currentTrade was entered within windowMinutes (20m) after prevTrade exited on the SAME DAY and for the SAME SYMBOL.
 */
export function isRapidReentry(prevTrade: Trade, currentTrade: Trade, windowMinutes = 20): boolean {
  if (!prevTrade || !currentTrade) return false;
  if (prevTrade.outcome !== 'LOSS') return false;
  if (prevTrade.symbol !== currentTrade.symbol) return false; // Must be same symbol
  if (prevTrade.date !== currentTrade.date) return false; // Must be same day

  const prevExit = timeToMinutes(prevTrade.exitTime);
  const currentEntry = timeToMinutes(currentTrade.entryTime);

  const diff = currentEntry - prevExit;
  return diff >= 0 && diff <= windowMinutes;
}

/**
 * Deterministically computes statistics from trade dataset.
 */
export function calculateMetrics(trades: Trade[]): MetricSummary {
  if (!trades || trades.length === 0) {
    return {
      totalTrades: 0,
      winningTrades: 0,
      losingTrades: 0,
      breakevenTrades: 0,
      winRate: 0,
      totalPnl: 0,
      avgWin: 0,
      avgLoss: 0,
      winLossRatio: 0,
      medianWinDurationMinutes: 0,
      medianLossDurationMinutes: 0,
      durationRatio: 0,
      largestWin: 0,
      largestLoss: 0,
      stopLossUsageRate: 0,
      stopLossLossesRate: 0,
      rapidReentryCount: 0
    };
  }

  // Ensure positionValue is set on all trades
  trades.forEach((t) => {
    t.positionValue = getPositionValue(t);
  });

  const totalTrades = trades.length;
  const winningTradesList = trades.filter((t) => t.outcome === 'WIN' || t.pnl > 0);
  const losingTradesList = trades.filter((t) => t.outcome === 'LOSS' || t.pnl < 0);
  const breakevenTradesList = trades.filter((t) => t.outcome === 'BREAKEVEN' || t.pnl === 0);

  const winningTrades = winningTradesList.length;
  const losingTrades = losingTradesList.length;
  const breakevenTrades = breakevenTradesList.length;

  const winRate = Number(((winningTrades / totalTrades) * 100).toFixed(1));
  const totalPnl = trades.reduce((sum, t) => sum + t.pnl, 0);

  const totalWinPnl = winningTradesList.reduce((sum, t) => sum + t.pnl, 0);
  const totalLossPnl = losingTradesList.reduce((sum, t) => sum + t.pnl, 0);

  const avgWin = winningTrades > 0 ? Math.round(totalWinPnl / winningTrades) : 0;
  const avgLoss = losingTrades > 0 ? Math.round(Math.abs(totalLossPnl) / losingTrades) : 0;

  const winLossRatio = avgLoss > 0 ? Number((avgWin / avgLoss).toFixed(1)) : avgWin > 0 ? 99 : 0;

  const winDurations = winningTradesList.map((t) => t.durationMinutes);
  const lossDurations = losingTradesList.map((t) => t.durationMinutes);

  const medianWinDurationMinutes = calculateMedian(winDurations);
  const medianLossDurationMinutes = calculateMedian(lossDurations);

  const durationRatio =
    medianWinDurationMinutes > 0
      ? Number((medianLossDurationMinutes / medianWinDurationMinutes).toFixed(1))
      : 0;

  const largestWin = winningTradesList.length > 0 ? Math.max(...winningTradesList.map((t) => t.pnl)) : 0;
  const largestLoss = losingTradesList.length > 0 ? Math.min(...losingTradesList.map((t) => t.pnl)) : 0;

  const stopLossCount = trades.filter((t) => t.stopLossUsed).length;
  const stopLossUsageRate = Number(((stopLossCount / totalTrades) * 100).toFixed(1));

  const unprotectedLosses = losingTradesList.filter((t) => !t.stopLossUsed).length;
  const stopLossLossesRate =
    losingTrades > 0 ? Number(((unprotectedLosses / losingTrades) * 100).toFixed(1)) : 0;

  // Count same-symbol rapid re-entries (< 20m post loss)
  let rapidReentryCount = 0;
  for (let i = 1; i < trades.length; i++) {
    if (isRapidReentry(trades[i - 1], trades[i], 20)) {
      rapidReentryCount++;
    }
  }

  return {
    totalTrades,
    winningTrades,
    losingTrades,
    breakevenTrades,
    winRate,
    totalPnl,
    avgWin,
    avgLoss,
    winLossRatio,
    medianWinDurationMinutes,
    medianLossDurationMinutes,
    durationRatio,
    largestWin,
    largestLoss,
    stopLossUsageRate,
    stopLossLossesRate,
    rapidReentryCount
  };
}

/**
 * Formats minutes into human-readable duration string (e.g. 222m -> "3h 42m", 78m -> "1h 18m")
 */
export function formatDuration(minutes: number): string {
  if (!minutes || minutes <= 0) return '0m';
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hrs === 0) return `${mins}m`;
  if (mins === 0) return `${hrs}h`;
  return `${hrs}h ${mins}m`;
}
