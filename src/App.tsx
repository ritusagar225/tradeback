import React, { useState, useEffect, useMemo } from 'react';
import { Trade, UserGoal, PatternInsight } from './types/trade';
import { SAMPLE_TRADES } from './data/sampleTrades';
import { FEW_TRADES, DISCIPLINED_TRADES } from './data/edgeCaseTrades';
import { calculateMetrics } from './engine/metricsEngine';
import { rankInsights } from './engine/ranker';

import { Navbar } from './components/Navbar';
import { LandingScreen } from './components/LandingScreen';
import { LoadingAnalysis } from './components/LoadingAnalysis';
import { ReviewScreen } from './components/ReviewScreen';
import { EdgeStateView } from './components/EdgeStateView';
import { ActionPlan } from './components/ActionPlan';
import { HistoryTab } from './components/HistoryTab';
import { CSVUploadModal } from './components/CSVUploadModal';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<
    'landing' | 'loading' | 'review' | 'action_plan' | 'history'
  >('landing');
  
  const [selectedDatasetKey, setSelectedDatasetKey] = useState<string>('sample');
  const [trades, setTrades] = useState<Trade[]>(SAMPLE_TRADES);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [userGoal, setUserGoal] = useState<UserGoal | null>(null);

  // Load saved goal from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('tradeback_focus_goal');
      if (saved) {
        setUserGoal(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load saved goal', e);
    }
  }, []);

  // Recalculate metrics and ranked insights whenever trades change
  const metrics = useMemo(() => calculateMetrics(trades), [trades]);
  const analysisResult = useMemo(() => rankInsights(trades), [trades]);

  const handleStartSampleAnalysis = () => {
    setSelectedDatasetKey('sample');
    setTrades(SAMPLE_TRADES);
    setCurrentView('loading');
  };

  const handleSelectDataset = (key: string) => {
    setSelectedDatasetKey(key);
    if (key === 'few') {
      setTrades(FEW_TRADES);
    } else if (key === 'disciplined') {
      setTrades(DISCIPLINED_TRADES);
    } else {
      setTrades(SAMPLE_TRADES);
    }
    setCurrentView('loading');
  };

  const handleCustomCSVUpload = (customTrades: Trade[]) => {
    setTrades(customTrades);
    setSelectedDatasetKey('custom');
    setIsUploadOpen(false);
    setCurrentView('loading');
  };

  const handleSetFocusGoal = (insight: PatternInsight) => {
    const goal: UserGoal = {
      insightId: insight.id,
      patternType: insight.patternType,
      title: insight.title,
      actionText: insight.nextMonthAction,
      rationale: insight.actionRationale,
      savedAt: new Date().toISOString()
    };
    setUserGoal(goal);
    try {
      localStorage.setItem('tradeback_focus_goal', JSON.stringify(goal));
    } catch (e) {
      console.error('Failed to save goal', e);
    }
    setCurrentView('action_plan');
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-[#F1F5F9] font-sans antialiased flex flex-col justify-between">
      {/* Top Navbar */}
      <Navbar
        onOpenUpload={() => setIsUploadOpen(true)}
        onResetToLanding={() => setCurrentView('landing')}
        selectedDataset={selectedDatasetKey}
        onSelectDataset={handleSelectDataset}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingScreen
            onStartSampleAnalysis={handleStartSampleAnalysis}
            onOpenUpload={() => setIsUploadOpen(true)}
          />
        )}

        {currentView === 'loading' && (
          <LoadingAnalysis
            tradeCount={trades.length}
            onComplete={() => setCurrentView('review')}
          />
        )}

        {currentView === 'review' && (
          <>
            {analysisResult.restraintReason ? (
              <EdgeStateView
                reason={analysisResult.restraintReason}
                tradeCount={trades.length}
                onLoadSampleTrades={handleStartSampleAnalysis}
              />
            ) : (
              <ReviewScreen
                trades={trades}
                metrics={metrics}
                insights={analysisResult.insights}
                onSetFocusGoal={handleSetFocusGoal}
              />
            )}
          </>
        )}

        {currentView === 'action_plan' && (
          <ActionPlan
            currentGoal={userGoal}
            onSaveGoal={handleSetFocusGoal}
            onResetReview={() => setCurrentView('review')}
          />
        )}

        {currentView === 'history' && (
          <HistoryTab
            goal={userGoal}
            onGoToReview={() => setCurrentView('review')}
          />
        )}
      </main>

      {/* CSV Import Modal */}
      {isUploadOpen && (
        <CSVUploadModal
          onClose={() => setIsUploadOpen(false)}
          onSuccess={handleCustomCSVUpload}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-[#1E2638] py-6 px-4 text-center text-xs text-slate-500 font-mono">
        TradeBack — Product Management Prototype for Nubra • 100% Client-Side Review Engine
      </footer>
    </div>
  );
};

export default App;
