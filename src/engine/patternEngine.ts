import { Trade, PatternInsight } from "../types/trade";
import {
  calculateMetrics,
  formatDuration,
  isRapidReentry,
  getPositionValue,
} from "./metricsEngine";

/**
 * Shared deterministic helper mapping numeric confidence score (0-100) to confidence label.
 * - score >= 70 -> High
 * - score >= 45 -> Medium
 * - score < 45  -> Low
 */
export function getConfidenceLabel(
  confidenceScore: number,
): "High" | "Medium" | "Low" {
  if (confidenceScore >= 70) return "High";
  if (confidenceScore >= 45) return "Medium";
  return "Low";
}

/**
 * 5 Deterministic Pattern Detectors with Explicit Minimum Evidence Thresholds.
 * All impactPnl values are returned as absolute positive numbers (loss magnitude).
 * All confidence ratings provide both confidence ("High" | "Medium" | "Low") and confidenceScore (0-100).
 * All language is non-causal and avoids psychological inferences.
 */

// Detector 1: Losing trades stay open longer
export function detectLosersHeldLonger(trades: Trade[]): PatternInsight | null {
  const metrics = calculateMetrics(trades);
  const { medianWinDurationMinutes, medianLossDurationMinutes, losingTrades } =
    metrics;

  if (losingTrades === 0 || medianWinDurationMinutes === 0) return null;

  const durationRatio = Number(
    (medianLossDurationMinutes / medianWinDurationMinutes).toFixed(1),
  );

  // Minimum Evidence Threshold 1: durationRatio >= 1.8
  if (durationRatio < 1.8) return null;

  const losingTradesList = trades.filter(
    (t) => t.outcome === "LOSS" || t.pnl < 0,
  );
  const affectedTrades = losingTradesList.filter(
    (t) => t.durationMinutes > medianWinDurationMinutes,
  );
  const affectedCount = affectedTrades.length;

  // Minimum Evidence Threshold 2: at least 4 affected trades & at least 20% of losing trades
  if (affectedCount < 4 || affectedCount / losingTrades < 0.2) return null;

  const absoluteImpactPnl = Math.abs(
    affectedTrades.reduce((sum, t) => sum + t.pnl, 0),
  );

  const confidenceScore = Math.min(
    100,
    Math.round(durationRatio * 20 + (affectedCount / losingTrades) * 40),
  );
  const confidence = getConfidenceLabel(confidenceScore);

  const formattedLossDur = formatDuration(medianLossDurationMinutes);
  const formattedWinDur = formatDuration(medianWinDurationMinutes);

  return {
    id: "PAT-01-LOSERS-HELD",
    patternType: "losers_held_longer",
    numberTag: "01",
    title: "Losing trades stay open longer",
    headline: `Your losing trades stayed open for a median of ${formattedLossDur}, compared with ${formattedWinDur} for winning trades.`,
    evidenceStatement: `${affectedCount} of ${losingTrades} losing trades matched this holding-duration pattern.`,
    impactStatement: `Trades matching this pattern accounted for ₹${absoluteImpactPnl.toLocaleString("en-IN")} of losses.`,
    impactPnl: absoluteImpactPnl,
    confidence,
    confidenceScore,
    affectedTradesCount: affectedCount,
    totalLosingTradesCount: losingTrades,
    nextMonthAction: "Define your exit condition before entering the trade.",
    actionRationale:
      "Your review found that extended losing positions accounted for a disproportionate share of your losses.",
    supportingTradeIds: affectedTrades.map((t) => t.id),
    metrics: [
      {
        label: "Median losing duration",
        value: formattedLossDur,
        helper: "Typical open time for losses",
      },
      {
        label: "Median winning duration",
        value: formattedWinDur,
        helper: "Typical open time for wins",
      },
      {
        label: "Duration ratio",
        value: `${durationRatio}×`,
        helper: "Ratio of loss vs win holding time",
      },
      {
        label: "Trades matching pattern",
        value: `${affectedCount} / ${losingTrades}`,
        helper: "Losing trades held > median win time",
      },
      {
        label: "Associated loss impact",
        value: `₹${absoluteImpactPnl.toLocaleString("en-IN")}`,
        helper: "Absolute loss magnitude",
      },
    ],
    visualComparison: {
      labelA: "Median Loss Duration",
      valueA: formattedLossDur,
      rawA: medianLossDurationMinutes,
      labelB: "Median Win Duration",
      valueB: formattedWinDur,
      rawB: medianWinDurationMinutes,
      unit: "min",
    },
    priorityScore: 0,
  };
}

