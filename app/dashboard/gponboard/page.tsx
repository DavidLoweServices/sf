'use client';

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OnboardingWizard from "@/components/gp/onboarding/OnboardingWizard";

export default function GPOnboardPage() {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">GP Onboarding</h1>
        <p className="text-gray-600 mb-8">
          Complete the form below to onboard a new merchant to the Global Payments platform.
          All information is securely transmitted and stored according to our data protection policies.
        </p>
        
        <OnboardingWizard />
      </div>
    </DashboardLayout>
  );
} 