import { describe, it, expect } from 'vitest';
import {
  runAllDetectors,
  getConfidenceLabel,
  detectLosersHeldLonger,
  detectCuttingWinnersShort,
  detectPositionSizeSpike
} from '../engine/patternEngine';
import { SAMPLE_TRADES } from '../data/sampleTrades';
import { Trade } from '../types/trade';

describe('patternEngine & getConfidenceLabel (Confidence Mapping Test)', () => {
  it('Requirement: getConfidenceLabel maps confidenceScore to High/Medium/Low accurately', () => {
    expect(getConfidenceLabel(100)).toBe('High');
    expect(getConfidenceLabel(86)).toBe('High');
    expect(getConfidenceLabel(70)).toBe('High');
    expect(getConfidenceLabel(69)).toBe('Medium');
    expect(getConfidenceLabel(45)).toBe('Medium');
    expect(getConfidenceLabel(44)).toBe('Low');
    expect(getConfidenceLabel(0)).toBe('Low');
  });

  it('detects primary behavioural patterns with explicit thresholds on sample dataset', () => {
    const insights = runAllDetectors(SAMPLE_TRADES);
    expect(insights.length).toBeGreaterThanOrEqual(3);

    const loserInsight = insights.find((i) => i.patternType === 'losers_held_longer');
    expect(loserInsight).toBeDefined();
    expect(loserInsight?.affectedTradesCount).toBeGreaterThanOrEqual(4);
    expect(loserInsight?.confidence).toBe('High');
    expect(loserInsight?.confidenceScore).toBeGreaterThanOrEqual(70);
    expect(loserInsight?.impactPnl).toBeGreaterThan(0);

    const spikeInsight = insights.find((i) => i.patternType === 'position_size_spike');
    expect(spikeInsight).toBeDefined();
    expect(spikeInsight?.confidenceScore).toBe(100);
    expect(spikeInsight?.confidence).toBe('High'); // 100 -> High!
  });

  it('Position-size spike uses positionValue (entryPrice * quantity) rather than raw quantity', () => {
    const spikeInsight = detectPositionSizeSpike(SAMPLE_TRADES);
    expect(spikeInsight).toBeDefined();
    expect(spikeInsight?.title).toContain('Position value increases');
    expect(spikeInsight?.headline.toLowerCase()).toContain('position value');
  });

  it('Winners-closed-quickly never references hypothetical missed P&L', () => {
    const winnersInsight = detectCuttingWinnersShort(SAMPLE_TRADES);
    if (winnersInsight) {
      expect(winnersInsight.headline).not.toContain('missed');
      expect(winnersInsight.headline).not.toContain('could have');
      expect(winnersInsight.impactStatement).not.toContain('missed');
    }
  });

  it('Evidence thresholds prevent weak patterns from surfacing', () => {
    const weakTrades: Trade[] = SAMPLE_TRADES.slice(0, 5).map((t, idx) => ({
      ...t,
      durationMinutes: idx === 0 ? 300 : 45
    }));

    const result = detectLosersHeldLonger(weakTrades);
    expect(result).toBeNull();
  });
});
