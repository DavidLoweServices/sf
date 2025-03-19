'use client';

import { PoundSterling, Calendar, Ticket, Users } from "lucide-react";
import StripeBanner from "@/components/stripe/StripeBanner";
import { useEffect, useState } from "react";
import { useSelectedVenue } from "@/lib/hooks/useSelectedVenue";

interface StripeCapabilities {
  payoutsEnabled: boolean;
  paymentsEnabled: boolean;
}

export default function DashboardCards() {
  const { selectedVenue } = useSelectedVenue();
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  // Handle mounting
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const fetchCapabilities = async () => {
      if (!selectedVenue || !hasMounted) {
        return;
      }

      let savedCapabilities;
      try {
        const stored = sessionStorage.getItem(`stripeCapabilities_${selectedVenue.venueid}`);
        if (stored) {
          savedCapabilities = JSON.parse(stored);
          setIsOnboarded(savedCapabilities.payoutsEnabled && savedCapabilities.paymentsEnabled);
        }
      } catch (e) {
        console.error('Error accessing session storage:', e);
      }

      try {
        const response = await fetch(`/api/stripeconnect?venueId=${selectedVenue.venueid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch capabilities');
        }
        
        const data = await response.json();
        if (data.capabilities) {
          setIsOnboarded(data.capabilities.payoutsEnabled && data.capabilities.paymentsEnabled);
          try {
            sessionStorage.setItem(`stripeCapabilities_${selectedVenue.venueid}`, JSON.stringify(data.capabilities));
          } catch (e) {
            console.error('Error saving to session storage:', e);
          }
        }
      } catch (error) {
        console.error('Error fetching Stripe capabilities:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCapabilities();
  }, [selectedVenue, hasMounted]);

  if (!hasMounted || isLoading) {
    return (
      <div>
        {/* Stripe Banner skeleton */}
        <div className="mb-5">
          <div className="bg-white rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
        
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Revenue Card Skeleton */}
          <div className="relative bg-blue-500 rounded-lg p-6 text-white overflow-hidden">
            <div className="relative z-10">
              <div className="h-4 bg-blue-400 rounded w-24 mb-2"></div>
              <div className="h-8 bg-blue-400 rounded w-32 mb-2"></div>
              <div className="h-4 bg-blue-400 rounded w-40"></div>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
              <PoundSterling className="stroke-[2]" size={100} />
            </div>
          </div>

          {/* Events Card Skeleton */}
          <div className="relative bg-purple-500 rounded-lg p-6 text-white overflow-hidden">
            <div className="relative z-10">
              <div className="h-4 bg-purple-400 rounded w-24 mb-2"></div>
              <div className="h-8 bg-purple-400 rounded w-16 mb-2"></div>
              <div className="h-4 bg-purple-400 rounded w-40"></div>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
              <Calendar className="stroke-[2]" size={100} />
            </div>
          </div>

          {/* Tickets Card Skeleton */}
          <div className="relative bg-green-500 rounded-lg p-6 text-white overflow-hidden">
            <div className="relative z-10">
              <div className="h-4 bg-green-400 rounded w-24 mb-2"></div>
              <div className="h-8 bg-green-400 rounded w-16 mb-2"></div>
              <div className="h-4 bg-green-400 rounded w-40"></div>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
              <Ticket className="stroke-[2]" size={100} />
            </div>
          </div>

          {/* Capacity Card Skeleton */}
          <div className="relative bg-orange-500 rounded-lg p-6 text-white overflow-hidden">
            <div className="relative z-10">
              <div className="h-4 bg-orange-400 rounded w-24 mb-2"></div>
              <div className="h-8 bg-orange-400 rounded w-16 mb-2"></div>
              <div className="h-4 bg-orange-400 rounded w-40"></div>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
              <Users className="stroke-[2]" size={100} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isOnboarded) {
    return (
      <div className="bg-white rounded-lg p-6 text-center">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Complete Stripe Onboarding</h2>
        <p className="text-gray-600">
          Please complete the Stripe onboarding process to view your dashboard metrics.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Stripe Banner at the top */}
      <div className="mb-5">
        <StripeBanner />
      </div>
      
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue Card */}
        <div className="relative bg-blue-500 rounded-lg p-6 text-white overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-sm font-medium mb-2 text-blue-100">Lorem Ipsum</h2>
            <p className="text-3xl font-bold mb-2">??.??</p>
            <p className="text-sm text-blue-100 flex items-center">
              <span className="flex items-center">↑ +? from last month</span>
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
            <PoundSterling className="stroke-[2]" size={100} />
          </div>
        </div>

        {/* Total Events Card */}
        <div className="relative bg-purple-500 rounded-lg p-6 text-white overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-sm font-medium mb-2 text-purple-100">Lorem Ipsum</h2>
            <p className="text-3xl font-bold mb-2">??</p>
            <p className="text-sm text-purple-100 flex items-center">
              <span className="flex items-center">↑ +?% from last month</span>
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
            <Calendar className="stroke-[2]" size={100} />
          </div>
        </div>

        {/* Tickets Sold Card */}
        <div className="relative bg-green-500 rounded-lg p-6 text-white overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-sm font-medium mb-2 text-green-100">Lorem Ipsum</h2>
            <p className="text-3xl font-bold mb-2">??</p>
            <p className="text-sm text-green-100 flex items-center">
              <span className="flex items-center">↑ +?% from last month</span>
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
            <Ticket className="stroke-[2]" size={100} />
          </div>
        </div>

        {/* Total Capacity Card */}
        <div className="relative bg-orange-500 rounded-lg p-6 text-white overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-sm font-medium mb-2 text-orange-100">Lorem Ipsum</h2>
            <p className="text-3xl font-bold mb-2">??</p>
            <p className="text-sm text-orange-100 flex items-center">
              <span className="flex items-center">↑ +?% from last month</span>
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
            <Users className="stroke-[2]" size={100} />
          </div>
        </div>
      </div>
    </div>
  );
} 