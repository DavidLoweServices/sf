'use client';

import React from "react";
import { ConnectAccountOnboarding } from "@stripe/react-connect-js";
import { ConnectComponentsProvider } from "@stripe/react-connect-js";
import { loadConnectAndInitialize, StripeConnectInstance } from "@stripe/connect-js/pure";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useSelectedVenue } from "@/lib/hooks/useSelectedVenue";

// Simple dashboard card component
function DashboardCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}

export default function ConnectPage() {
  const [connectInstance, setConnectInstance] = React.useState<StripeConnectInstance | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const { selectedVenue } = useSelectedVenue();

  React.useEffect(() => {
    if (!selectedVenue) return;
    
    async function initializeStripeConnect() {
      try {
        setLoading(true);
        
        const fetchClientSecret = async () => {
          try {
            // Pass the venue ID as a query parameter
            const response = await fetch(`/api/stripeconnect?venueId=${selectedVenue?.venueid || ''}`);
            
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || "Failed to fetch client secret");
            }
            
            const data = await response.json();
            return data.clientSecret;
          } catch (err) {
            console.error("Error fetching client secret:", err);
            throw err;
          }
        };
        
        // Initialize Stripe Connect with the fetchClientSecret function
        const instance = await loadConnectAndInitialize({
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
          fetchClientSecret,
          appearance: {
            variables: {
              colorPrimary: "#3b82f6",
              fontFamily: "Inter, system-ui, sans-serif",
              borderRadius: "0.5rem",
            },
          },
        });
        
        setConnectInstance(instance);
      } catch (err: any) {
        console.error("Error initializing Stripe Connect:", err);
        setError(err instanceof Error ? err.message : "Failed to initialize Stripe Connect");
      } finally {
        setLoading(false);
      }
    }

    initializeStripeConnect();
  }, [selectedVenue]);

  return (
    <DashboardLayout>
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-5 text-gray-900">
          Stripe Connect {selectedVenue ? `- ${selectedVenue.name}` : ''}
        </h1>
        
        {loading ? (
          <div className="flex items-center justify-center h-[calc(100vh-200px)]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <DashboardCard className="p-6">
            <div className="text-red-500">Error: {error}</div>
          </DashboardCard>
        ) : (
          <DashboardCard className="p-6">
            <p className="text-gray-600 mb-8">
              Complete your Stripe onboarding to start processing payments for {selectedVenue?.name || 'your venue'}
            </p>
            
            {connectInstance ? (
              <ConnectComponentsProvider connectInstance={connectInstance}>
                <ConnectAccountOnboarding 
                  onExit={() => {
                    console.log("The account has exited onboarding");
                  }}
                  onStepChange={(step) => {
                    console.log("Onboarding step changed to:", step.step);
                  }}
                />
              </ConnectComponentsProvider>
            ) : (
              <div className="text-gray-500">Unable to load Stripe Connect interface</div>
            )}
          </DashboardCard>
        )}
      </div>
    </DashboardLayout>
  );
} 