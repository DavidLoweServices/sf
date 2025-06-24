'use client';

import { useState, useEffect } from "react";
import { loadConnectAndInitialize } from "@stripe/connect-js/pure";
import {
  ConnectAccountManagement,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js";
import { useSelectedVenue } from "@/lib/hooks/useSelectedVenue";
import { authFetch } from "@/lib/utils/authFetch";

type ConnectJsInstance = Awaited<ReturnType<typeof loadConnectAndInitialize>>;

interface VenueSetting {
  name: string;
  value: string;
}

interface VenueSettingsResponse {
  succeeded: boolean;
  data: {
    id: string;
    venueid: string;
    venueSettings: VenueSetting[];
  };
}

const StripeAccountManagementComponent = () => {
  const { selectedVenue } = useSelectedVenue();
  const [stripeConnect, setStripeConnect] = useState<ConnectJsInstance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ryftSubAccountID, setRyftSubAccountID] = useState<string | null>(null);

  // Fetch venue settings to get ryftSubAccountID
  useEffect(() => {
    const fetchVenueSettings = async () => {
      if (!selectedVenue) return;
      
      try {
        const response = await authFetch(`https://dev-api.wannabook.online/venuesettings/${selectedVenue.venueid}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch venue settings: ${response.statusText}`);
        }
        
        const data: VenueSettingsResponse = await response.json();
        
        // Find RyftSubAccountID in venue settings
        if (data.succeeded && data.data && Array.isArray(data.data.venueSettings)) {
          const ryftSetting = data.data.venueSettings.find(
            setting => setting.name === 'RyftSubAccountID'
          );
          
          setRyftSubAccountID(ryftSetting?.value || null);
        }
      } catch (err) {
        console.error('Error fetching venue settings:', err);
        setError('Failed to load venue settings. Please try again later.');
      }
    };
    
    fetchVenueSettings();
  }, [selectedVenue]);

  useEffect(() => {
    const initializeStripeConnect = async () => {
      if (!ryftSubAccountID) {
        setLoading(false);
        return;
      }

      try {
        const instance = await loadConnectAndInitialize({
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
          fetchClientSecret: async () => {
            const response = await fetch(`/api/stripeconnect/${ryftSubAccountID}`);
            if (!response.ok) {
              throw new Error("Failed to get Connect token");
            }
            const { clientSecret } = await response.json();
            return clientSecret;
          },
          appearance: {
            variables: {
              colorPrimary: "#3b82f6",
              fontFamily: "Inter, system-ui, sans-serif",
              fontSizeBase: "16px",
              borderRadius: "0.5rem",
            }
          },
        });
        setStripeConnect(instance);
      } catch (err) {
        console.error("Error initializing Stripe Connect:", err);
        setError("Failed to load account management. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    initializeStripeConnect();
  }, [ryftSubAccountID]);

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-medium mb-3 text-gray-800">Account Management</h2>
      <div className="min-h-[400px]">
        {error ? (
          <div className="text-center text-red-500 py-4">{error}</div>
        ) : loading ? (
          <div className="text-center text-gray-600 py-4">Loading account management...</div>
        ) : !ryftSubAccountID ? (
          <div className="text-center text-gray-600 py-4">No Stripe account configured for this venue.</div>
        ) : stripeConnect ? (
          <ConnectComponentsProvider connectInstance={stripeConnect}>
            <ConnectAccountManagement />
          </ConnectComponentsProvider>
        ) : null}
      </div>
    </div>
  );
};

export default StripeAccountManagementComponent; 