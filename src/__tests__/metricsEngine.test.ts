import { describe, it, expect } from 'vitest';
import { calculateMetrics, calculateMedian, isRapidReentry, getPositionValue } from '../engine/metricsEngine';
import { SAMPLE_TRADES } from '../data/sampleTrades';

describe('metricsEngine & Data Integrity (Requirements I & D)', () => {
  it('calculates median correctly for odd and even lists', () => {
    expect(calculateMedian([10, 20, 30])).toBe(20);
    expect(calculateMedian([10, 20, 30, 40])).toBe(25);
    expect(calculateMedian([])).toBe(0);
  });

  it('calculates positionValue accurately as entryPrice * quantity', () => {
    const trade = { ...SAMPLE_TRADES[0], entryPrice: 1000, quantity: 50 };
    expect(getPositionValue(trade)).toBe(50000);
  });

  it('Requirement I: All calculated metrics match the source 47 trades', () => {
    const metrics = calculateMetrics(SAMPLE_TRADES);

    expect(metrics.totalTrades).toBe(47);
    expect(metrics.winningTrades).toBe(20);
    expect(metrics.losingTrades).toBe(27);
    expect(metrics.winRate).toBe(42.6);
    expect(metrics.totalPnl).toBe(-8420);
    expect(metrics.medianWinDurationMinutes).toBe(78);
    expect(metrics.medianLossDurationMinutes).toBe(222);
    expect(metrics.durationRatio).toBe(2.8);
  });

  it('Requirement D: Rapid re-entry ONLY detects same-symbol trades within 20 minutes on the same day', () => {
    const trade1 = { ...SAMPLE_TRADES[1], symbol: 'TATAMOTORS', outcome: 'LOSS' as const, date: '2026-08-17', exitTime: '15:00' };
    const trade2Same = { ...SAMPLE_TRADES[2], symbol: 'TATAMOTORS', date: '2026-08-17', entryTime: '15:14' };
    const trade2DiffSymbol = { ...SAMPLE_TRADES[2], symbol: 'RELIANCE', date: '2026-08-17', entryTime: '15:14' };
    const trade2DiffDay = { ...SAMPLE_TRADES[2], symbol: 'TATAMOTORS', date: '2026-08-18', entryTime: '15:14' };
    const trade2Late = { ...SAMPLE_TRADES[2], symbol: 'TATAMOTORS', date: '2026-08-17', entryTime: '15:25' };

    expect(isRapidReentry(trade1, trade2Same, 20)).toBe(true);
    expect(isRapidReentry(trade1, trade2DiffSymbol, 20)).toBe(false); // Different symbol
    expect(isRapidReentry(trade1, trade2DiffDay, 20)).toBe(false); // Different day
    expect(isRapidReentry(trade1, trade2Late, 20)).toBe(false); // >20 minutes
  });
});
