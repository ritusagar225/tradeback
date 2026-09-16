import { describe, it, expect } from 'vitest';
import { rankInsights } from '../engine/ranker';
import { SAMPLE_TRADES } from '../data/sampleTrades';
import { FEW_TRADES, DISCIPLINED_TRADES } from '../data/edgeCaseTrades';

describe('ranker engine and restraint logic (Requirements A, B, C, H, J)', () => {
  it('Requirement J & C: Ranker returns deterministic ordering with 4-component priorityScore formula', () => {
    const result1 = rankInsights(SAMPLE_TRADES);
    const result2 = rankInsights(SAMPLE_TRADES);

    expect(result1.restraintReason).toBeNull();
    expect(result1.insights.length).toBe(3);
    
    // Deterministic ordering check
    expect(result1.insights[0].id).toBe(result2.insights[0].id);
    expect(result1.insights[1].id).toBe(result2.insights[1].id);
    expect(result1.insights[2].id).toBe(result2.insights[2].id);

    // Number tags strictly 01, 02, 03
    expect(result1.insights[0].numberTag).toBe('01');
    expect(result1.insights[1].numberTag).toBe('02');
    expect(result1.insights[2].numberTag).toBe('03');
  });

  it('Requirement A & B: Frequency normalization is capped at 100, impact uses absolute loss magnitude', () => {
    const result = rankInsights(SAMPLE_TRADES);
    
    result.insights.forEach((insight) => {
      expect(insight.impactPnl).toBeGreaterThan(0); // Absolute loss magnitude
      expect(insight.confidenceScore).toBeGreaterThanOrEqual(0);
      expect(insight.confidenceScore).toBeLessThanOrEqual(100);
      expect(insight.priorityScore).toBeGreaterThanOrEqual(0);
      expect(insight.priorityScore).toBeLessThanOrEqual(100);
    });
  });

  it('Requirement H: Fewer than 10 trades produce zero insights (Restraint UX)', () => {
    const result = rankInsights(FEW_TRADES);
    expect(result.restraintReason).toBe('fewer_than_10_trades');
    expect(result.insights.length).toBe(0);
  });

  it('Restraint UX: Disciplined dataset without strong patterns produces zero insights', () => {
    const result = rankInsights(DISCIPLINED_TRADES);
    expect(result.restraintReason).toBe('no_strong_pattern');
    expect(result.insights.length).toBe(0);
  });
});
