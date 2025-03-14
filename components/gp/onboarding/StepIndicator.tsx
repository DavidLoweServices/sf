'use client';

import { cn } from "@/lib/utils";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  allowNavigation?: boolean;
}

export default function StepIndicator({ 
  steps, 
  currentStep, 
  onStepClick,
  allowNavigation = false
}: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gray-200" />
        
        {/* Steps */}
        {steps.map((step, index) => (
          <div key={index} className="relative flex flex-col items-center">
            <button
              onClick={() => allowNavigation && onStepClick && onStepClick(index)}
              disabled={!allowNavigation}
              className={cn(
                "w-8 h-8 flex items-center justify-center rounded-full z-10 transition-all",
                index < currentStep 
                  ? "bg-blue-500 text-white" 
                  : index === currentStep 
                    ? "bg-blue-500 text-white" 
                    : "bg-white text-gray-400 border-2 border-gray-200",
                allowNavigation && index < currentStep && "cursor-pointer hover:bg-blue-600"
              )}
            >
              {index < currentStep ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <span>{index + 1}</span>
              )}
            </button>
            <span 
              className={cn(
                "mt-2 text-xs font-medium",
                index <= currentStep ? "text-blue-500" : "text-gray-400"
              )}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
} 