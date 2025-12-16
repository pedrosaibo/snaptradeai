'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation } from '@/lib/translations';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { OnboardingStep, UserProfile } from '@/lib/onboarding-types';
import { ChevronRight, ChevronLeft, Check, Target } from 'lucide-react';

export function OnboardingWizard({ onComplete }: { onComplete: () => void }) {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { userProfile, updateProfile, completeOnboarding } = useOnboarding();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(1);

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => (prev + 1) as OnboardingStep);
    } else {
      completeOnboarding();
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as OnboardingStep);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Profile />;
      case 2:
        return <Step2Financial />;
      case 3:
        return <Step3Preferences />;
      case 4:
        return <Step4Technical />;
      case 5:
        return <Step5Personalization />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl bg-gray-900/50 border-gray-800">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">EntryHunter.ai</h1>
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">{t.welcomeToEntryHunter}</h2>
            <p className="text-gray-400">{t.letsPersonalize}</p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">
                {t.section} {currentStep} / {totalSteps}
              </span>
              <span className="text-sm text-gray-400">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Step Content */}
          <div className="mb-8">{renderStep()}</div>

          {/* Navigation */}
          <div className="flex justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {t.previous}
            </Button>
            <Button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white"
            >
              {currentStep === 5 ? t.complete : t.next}
              {currentStep < 5 && <ChevronRight className="w-4 h-4 ml-2" />}
              {currentStep === 5 && <Check className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Step 1: Profile
function Step1Profile() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { userProfile, updateProfile } = useOnboarding();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">{t.profileSection}</h3>

      {/* Main Goal */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">{t.mainGoal}</label>
        <div className="grid grid-cols-2 gap-3">
          {(['learn', 'analysis', 'automate', 'other'] as const).map((goal) => (
            <button
              key={goal}
              onClick={() => updateProfile({ mainGoal: goal })}
              className={`p-4 rounded-lg border-2 transition-all ${
                userProfile.mainGoal === goal
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <span className="text-white">
                {goal === 'learn' && t.mainGoalLearn}
                {goal === 'analysis' && t.mainGoalAnalysis}
                {goal === 'automate' && t.mainGoalAutomate}
                {goal === 'other' && t.mainGoalOther}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Knowledge Level */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">{t.knowledgeLevel}</label>
        <div className="grid grid-cols-2 gap-3">
          {(['beginner', 'intermediate', 'advanced', 'professional'] as const).map((level) => (
            <button
              key={level}
              onClick={() => updateProfile({ knowledgeLevel: level })}
              className={`p-4 rounded-lg border-2 transition-all ${
                userProfile.knowledgeLevel === level
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <span className="text-white">
                {level === 'beginner' && t.knowledgeBeginner}
                {level === 'intermediate' && t.knowledgeIntermediate}
                {level === 'advanced' && t.knowledgeAdvanced}
                {level === 'professional' && t.knowledgeProfessional}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Experience Time */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">{t.experienceTime}</label>
        <div className="grid grid-cols-2 gap-3">
          {(['none', 'less6months', '6months2years', 'more2years'] as const).map((time) => (
            <button
              key={time}
              onClick={() => updateProfile({ experienceTime: time })}
              className={`p-4 rounded-lg border-2 transition-all ${
                userProfile.experienceTime === time
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <span className="text-white">
                {time === 'none' && t.experienceNone}
                {time === 'less6months' && t.experienceLess6}
                {time === '6months2years' && t.experience6to2}
                {time === 'more2years' && t.experienceMore2}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Step 2: Financial
function Step2Financial() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { userProfile, updateProfile } = useOnboarding();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">{t.financialSection}</h3>

      {/* Investment Capital */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">{t.investmentCapital}</label>
        <div className="grid grid-cols-1 gap-3">
          {(['less100', '100to500', '500to2000', '2000to10000', 'more10000'] as const).map((capital) => (
            <button
              key={capital}
              onClick={() => updateProfile({ investmentCapital: capital })}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                userProfile.investmentCapital === capital
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <span className="text-white">
                {capital === 'less100' && t.capitalLess100}
                {capital === '100to500' && t.capital100to500}
                {capital === '500to2000' && t.capital500to2000}
                {capital === '2000to10000' && t.capital2000to10000}
                {capital === 'more10000' && t.capitalMore10000}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Operation Frequency */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">{t.operationFrequency}</label>
        <div className="grid grid-cols-2 gap-3">
          {(['daily', 'weekly', 'monthly', 'occasional'] as const).map((freq) => (
            <button
              key={freq}
              onClick={() => updateProfile({ operationFrequency: freq })}
              className={`p-4 rounded-lg border-2 transition-all ${
                userProfile.operationFrequency === freq
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <span className="text-white">
                {freq === 'daily' && t.frequencyDaily}
                {freq === 'weekly' && t.frequencyWeekly}
                {freq === 'monthly' && t.frequencyMonthly}
                {freq === 'occasional' && t.frequencyOccasional}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Risk Tolerance */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">{t.riskTolerance}</label>
        <div className="grid grid-cols-1 gap-3">
          {(['veryLow', 'low', 'moderate', 'high', 'veryHigh'] as const).map((risk) => (
            <button
              key={risk}
              onClick={() => updateProfile({ riskTolerance: risk })}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                userProfile.riskTolerance === risk
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <span className="text-white">
                {risk === 'veryLow' && t.riskVeryLow}
                {risk === 'low' && t.riskLow}
                {risk === 'moderate' && t.riskModerate}
                {risk === 'high' && t.riskHigh}
                {risk === 'veryHigh' && t.riskVeryHigh}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Financial Goal */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">{t.financialGoal}</label>
        <div className="grid grid-cols-2 gap-3">
          {(['extraIncome', 'hobby', 'wealth', 'autonomy', 'other'] as const).map((goal) => (
            <button
              key={goal}
              onClick={() => updateProfile({ financialGoal: goal })}
              className={`p-4 rounded-lg border-2 transition-all ${
                userProfile.financialGoal === goal
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <span className="text-white">
                {goal === 'extraIncome' && t.goalExtraIncome}
                {goal === 'hobby' && t.goalHobby}
                {goal === 'wealth' && t.goalWealth}
                {goal === 'autonomy' && t.goalAutonomy}
                {goal === 'other' && t.goalOther}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Step 3: Preferences
function Step3Preferences() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { userProfile, updateProfile } = useOnboarding();

  const toggleMarket = (market: 'forex' | 'crypto' | 'indices' | 'stocks' | 'commodities') => {
    const current = userProfile.favoriteMarkets || [];
    const updated = current.includes(market)
      ? current.filter((m) => m !== market)
      : [...current, market];
    updateProfile({ favoriteMarkets: updated });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">{t.preferencesSection}</h3>

      {/* Favorite Markets */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">{t.favoriteMarkets}</label>
        <div className="grid grid-cols-2 gap-3">
          {(['forex', 'crypto', 'indices', 'stocks', 'commodities'] as const).map((market) => (
            <button
              key={market}
              onClick={() => toggleMarket(market)}
              className={`p-4 rounded-lg border-2 transition-all ${
                userProfile.favoriteMarkets?.includes(market)
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <span className="text-white">
                {market === 'forex' && t.marketForex}
                {market === 'crypto' && t.marketCrypto}
                {market === 'indices' && t.marketIndices}
                {market === 'stocks' && t.marketStocks}
                {market === 'commodities' && t.marketCommodities}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Preferred Timeframe */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">{t.preferredTimeframe}</label>
        <div className="grid grid-cols-2 gap-3">
          {(['scalping', 'intraday', 'swing', 'longTerm'] as const).map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => updateProfile({ preferredTimeframe: timeframe })}
              className={`p-4 rounded-lg border-2 transition-all ${
                userProfile.preferredTimeframe === timeframe
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <span className="text-white">
                {timeframe === 'scalping' && t.timeframeScalping}
                {timeframe === 'intraday' && t.timeframeIntraday}
                {timeframe === 'swing' && t.timeframeSwing}
                {timeframe === 'longTerm' && t.timeframeLongTerm}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Analysis Detail */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">{t.analysisDetail}</label>
        <div className="grid grid-cols-3 gap-3">
          {(['quick', 'detailed', 'both'] as const).map((detail) => (
            <button
              key={detail}
              onClick={() => updateProfile({ analysisDetail: detail })}
              className={`p-4 rounded-lg border-2 transition-all ${
                userProfile.analysisDetail === detail
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <span className="text-white">
                {detail === 'quick' && t.detailQuick}
                {detail === 'detailed' && t.detailDetailed}
                {detail === 'both' && t.detailBoth}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Step 4: Technical Knowledge
function Step4Technical() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { userProfile, updateProfile } = useOnboarding();

  const concepts = [
    { key: 'supportResistance', label: t.conceptSupportResistance },
    { key: 'trend', label: t.conceptTrend },
    { key: 'priceAction', label: t.conceptPriceAction },
    { key: 'marketStructure', label: t.conceptMarketStructure },
    { key: 'chartPatterns', label: t.conceptChartPatterns },
    { key: 'fvgs', label: t.conceptFVGs },
    { key: 'riskManagement', label: t.conceptRiskManagement },
  ];

  const updateConcept = (concept: string, value: number) => {
    updateProfile({
      technicalConcepts: {
        ...userProfile.technicalConcepts,
        [concept]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">{t.technicalSection}</h3>

      {/* Technical Concepts */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-4">{t.familiarityWith}</label>
        <div className="space-y-4">
          {concepts.map((concept) => (
            <div key={concept.key}>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-300">{concept.label}</span>
                <span className="text-sm text-blue-400">
                  {userProfile.technicalConcepts?.[concept.key as keyof typeof userProfile.technicalConcepts] || 0}/5
                </span>
              </div>
              <div className="flex gap-2">
                {[0, 1, 2, 3, 4, 5].map((level) => (
                  <button
                    key={level}
                    onClick={() => updateConcept(concept.key, level)}
                    className={`flex-1 h-10 rounded-lg border-2 transition-all ${
                      (userProfile.technicalConcepts?.[concept.key as keyof typeof userProfile.technicalConcepts] || 0) >= level
                        ? 'border-blue-500 bg-blue-500/20'
                        : 'border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <span className="text-xs text-gray-400">{level}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trading Strategy */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">{t.hasTradingStrategy}</label>
        <div className="grid grid-cols-3 gap-3">
          {(['yes', 'no', 'learning'] as const).map((strategy) => (
            <button
              key={strategy}
              onClick={() => updateProfile({ hasTradingStrategy: strategy })}
              className={`p-4 rounded-lg border-2 transition-all ${
                userProfile.hasTradingStrategy === strategy
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <span className="text-white">
                {strategy === 'yes' && t.strategyYes}
                {strategy === 'no' && t.strategyNo}
                {strategy === 'learning' && t.strategyLearning}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Step 5: Personalization
function Step5Personalization() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const { userProfile, updateProfile } = useOnboarding();

  const toggleAlert = (alert: 'strongOpportunities' | 'volatility' | 'myAnalysisOnly' | 'none') => {
    const current = userProfile.alertTypes || [];
    const updated = current.includes(alert)
      ? current.filter((a) => a !== alert)
      : [...current, alert];
    updateProfile({ alertTypes: updated });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-white mb-4">{t.personalizationSection}</h3>

      {/* Alert Types */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">{t.alertTypes}</label>
        <div className="grid grid-cols-2 gap-3">
          {(['strongOpportunities', 'volatility', 'myAnalysisOnly', 'none'] as const).map((alert) => (
            <button
              key={alert}
              onClick={() => toggleAlert(alert)}
              className={`p-4 rounded-lg border-2 transition-all ${
                userProfile.alertTypes?.includes(alert)
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <span className="text-white">
                {alert === 'strongOpportunities' && t.alertStrongOpportunities}
                {alert === 'volatility' && t.alertVolatility}
                {alert === 'myAnalysisOnly' && t.alertMyAnalysisOnly}
                {alert === 'none' && t.alertNone}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Preferred Experience */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">{t.preferredExperience}</label>
        <div className="grid grid-cols-3 gap-3">
          {(['simple', 'complete', 'balanced'] as const).map((exp) => (
            <button
              key={exp}
              onClick={() => updateProfile({ preferredExperience: exp })}
              className={`p-4 rounded-lg border-2 transition-all ${
                userProfile.preferredExperience === exp
                  ? 'border-blue-500 bg-blue-500/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              <span className="text-white">
                {exp === 'simple' && t.experienceSimple}
                {exp === 'complete' && t.experienceComplete}
                {exp === 'balanced' && t.experienceBalanced}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Educational Tips */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">{t.receiveEducationalTips}</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => updateProfile({ receiveEducationalTips: true })}
            className={`p-4 rounded-lg border-2 transition-all ${
              userProfile.receiveEducationalTips === true
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <span className="text-white">{t.yes}</span>
          </button>
          <button
            onClick={() => updateProfile({ receiveEducationalTips: false })}
            className={`p-4 rounded-lg border-2 transition-all ${
              userProfile.receiveEducationalTips === false
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <span className="text-white">{t.no}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
