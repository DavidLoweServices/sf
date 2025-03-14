'use client';

import { useState } from 'react';
import StepIndicator from './StepIndicator';
import BusinessInformationStep from './steps/BusinessInformationStep';
import AddressesStep from './steps/AddressesStep';
import PaymentProcessingStep from './steps/PaymentProcessingStep';
import PersonsStep from './steps/PersonsStep';
import ReviewStep from './steps/ReviewStep';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { OnboardingData } from './types';

const STEPS = [
  'Business Information',
  'Addresses',
  'Payment Processing',
  'Persons',
  'Review'
];

const defaultData: OnboardingData = {
  businessInfo: {
    name: '',
    type: 'MERCHANT',
    legal_name: '',
    dba: '',
    merchant_category_code: '',
    website: '',
    description: '',
    registration_number: '',
    ip_address: '',
    notification_email: '',
    legal_entity: 'LIMITED_COMPANY',
    reference: '',
    language: 'en'
  },
  addresses: [{
    functions: ['BUSINESS'],
    line_1: '',
    city: '',
    postal_code: '',
    country: 'GB'
  }],
  payment_processing_statistics: {
    total_monthly_sales_amount: '',
    average_ticket_sales_amount: '',
    highest_ticket_sales_amount: ''
  },
  pricing_profile: 'test',
  payment_methods: [{
    functions: ['PRIMARY_PAYOUT'],
    name: 'PRIMARY PAYOUT',
    reference: '',
    bank_transfer: {
      account_holder_type: 'PERSONAL',
      account_type: 'CHECKING',
      account_number: '',
      bank: {
        code: '',
        address: {
          line_1: '',
          city: '',
          postal_code: '',
          country: 'GB'
        }
      }
    }
  }],
  persons: [{
    functions: ['APPLICANT', 'BENEFICIAL_OWNER'],
    first_name: '',
    last_name: '',
    email: '',
    date_of_birth: '',
    birth_country: 'GB',
    citizenship_country: 'GB',
    addresses: [{
      functions: ['PERSONAL'],
      line_1: '',
      city: '',
      postal_code: '',
      country: 'GB'
    }]
  }],
  attestations: [{
    name: 'propay_sub_merchant_terms_and_conditions_uk',
    ip_address: '',
    time_of_attestation: new Date().toISOString()
  }],
  notifications: {
    status_url: 'https://www.example.com/notifications/status'
  }
};

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>(defaultData);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleStepComplete = (stepData: Partial<OnboardingData>) => {
    if (isUpdating) return;
    
    setIsUpdating(true);
    setOnboardingData(prev => {
      const newData = {
        ...prev,
        ...stepData
      };
      
      setTimeout(() => {
        setIsUpdating(false);
      }, 0);
      
      return newData;
    });
  };

  const validateCurrentStep = (): boolean => {
    // This would contain validation logic for each step
    // For now, we'll just return true as a placeholder
    return true;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
        setValidationErrors([]);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Here you would send the data to your API
      console.log('Submitting data:', JSON.stringify(onboardingData, null, 2));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      alert('Merchant onboarding data submitted successfully!');
    } catch (error) {
      console.error('Error submitting onboarding data:', error);
      setValidationErrors(['Failed to submit onboarding data. Please try again.']);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BusinessInformationStep 
          data={onboardingData} 
          onComplete={handleStepComplete} 
        />;
      case 1:
        return <AddressesStep 
          data={onboardingData} 
          onComplete={handleStepComplete} 
        />;
      case 2:
        return <PaymentProcessingStep 
          data={onboardingData} 
          onComplete={handleStepComplete} 
        />;
      case 3:
        return <PersonsStep 
          data={onboardingData} 
          onComplete={handleStepComplete} 
        />;
      case 4:
        return <ReviewStep 
          data={onboardingData} 
          onComplete={handleStepComplete} 
        />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <StepIndicator 
        steps={STEPS} 
        currentStep={currentStep} 
        onStepClick={setCurrentStep}
        allowNavigation={true}
      />
      
      {validationErrors.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <h3 className="text-sm font-medium text-red-800">Please correct the following errors:</h3>
          <ul className="mt-2 text-sm text-red-700 list-disc pl-5">
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mb-8">
        {renderStep()}
      </div>
      
      <div className="flex justify-between">
        <Button
          onClick={handleBack}
          disabled={currentStep === 0}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Button>
        
        {currentStep < STEPS.length - 1 ? (
          <Button 
            onClick={handleNext}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            disabled={submitting}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
          >
            {submitting ? 'Submitting...' : 'Submit'}
            <Check className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
} 