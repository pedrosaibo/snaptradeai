'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '@/lib/onboarding-types';

interface OnboardingContextType {
  userProfile: Partial<UserProfile>;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeOnboarding: () => void;
  isOnboardingComplete: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<Partial<UserProfile>>({});
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...updates }));
  };

  const completeOnboarding = () => {
    // Generate personalized profile based on answers
    const profile = generatePersonalizedProfile(userProfile);
    setUserProfile(prev => ({ ...prev, generatedProfile: profile }));
    setIsOnboardingComplete(true);
  };

  return (
    <OnboardingContext.Provider value={{ userProfile, updateProfile, completeOnboarding, isOnboardingComplete }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider');
  }
  return context;
}

function generatePersonalizedProfile(profile: Partial<UserProfile>) {
  // Determine analysis depth based on knowledge level
  let analysisDepth: 'basic' | 'intermediate' | 'advanced' = 'basic';
  if (profile.knowledgeLevel === 'advanced' || profile.knowledgeLevel === 'professional') {
    analysisDepth = 'advanced';
  } else if (profile.knowledgeLevel === 'intermediate') {
    analysisDepth = 'intermediate';
  }

  // Determine notification style based on preferences
  let notificationStyle: 'minimal' | 'moderate' | 'detailed' = 'moderate';
  if (profile.preferredExperience === 'simple') {
    notificationStyle = 'minimal';
  } else if (profile.preferredExperience === 'complete') {
    notificationStyle = 'detailed';
  }

  // Suggest markets based on favorites
  const suggestedMarkets = profile.favoriteMarkets || [];

  // Determine detail level
  let detailLevel: 'summary' | 'detailed' | 'comprehensive' = 'summary';
  if (profile.analysisDetail === 'detailed') {
    detailLevel = 'detailed';
  } else if (profile.analysisDetail === 'both') {
    detailLevel = 'comprehensive';
  }

  return {
    analysisDepth,
    notificationStyle,
    suggestedMarkets,
    detailLevel,
  };
}
