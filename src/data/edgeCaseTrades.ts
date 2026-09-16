import { Trade } from '../types/trade';

/**
 * Edge Case Dataset 1: Fewer than 10 trades (8 trades total).
 * Expected engine behavior: Restraint state -> "Not enough evidence yet"
 */
export const FEW_TRADES: Trade[] = [
  {
    id: 'TRD-001',
    date: '2026-09-01',
    symbol: 'RELIANCE',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 2950,
    exitPrice: 2975,
    quantity: 20,
    pnl: 500,
    durationMinutes: 45,
    entryTime: '09:30',
    exitTime: '10:15',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-002',
    date: '2026-09-02',
    symbol: 'TATAMOTORS',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1040,
    exitPrice: 1025,
    quantity: 30,
    pnl: -450,
    durationMinutes: 60,
    entryTime: '10:30',
    exitTime: '11:30',
    stopLossUsed: true,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-003',
    date: '2026-09-03',
    symbol: 'INFY',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1820,
    exitPrice: 1840,
    quantity: 25,
    pnl: 500,
    durationMinutes: 50,
    entryTime: '11:00',
    exitTime: '11:50',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-004',
    date: '2026-09-05',
    symbol: 'HDFCBANK',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1640,
    exitPrice: 1625,
    quantity: 40,
    pnl: -600,
    durationMinutes: 70,
    entryTime: '09:45',
    exitTime: '10:55',
    stopLossUsed: true,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-005',
    date: '2026-09-07',
    symbol: 'ICICIBANK',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1180,
    exitPrice: 1195,
    quantity: 30,
    pnl: 450,
    durationMinutes: 55,
    entryTime: '14:00',
    exitTime: '14:55',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-006',
    date: '2026-09-08',
    symbol: 'TCS',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 4250,
    exitPrice: 4230,
    quantity: 15,
    pnl: -300,
    durationMinutes: 65,
    entryTime: '10:15',
    exitTime: '11:20',
    stopLossUsed: true,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-007',
    date: '2026-09-10',
    symbol: 'SBIN',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 830,
    exitPrice: 842,
    quantity: 50,
    pnl: 600,
    durationMinutes: 40,
    entryTime: '09:30',
    exitTime: '10:10',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-008',
    date: '2026-09-12',
    symbol: 'BHARTIARTL',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1480,
    exitPrice: 1468,
    quantity: 30,
    pnl: -360,
    durationMinutes: 50,
    entryTime: '11:00',
    exitTime: '11:50',
    stopLossUsed: true,
    targetUsed: false,
    outcome: 'LOSS'
  }
];

/**
 * Edge Case Dataset 2: Disciplined Trader (25 trades).
 * High stop-loss usage (100%), controlled holding times, win rate > 56%, positive P&L.
 * Expected engine behavior: Restraint state -> "No strong behavioural pattern found."
 */
export const DISCIPLINED_TRADES: Trade[] = Array.from({ length: 24 }).map((_, idx) => {
  const isWin = idx % 2 === 0 || idx % 5 === 0;
  return {
    id: `DISC-${201 + idx}`,
    date: `2026-08-${10 + Math.floor(idx / 2)}`,
    symbol: idx % 3 === 0 ? 'RELIANCE' : idx % 3 === 1 ? 'INFY' : 'HDFCBANK',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1500,
    exitPrice: isWin ? 1530 : 1485,
    quantity: 20,
    pnl: isWin ? 600 : -300,
    durationMinutes: isWin ? 65 : 45, // Losers exited faster than winners!
    entryTime: '10:00',
    exitTime: '11:05',
    stopLossUsed: true,
    targetUsed: true,
    outcome: isWin ? 'WIN' : 'LOSS'
  };
});