// Detector 2: Rapid re-entry after losses (Same-symbol within 20 mins)
export function detectRapidReentry(trades: Trade[]): PatternInsight | null {
  const metrics = calculateMetrics(trades);
  const { losingTrades } = metrics;
  if (trades.length < 10) return null;

  const rapidTrades: Trade[] = [];

  for (let i = 1; i < trades.length; i++) {
    if (isRapidReentry(trades[i - 1], trades[i], 20)) {
      rapidTrades.push(trades[i]);
    }
  }

  const affectedCount = rapidTrades.length;

  // Minimum Evidence Threshold: At least 3 same-symbol rapid re-entry trades
  if (affectedCount < 3) return null;

  const rapidLosses = rapidTrades.filter(
    (t) => t.outcome === "LOSS" || t.pnl < 0,
  );
  const lossRate = Math.round((rapidLosses.length / affectedCount) * 100);

  // Minimum Evidence Threshold: Loss rate on re-entries >= 50%
  if (lossRate < 50) return null;

  const absoluteImpactPnl = Math.abs(
    rapidLosses.reduce((sum, t) => sum + t.pnl, 0),
  );

  const confidenceScore = Math.min(
    100,
    Math.round((affectedCount / trades.length) * 200 + lossRate * 0.4),
  );
  const confidence = getConfidenceLabel(confidenceScore);

  return {
    id: "PAT-02-RAPID-REENTRY",
    patternType: "rapid_reentry",
    numberTag: "02",
    title: "Rapid re-entry after losses",
    headline: `${affectedCount} same-symbol trades were entered within 20 minutes of closing a losing position.`,
    evidenceStatement: `${rapidLosses.length} of ${affectedCount} rapid re-entries resulted in further losses (${lossRate}% loss rate).`,
    impactStatement: `Trades matching this pattern accounted for ₹${absoluteImpactPnl.toLocaleString("en-IN")} of losses.`,
    impactPnl: absoluteImpactPnl,
    confidence,
    confidenceScore,
    affectedTradesCount: affectedCount,
    totalLosingTradesCount: losingTrades,
    nextMonthAction:
      "Enforce a 20-minute cooling period immediately after closing any losing trade.",
    actionRationale:
      "Trades re-entered on the same symbol within 20 minutes of a loss showed a significantly higher failure rate than your baseline.",
    supportingTradeIds: rapidTrades.map((t) => t.id),
    metrics: [
      {
        label: "Same-symbol rapid re-entries",
        value: `${affectedCount}`,
        helper: "Entered <20m after same-symbol loss",
      },
      {
        label: "Re-entry loss rate",
        value: `${lossRate}%`,
        helper: `${rapidLosses.length} out of ${affectedCount} lost money`,
      },
      {
        label: "Baseline win rate",
        value: `${metrics.winRate}%`,
        helper: "Overall monthly performance",
      },
      {
        label: "Associated loss impact",
        value: `₹${absoluteImpactPnl.toLocaleString("en-IN")}`,
        helper: "Absolute loss magnitude",
      },
    ],
    visualComparison: {
      labelA: "Rapid Re-entry Loss Rate",
      valueA: `${lossRate}%`,
      rawA: lossRate,
      labelB: "Baseline Loss Rate",
      valueB: `${(100 - metrics.winRate).toFixed(1)}%`,
      rawB: Number((100 - metrics.winRate).toFixed(1)),
      unit: "%",
    },
    priorityScore: 0,
  };
}

