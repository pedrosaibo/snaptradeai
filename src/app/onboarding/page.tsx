'use client';

import { useState } from 'react';
import { OnboardingWizard } from '@/components/custom/OnboardingWizard';
import { useRouter } from 'next/navigation';

export default function OnboardingPage() {
  const router = useRouter();

  const handleComplete = () => {
    // Redirect to dashboard after completing onboarding
    router.push('/dashboard');
  };

  return <OnboardingWizard onComplete={handleComplete} />;
}
