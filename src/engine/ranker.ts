import { Trade, PatternInsight } from '../types/trade';
import { runAllDetectors } from './patternEngine';

export interface AnalysisResult {
  insights: PatternInsight[];
  restraintReason: 'fewer_than_10_trades' | 'no_strong_pattern' | null;
  totalCandidatesFound: number;
}

/**
 * Deterministically ranks behavioural patterns based on explicit 4-component formula:
 * priorityScore = (normalizedImpact * 0.40) + (normalizedFrequency * 0.20) + (confidenceScore * 0.25) + (actionabilityScore * 0.15)
 *
 * Component Normalization Definitions (All 0–100 Scale):
 * - normalizedImpact: Math.min(100, Math.round((impactMagnitude / maxImpactMagnitude) * 100)), where impactMagnitude is absolute loss magnitude.
 * - normalizedFrequency: Math.min(100, Math.round((affectedTradesCount / totalTrades) * 100)).
 * - confidenceScore: Detector-provided 0–100 confidence rating.
 * - actionabilityScore: Fixed 90 (all insights provide a concrete, single next-month intervention).
 *
 * Restraint Logic:
 * - Fewer than 10 trades -> Restraint ("fewer_than_10_trades")
 * - No pattern passing minimum evidence thresholds -> Restraint ("no_strong_pattern")
 * - Surfaces strictly TOP 2–3 insights (never >3).
 */
export function rankInsights(trades: Trade[]): AnalysisResult {
  if (!trades || trades.length < 10) {
    return {
      insights: [],
      restraintReason: 'fewer_than_10_trades',
      totalCandidatesFound: 0
    };
  }

  const rawInsights = runAllDetectors(trades);

  if (rawInsights.length === 0) {
    return {
      insights: [],
      restraintReason: 'no_strong_pattern',
      totalCandidatesFound: 0
    };
  }

  // Find max absolute loss magnitude for impact normalization
  const maxImpactMagnitude = Math.max(...rawInsights.map((i) => Math.abs(i.impactPnl)), 0);

  const scoredInsights = rawInsights.map((insight) => {
    // 1. Normalized Impact (0-100) using absolute loss magnitude
    const impactMagnitude = Math.abs(insight.impactPnl);
    const normalizedImpact = maxImpactMagnitude > 0 
      ? Math.min(100, Math.round((impactMagnitude / maxImpactMagnitude) * 100))
      : 0;

    // 2. Normalized Frequency (0-100): capped at 100
    const normalizedFrequency = Math.min(
      100,
      Math.round((insight.affectedTradesCount / trades.length) * 100)
    );

    // 3. Confidence Score (0-100) from detector
    const confidenceScore = Math.min(100, Math.max(0, insight.confidenceScore));

    // 4. Actionability Score (0-100)
    const actionabilityScore = 90;

    // Combined Priority Score (Weighted Sum)
    const priorityScore = Number(
      (
        normalizedImpact * 0.40 +
        normalizedFrequency * 0.20 +
        confidenceScore * 0.25 +
        actionabilityScore * 0.15
      ).toFixed(1)
    );

    return {
      ...insight,
      priorityScore
    };
  });

  // Filter out low priority score noise (< 30 score)
  const validInsights = scoredInsights.filter((i) => i.priorityScore >= 30);

  if (validInsights.length === 0) {
    return {
      insights: [],
      restraintReason: 'no_strong_pattern',
      totalCandidatesFound: rawInsights.length
    };
  }

  // Sort descending by priorityScore
  validInsights.sort((a, b) => b.priorityScore - a.priorityScore);

  // Take top 2-3 insights (strictly max 3)
  const topInsights = validInsights.slice(0, 3).map((insight, idx) => ({
    ...insight,
    numberTag: `0${idx + 1}`
  }));

  return {
    insights: topInsights,
    restraintReason: null,
    totalCandidatesFound: rawInsights.length
  };
}