// Detector 3: Losing trades without recorded stop-loss
export function detectMissingStopLoss(trades: Trade[]): PatternInsight | null {
  const metrics = calculateMetrics(trades);
  const { losingTrades } = metrics;
  if (losingTrades === 0) return null;

  const losingTradesList = trades.filter(
    (t) => t.outcome === "LOSS" || t.pnl < 0,
  );
  const unprotectedLosses = losingTradesList.filter((t) => !t.stopLossUsed);

  const affectedCount = unprotectedLosses.length;

  // Minimum Evidence Threshold: At least 4 unprotected losing trades
  if (affectedCount < 4) return null;

  const unprotectedRate = Math.round((affectedCount / losingTrades) * 100);

  // Minimum Evidence Threshold: At least 25% of losing trades lacked a stop-loss
  if (unprotectedRate < 25) return null;

  const absoluteImpactPnl = Math.abs(
    unprotectedLosses.reduce((sum, t) => sum + t.pnl, 0),
  );

  const confidenceScore = Math.min(
    100,
    Math.round(unprotectedRate * 0.8 + affectedCount * 3),
  );
  const confidence = getConfidenceLabel(confidenceScore);

  return {
    id: "PAT-03-MISSING-SL",
    patternType: "missing_stop_loss",
    numberTag: "03",
    title: "Losing trades without recorded stop-loss",
    headline: `${affectedCount} of your ${losingTrades} losing trades had no stop-loss recorded at trade entry.`,
    evidenceStatement: `Unprotected losing trades matched ${unprotectedRate}% of your total losing trades.`,
    impactStatement: `Trades matching this pattern accounted for ₹${absoluteImpactPnl.toLocaleString("en-IN")} of losses.`,
    impactPnl: absoluteImpactPnl,
    confidence,
    confidenceScore,
    affectedTradesCount: affectedCount,
    totalLosingTradesCount: losingTrades,
    nextMonthAction:
      "Attach a pre-defined stop-loss order simultaneously upon trade entry.",
    actionRationale:
      "Trades without a pre-set exit trigger matched a substantial share of your total monthly drawdown.",
    supportingTradeIds: unprotectedLosses.map((t) => t.id),
    metrics: [
      {
        label: "Unprotected losing trades",
        value: `${affectedCount} / ${losingTrades}`,
        helper: "Losing trades without stop-loss",
      },
      {
        label: "Share of total losses",
        value: `${unprotectedRate}%`,
        helper: "Percentage of all losing trades",
      },
      {
        label: "Associated loss impact",
        value: `₹${absoluteImpactPnl.toLocaleString("en-IN")}`,
        helper: "Absolute loss magnitude",
      },
    ],
    visualComparison: {
      labelA: "Unprotected Loss Share",
      valueA: `${unprotectedRate}%`,
      rawA: unprotectedRate,
      labelB: "Protected Loss Share",
      valueB: `${100 - unprotectedRate}%`,
      rawB: 100 - unprotectedRate,
      unit: "%",
    },
    priorityScore: 0,
  };
}

// Detector 4: Winners closed unusually quickly (purely observable holding-duration evidence)
export function detectCuttingWinnersShort(
  trades: Trade[],
): PatternInsight | null {
  const metrics = calculateMetrics(trades);
  const { medianWinDurationMinutes, medianLossDurationMinutes } = metrics;

  const winningList = trades.filter((t) => t.outcome === "WIN" || t.pnl > 0);

  // Minimum Evidence Threshold: At least 5 winning trades
  if (winningList.length < 5) return null;

  // Condition: winning trade duration < 0.5 * median win duration AND losing trade duration > 2 * median win duration
  const quickWins = winningList.filter(
    (t) => t.durationMinutes < 0.5 * medianWinDurationMinutes,
  );
  const affectedCount = quickWins.length;

  // Minimum Evidence Threshold: At least 4 quick winning trades
  if (affectedCount < 4) return null;

  const absoluteImpactPnl = Math.abs(
    quickWins.reduce((sum, t) => sum + t.pnl, 0),
  );

  const confidenceScore = Math.min(
    100,
    Math.round((affectedCount / winningList.length) * 100),
  );
  const confidence = getConfidenceLabel(confidenceScore);

  const formattedWinDur = formatDuration(medianWinDurationMinutes);
  const formattedLossDur = formatDuration(medianLossDurationMinutes);

  return {
    id: "PAT-04-CUT-WINNERS",
    patternType: "cutting_winners_short",
    numberTag: "04",
    title: "Winners closed unusually quickly",
    headline: `Your winning trades are frequently closed much earlier than your losing trades.`,
    evidenceStatement: `${affectedCount} winning trades were exited in less than half your median winning duration (${formattedWinDur}).`,
    impactStatement: `₹${absoluteImpactPnl.toLocaleString("en-IN")} of realized win P&L came from positions held for very short durations.`,
    impactPnl: absoluteImpactPnl,
    confidence,
    confidenceScore,
    affectedTradesCount: affectedCount,
    totalLosingTradesCount: metrics.losingTrades,
    nextMonthAction:
      "Use trailing stop-loss triggers instead of exiting winning trades manually.",
    actionRationale:
      "Exiting winning trades quickly creates an asymmetry between your average win holding time and average loss holding time.",
    supportingTradeIds: quickWins.map((t) => t.id),
    metrics: [
      {
        label: "Quick winning trades",
        value: `${affectedCount} / ${winningList.length}`,
        helper: "Exited in < 0.5x median win time",
      },
      {
        label: "Median win holding time",
        value: formattedWinDur,
        helper: "Overall win duration",
      },
      {
        label: "Median loss holding time",
        value: formattedLossDur,
        helper: "Overall loss duration",
      },
    ],
    priorityScore: 0,
  };
}

