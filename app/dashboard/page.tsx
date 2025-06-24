'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useSelectedVenue } from "@/lib/hooks/useSelectedVenue";
import { ChartSpline, Clock, TrendingUp } from "lucide-react";
import StripeNotificationBanner from "@/components/stripe/StripeNotificationBanner";
import { authFetch } from "@/lib/utils/authFetch";

interface FinancialData {
  balancePending: {
    amount: number;
    currency: string;
    amountFormatted: string;
  };
  grossVolume: {
    amount: number;
    currency: string;
    amountFormatted: string;
    startDate: string;
    endDate: string;
  };
  previousGrossVolume: {
    amount: number;
    currency: string;
    amountFormatted: string;
    startDate: string;
    endDate: string;
  };
}

interface ApiResponse {
  messages: string[];
  succeeded: boolean;
  data: FinancialData;
  auth: boolean;
  ru: number;
}

// Skeleton component for loading state
const StatCardSkeleton = ({ color, title }: { color: string; title: string }) => (
  <div className={`relative bg-${color}-500 rounded-lg p-6 text-white overflow-hidden`}>
    <div className="relative z-10">
      <h2 className="text-base font-semibold mb-2 text-${color}-100">{title}</h2>
      <div className="h-8 bg-white/30 rounded mb-2 w-32 animate-pulse"></div>
      <div className="h-4 bg-white/20 rounded w-40 animate-pulse"></div>
    </div>
  </div>
);

export default function Dashboard() {
  const { selectedVenue } = useSelectedVenue();
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFinancialData = async () => {
      if (!selectedVenue?.venueid) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        
        const response = await authFetch(`https://${process.env.NEXT_PUBLIC_WANNABOOK_API_URL}/financeStripeBalance/${selectedVenue.venueid}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch financial data: ${response.statusText}`);
        }
        
        const data: ApiResponse = await response.json();
        
        if (!data.succeeded) {
          throw new Error(data.messages.join(', ') || 'Failed to fetch financial data');
        }
        
        setFinancialData(data.data);
      } catch (err) {
        console.error('Error fetching financial data:', err);
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFinancialData();
  }, [selectedVenue?.venueid]);

  // Calculate percentage change
  const calculatePercentageChange = (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const formatDateRange = (startDate: string, endDate: string): string => {
    return `${startDate} - ${endDate}`;
  };

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-5">
          <h1 className="text-2xl font-semibold mb-5 text-gray-900">
            Dashboard {selectedVenue ? `- ${selectedVenue.name}` : ''}
          </h1>
          
          <StripeNotificationBanner />
          
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <StatCardSkeleton color="blue" title="Gross Volume" />
            <StatCardSkeleton color="purple" title="Previous Gross Volume" />
            <StatCardSkeleton color="green" title="Pending Balance" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-5 text-gray-900">
          Dashboard {selectedVenue ? `- ${selectedVenue.name}` : ''}
        </h1>
        
        <StripeNotificationBanner />
        
        {error && (
          <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">Error loading financial data: {error}</p>
          </div>
        )}
        
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Gross Volume Card */}
          <div className="relative bg-blue-500 rounded-lg p-6 text-white overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-base font-semibold mb-2 text-blue-100">Gross Volume</h2>
              <p className="text-3xl font-bold mb-2">
                {financialData?.grossVolume.amountFormatted || '£0.00'}
              </p>
              {financialData?.grossVolume && (
                <p className="text-sm text-blue-100 mt-1">
                  {formatDateRange(financialData.grossVolume.startDate, financialData.grossVolume.endDate)}
                </p>
              )}
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
              <TrendingUp className="stroke-[2]" size={100} />
            </div>
          </div>

          {/* Previous Gross Volume Card */}
          <div className="relative bg-purple-500 rounded-lg p-6 text-white overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-base font-semibold mb-2 text-purple-100">Previous Gross Volume</h2>
              <p className="text-3xl font-bold mb-2">
                {financialData?.previousGrossVolume.amountFormatted || '£0.00'}
              </p>
              {financialData?.previousGrossVolume && (
                <p className="text-sm text-purple-100 mt-1">
                  {formatDateRange(financialData.previousGrossVolume.startDate, financialData.previousGrossVolume.endDate)}
                </p>
              )}
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
              <ChartSpline className="stroke-[2]" size={100} />
            </div>
          </div>

          {/* Balance Pending Card */}
          <div className="relative bg-green-500 rounded-lg p-6 text-white overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-base font-semibold mb-2 text-green-100">Pending Balance</h2>
              <p className="text-3xl font-bold mb-2">
                {financialData?.balancePending.amountFormatted || '£0.00'}
              </p>
              <p className="text-sm text-green-100 flex items-center">
                <span className="flex items-center"></span>
              </p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
              <Clock className="stroke-[2]" size={100} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 