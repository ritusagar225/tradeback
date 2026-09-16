import { Trade } from '../types/trade';

/**
 * 47 Realistic Sample Trades spanning ~1 month (Aug 15 - Sep 15, 2026)
 * Mathematically calibrated:
 * - Total Trades: 47
 * - Wins: 20
 * - Losses: 27
 * - Win Rate: 42.55% (42.6%)
 * - Net P&L: -₹8,420
 * - Median Win Duration: 78 mins (1h 18m)
 * - Median Loss Duration: 222 mins (3h 42m)
 * - Duration Ratio: 2.8x
 */
export const SAMPLE_TRADES: Trade[] = [
  // WEEK 1: AUG 15 - AUG 21
  {
    id: 'TRD-101',
    date: '2026-08-17',
    symbol: 'RELIANCE',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 2950,
    exitPrice: 2985,
    quantity: 25,
    pnl: 875,
    durationMinutes: 45,
    entryTime: '09:30',
    exitTime: '10:15',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN',
    tag: 'Breakout'
  },
  {
    id: 'TRD-102',
    date: '2026-08-17',
    symbol: 'TATAMOTORS',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1040,
    exitPrice: 1015,
    quantity: 50,
    pnl: -1250,
    durationMinutes: 310, // 5h 10m (Held long)
    entryTime: '10:30',
    exitTime: '15:40',
    stopLossUsed: false,
    targetUsed: false,
    outcome: 'LOSS',
    tag: 'Held through dip'
  },
  {
    id: 'TRD-103',
    date: '2026-08-17',
    symbol: 'TATAMOTORS',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1018,
    exitPrice: 1008,
    quantity: 100, // Position size spike (2x) right after loss
    pnl: -1000,
    durationMinutes: 14, // Rapid re-entry (<20m)
    entryTime: '15:15',
    exitTime: '15:29',
    stopLossUsed: false,
    targetUsed: false,
    outcome: 'LOSS',
    tag: 'Re-entry attempt'
  },
  {
    id: 'TRD-104',
    date: '2026-08-18',
    symbol: 'INFY',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1820,
    exitPrice: 1845,
    quantity: 40,
    pnl: 1000,
    durationMinutes: 65, // 1h 05m
    entryTime: '09:45',
    exitTime: '10:50',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN',
    tag: 'Morning momentum'
  },
  {
    id: 'TRD-105',
    date: '2026-08-18',
    symbol: 'BANKNIFTY26AUG',
    instrument: 'F&O',
    type: 'BUY',
    entryPrice: 51200,
    exitPrice: 50875,
    quantity: 15,
    pnl: -4875,
    durationMinutes: 240, // 4h 00m
    entryTime: '11:00',
    exitTime: '15:00',
    stopLossUsed: false,
    targetUsed: false,
    outcome: 'LOSS',
    tag: 'Option buying'
  },
  {
    id: 'TRD-106',
    date: '2026-08-19',
    symbol: 'HDFCBANK',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1640,
    exitPrice: 1662,
    quantity: 60,
    pnl: 1320,
    durationMinutes: 80, // 1h 20m
    entryTime: '10:00',
    exitTime: '11:20',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-107',
    date: '2026-08-19',
    symbol: 'ICICIBANK',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1180,
    exitPrice: 1168,
    quantity: 50,
    pnl: -600,
    durationMinutes: 222, // 3h 42m (target median)
    entryTime: '11:30',
    exitTime: '15:12',
    stopLossUsed: true,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-108',
    date: '2026-08-19',
    symbol: 'ICICIBANK',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1169,
    exitPrice: 1160,
    quantity: 50,
    pnl: -450,
    durationMinutes: 12, // Rapid re-entry (<20m)
    entryTime: '15:15',
    exitTime: '15:27',
    stopLossUsed: false,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-109',
    date: '2026-08-20',
    symbol: 'TCS',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 4250,
    exitPrice: 4290,
    quantity: 20,
    pnl: 800,
    durationMinutes: 78, // 1h 18m
    entryTime: '09:20',
    exitTime: '10:38',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-110',
    date: '2026-08-20',
    symbol: 'ADANIENT',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 3120,
    exitPrice: 3080,
    quantity: 20,
    pnl: -800,
    durationMinutes: 230, // 3h 50m
    entryTime: '10:45',
    exitTime: '14:35',
    stopLossUsed: false,
    targetUsed: false,
    outcome: 'LOSS'
  },

  // WEEK 2: AUG 22 - AUG 28
  {
    id: 'TRD-111',
    date: '2026-08-22',
    symbol: 'NIFTY26AUG',
    instrument: 'F&O',
    type: 'BUY',
    entryPrice: 24500,
    exitPrice: 24580,
    quantity: 25,
    pnl: 2000,
    durationMinutes: 90, // 1h 30m
    entryTime: '09:30',
    exitTime: '11:00',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-112',
    date: '2026-08-22',
    symbol: 'BAJFINANCE',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 6850,
    exitPrice: 6790,
    quantity: 15,
    pnl: -900,
    durationMinutes: 222, // 3h 42m
    entryTime: '11:15',
    exitTime: '14:57',
    stopLossUsed: true,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-113',
    date: '2026-08-23',
    symbol: 'RELIANCE',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 2980,
    exitPrice: 3015,
    quantity: 30,
    pnl: 1050,
    durationMinutes: 78, // 1h 18m
    entryTime: '09:25',
    exitTime: '10:43',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-114',
    date: '2026-08-23',
    symbol: 'SBIN',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 830,
    exitPrice: 813,
    quantity: 100,
    pnl: -1700,
    durationMinutes: 260, // 4h 20m
    entryTime: '10:45',
    exitTime: '15:05',
    stopLossUsed: false,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-115',
    date: '2026-08-23',
    symbol: 'SBIN',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 819,
    exitPrice: 811,
    quantity: 180, // Size spike after loss
    pnl: -1440,
    durationMinutes: 15, // Rapid re-entry (<20m)
    entryTime: '15:10',
    exitTime: '15:25',
    stopLossUsed: false,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-116',
    date: '2026-08-24',
    symbol: 'AXISBANK',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1150,
    exitPrice: 1172,
    quantity: 50,
    pnl: 1100,
    durationMinutes: 78, // 1h 18m
    entryTime: '10:00',
    exitTime: '11:18',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-117',
    date: '2026-08-24',
    symbol: 'LT',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 3600,
    exitPrice: 3560,
    quantity: 20,
    pnl: -800,
    durationMinutes: 222, // 3h 42m (exact target median)
    entryTime: '11:30',
    exitTime: '15:12',
    stopLossUsed: true,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-118',
    date: '2026-08-25',
    symbol: 'BHARTIARTL',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1480,
    exitPrice: 1505,
    quantity: 40,
    pnl: 1000,
    durationMinutes: 85, // 1h 25m
    entryTime: '09:30',
    exitTime: '10:55',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-119',
    date: '2026-08-25',
    symbol: 'MARUTI',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 12400,
    exitPrice: 12280,
    quantity: 10,
    pnl: -1200,
    durationMinutes: 245, // 4h 05m
    entryTime: '11:00',
    exitTime: '15:05',
    stopLossUsed: false,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-120',
    date: '2026-08-25',
    symbol: 'MARUTI',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 12290,
    exitPrice: 12220,
    quantity: 15,
    pnl: -1050,
    durationMinutes: 18, // Rapid re-entry (<20m)
    entryTime: '15:10',
    exitTime: '15:28',
    stopLossUsed: false,
    targetUsed: false,
    outcome: 'LOSS'
  },

  // WEEK 3: AUG 29 - SEP 04
  {
    id: 'TRD-121',
    date: '2026-08-29',
    symbol: 'KOTAKBANK',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1780,
    exitPrice: 1805,
    quantity: 40,
    pnl: 1000,
    durationMinutes: 50, // 50m (cut short)
    entryTime: '09:20',
    exitTime: '10:10',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-122',
    date: '2026-08-29',
    symbol: 'SUNPHARMA',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1720,
    exitPrice: 1695,
    quantity: 40,
    pnl: -1000,
    durationMinutes: 222, // 3h 42m
    entryTime: '10:30',
    exitTime: '14:12',
    stopLossUsed: true,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-123',
    date: '2026-08-30',
    symbol: 'NIFTY26SEP',
    instrument: 'F&O',
    type: 'BUY',
    entryPrice: 24800,
    exitPrice: 24880,
    quantity: 25,
    pnl: 2000,
    durationMinutes: 78, // 1h 18m
    entryTime: '09:40',
    exitTime: '10:58',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-124',
    date: '2026-08-30',
    symbol: 'TITAN',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 3550,
    exitPrice: 3510,
    quantity: 25,
    pnl: -1000,
    durationMinutes: 280, // 4h 40m
    entryTime: '10:30',
    exitTime: '15:10',
    stopLossUsed: false,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-125',
    date: '2026-08-30',
    symbol: 'TITAN',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 3515,
    exitPrice: 3495,
    quantity: 45, // Size spike after loss
    pnl: -900,
    durationMinutes: 16, // Rapid re-entry (<20m)
    entryTime: '15:12',
    exitTime: '15:28',
    stopLossUsed: false,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-126',
    date: '2026-08-31',
    symbol: 'WIPRO',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 520,
    exitPrice: 532,
    quantity: 100,
    pnl: 1200,
    durationMinutes: 60, // 1h
    entryTime: '10:15',
    exitTime: '11:15',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-127',
    date: '2026-08-31',
    symbol: 'HCLTECH',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1750,
    exitPrice: 1720,
    quantity: 50,
    pnl: -1500,
    durationMinutes: 230, // 3h 50m
    entryTime: '11:30',
    exitTime: '15:20',
    stopLossUsed: true,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-128',
    date: '2026-09-01',
    symbol: 'ULTRACEMCO',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 11200,
    exitPrice: 11350,
    quantity: 10,
    pnl: 1500,
    durationMinutes: 80, // 1h 20m
    entryTime: '09:30',
    exitTime: '10:50',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-129',
    date: '2026-09-01',
    symbol: 'ASIANPAINT',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 2880,
    exitPrice: 2840,
    quantity: 25,
    pnl: -1000,
    durationMinutes: 222, // 3h 42m
    entryTime: '11:00',
    exitTime: '14:42',
    stopLossUsed: false,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-130',
    date: '2026-09-02',
    symbol: 'POWERGRID',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 330,
    exitPrice: 342,
    quantity: 150,
    pnl: 1800,
    durationMinutes: 95, // 1h 35m
    entryTime: '10:00',
    exitTime: '11:35',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-131',
    date: '2026-09-02',
    symbol: 'NTPC',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 390,
    exitPrice: 382,
    quantity: 150,
    pnl: -1200,
    durationMinutes: 250, // 4h 10m
    entryTime: '11:00',
    exitTime: '15:10',
    stopLossUsed: true,
    targetUsed: false,
    outcome: 'LOSS'
  },

  // WEEK 4: SEP 05 - SEP 12
  {
    id: 'TRD-132',
    date: '2026-09-05',
    symbol: 'RELIANCE',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 3010,
    exitPrice: 3045,
    quantity: 30,
    pnl: 1050,
    durationMinutes: 72, // 1h 12m
    entryTime: '09:20',
    exitTime: '10:32',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-133',
    date: '2026-09-05',
    symbol: 'TATASTEEL',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 155,
    exitPrice: 150,
    quantity: 200,
    pnl: -1000,
    durationMinutes: 222, // 3h 42m
    entryTime: '10:45',
    exitTime: '14:27',
    stopLossUsed: false,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-134',
    date: '2026-09-05',
    symbol: 'TATASTEEL',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 151,
    exitPrice: 147,
    quantity: 350, // Size spike after loss
    pnl: -1400,
    durationMinutes: 14, // Rapid re-entry (<20m)
    entryTime: '14:30',
    exitTime: '14:44',
    stopLossUsed: false,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-135',
    date: '2026-09-06',
    symbol: 'GRASIM',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 2650,
    exitPrice: 2685,
    quantity: 30,
    pnl: 1050,
    durationMinutes: 76, // 1h 16m
    entryTime: '10:00',
    exitTime: '11:16',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-136',
    date: '2026-09-06',
    symbol: 'HDFCBANK',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1670,
    exitPrice: 1650,
    quantity: 50,
    pnl: -1000,
    durationMinutes: 195, // 3h 15m
    entryTime: '11:30',
    exitTime: '14:45',
    stopLossUsed: true,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-137',
    date: '2026-09-07',
    symbol: 'NESTLEIND',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 2500,
    exitPrice: 2540,
    quantity: 25,
    pnl: 1000,
    durationMinutes: 84, // 1h 24m
    entryTime: '09:30',
    exitTime: '10:54',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-138',
    date: '2026-09-07',
    symbol: 'INDUSINDBK',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1420,
    exitPrice: 1395,
    quantity: 40,
    pnl: -1000,
    durationMinutes: 240, // 4h 00m
    entryTime: '11:00',
    exitTime: '15:00',
    stopLossUsed: false,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-139',
    date: '2026-09-08',
    symbol: 'JSWSTEEL',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 940,
    exitPrice: 962,
    quantity: 50,
    pnl: 1100,
    durationMinutes: 78, // 1h 18m
    entryTime: '10:00',
    exitTime: '11:18',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-140',
    date: '2026-09-08',
    symbol: 'HINDALCO',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 680,
    exitPrice: 665,
    quantity: 80,
    pnl: -1200,
    durationMinutes: 225, // 3h 45m
    entryTime: '11:20',
    exitTime: '15:05',
    stopLossUsed: true,
    targetUsed: false,
    outcome: 'LOSS'
  },

  // FINAL FEW DAYS: SEP 09 - SEP 15
  {
    id: 'TRD-141',
    date: '2026-09-10',
    symbol: 'DIVISLAB',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 4800,
    exitPrice: 4860,
    quantity: 20,
    pnl: 1200,
    durationMinutes: 68, // 1h 08m
    entryTime: '09:25',
    exitTime: '10:33',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-142',
    date: '2026-09-10',
    symbol: 'CIPLA',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1540,
    exitPrice: 1515,
    quantity: 40,
    pnl: -1000,
    durationMinutes: 235, // 3h 55m
    entryTime: '10:45',
    exitTime: '14:40',
    stopLossUsed: false,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-143',
    date: '2026-09-10',
    symbol: 'CIPLA',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 1518,
    exitPrice: 1498,
    quantity: 60,
    pnl: -1200,
    durationMinutes: 17, // Rapid re-entry (<20m)
    entryTime: '14:45',
    exitTime: '15:02',
    stopLossUsed: false,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-144',
    date: '2026-09-11',
    symbol: 'EICHERMOT',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 4900,
    exitPrice: 4970,
    quantity: 15,
    pnl: 1050,
    durationMinutes: 78, // 1h 18m
    entryTime: '09:30',
    exitTime: '10:48',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-145',
    date: '2026-09-11',
    symbol: 'HEROMOTOCO',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 5400,
    exitPrice: 5330,
    quantity: 15,
    pnl: -1050,
    durationMinutes: 222, // 3h 42m
    entryTime: '11:00',
    exitTime: '14:42',
    stopLossUsed: true,
    targetUsed: false,
    outcome: 'LOSS'
  },
  {
    id: 'TRD-146',
    date: '2026-09-12',
    symbol: 'BAJAJ-AUTO',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 9800,
    exitPrice: 9920,
    quantity: 10,
    pnl: 1200,
    durationMinutes: 80, // 1h 20m
    entryTime: '10:00',
    exitTime: '11:20',
    stopLossUsed: true,
    targetUsed: true,
    outcome: 'WIN'
  },
  {
    id: 'TRD-147',
    date: '2026-09-12',
    symbol: 'COALINDIA',
    instrument: 'Equity',
    type: 'BUY',
    entryPrice: 490,
    exitPrice: 478,
    quantity: 100,
    pnl: -1200,
    durationMinutes: 222, // 3h 42m
    entryTime: '11:30',
    exitTime: '15:12',
    stopLossUsed: false,
    targetUsed: false,
    outcome: 'LOSS'
  }
];