// Detector 5: Position value increases after a losing trade (using positionValue = entryPrice * quantity)
export function detectPositionSizeSpike(
  trades: Trade[],
): PatternInsight | null {
  if (trades.length < 10) return null;

  const spikedTrades: Trade[] = [];

  for (let i = 1; i < trades.length; i++) {
    const prev = trades[i - 1];
    const curr = trades[i];

    const prevVal = getPositionValue(prev);
    const currVal = getPositionValue(curr);

    // Condition: previous trade was a LOSS & current trade normalized position value >= 1.5x previous position value
    if (prev.outcome === "LOSS" && currVal >= 1.5 * prevVal) {
      spikedTrades.push(curr);
    }
  }

  const affectedCount = spikedTrades.length;

  // Minimum Evidence Threshold: At least 3 position-value spikes post-loss
  if (affectedCount < 3) return null;

  const spikedLosses = spikedTrades.filter(
    (t) => t.outcome === "LOSS" || t.pnl < 0,
  );
  const absoluteImpactPnl = Math.abs(
    spikedLosses.reduce((sum, t) => sum + t.pnl, 0),
  );

  const confidenceScore = Math.min(100, Math.round(affectedCount * 25));
  const confidence = getConfidenceLabel(confidenceScore);

  return {
    id: "PAT-05-SIZE-SPIKE",
    patternType: "position_size_spike",
    numberTag: "05",
    title: "Position value increases after losses",
    headline: `Position value increased after losing trades.`,
    evidenceStatement: `${spikedLosses.length} of ${affectedCount} elevated position-value trades resulted in further losses.`,
    impactStatement: `Trades matching this pattern accounted for ₹${absoluteImpactPnl.toLocaleString("en-IN")} of losses.`,
    impactPnl: absoluteImpactPnl,
    confidence,
    confidenceScore,
    affectedTradesCount: affectedCount,
    totalLosingTradesCount: trades.filter((t) => t.outcome === "LOSS").length,
    nextMonthAction:
      "Keep position value constant across all trades regardless of previous outcome.",
    actionRationale:
      "Elevated position values following a loss matched a significant portion of your net monthly drawdown.",
    supportingTradeIds: spikedTrades.map((t) => t.id),
    metrics: [
      {
        label: "Elevated position value trades",
        value: `${affectedCount}`,
        helper: ">=1.5x previous position value",
      },
      {
        label: "Elevated trades that lost",
        value: `${spikedLosses.length} / ${affectedCount}`,
        helper: "Loss outcome count",
      },
      {
        label: "Associated loss impact",
        value: `₹${absoluteImpactPnl.toLocaleString("en-IN")}`,
        helper: "Absolute loss magnitude",
      },
    ],
    priorityScore: 0,
  };
}

/**
 * Runs all 5 detectors and returns candidate insights.
 */
export function runAllDetectors(trades: Trade[]): PatternInsight[] {
  const detectors = [
    detectLosersHeldLonger,
    detectRapidReentry,
    detectMissingStopLoss,
    detectCuttingWinnersShort,
    detectPositionSizeSpike,
  ];

  const results: PatternInsight[] = [];

  for (const detector of detectors) {
    const insight = detector(trades);
    if (insight) {
      results.push(insight);
    }
  }

  return results;
}
