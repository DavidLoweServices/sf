'use client';

import React, { useState, useEffect } from 'react';
import { loadConnectAndInitialize } from "@stripe/connect-js/pure";
import {
ConnectNotificationBanner,
ConnectComponentsProvider,
} from "@stripe/react-connect-js";
import { useSelectedVenue } from '@/hooks/useSelectedVenue';

type ConnectJsInstance = Awaited<ReturnType<typeof loadConnectAndInitialize>>;


export default function StripeBanner() {
  const [stripeConnect, setStripeConnect] = useState<ConnectJsInstance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { selectedVenue } = useSelectedVenue();

  useEffect(() => {
    if (!selectedVenue) return;

    const initializeStripeConnect = async () => {
      try {
        const instance = await loadConnectAndInitialize({
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
          fetchClientSecret: async () => {
            // Pass the venue ID as a query parameter
            const response = await fetch(`/api/stripeconnect?venueId=${selectedVenue?.venueid || ''}`);
            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || "Failed to get Connect token");
            }
            const { clientSecret } = await response.json();
            return clientSecret;
          },
          appearance: {
            variables: {
              colorPrimary: "#3b82f6",
              colorBackground: "#fff",
              fontFamily: "Inter, system-ui, sans-serif",
              fontSizeBase: "16px",
              borderRadius: "0.5rem",
            }
          },
          // Stripe instance options
          ...(process.env.NODE_ENV === 'development' ? { betas: ['connect_enable_features_beta_1'] } : {})
        });
        setStripeConnect(instance);
      } catch (err) {
        console.error("Error initializing Stripe Connect:", err);
        setError("Failed to load Stripe notification banner. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    initializeStripeConnect();
  }, [selectedVenue]);

  if (!selectedVenue) {
    return (
      <div className="text-center text-gray-600 py-2">
        Please select a venue to view notifications
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-2">{error}</div>;
  }

  if (loading) {
    return <div className="text-center text-gray-600 py-2">Loading notifications...</div>;
  }

  if (!stripeConnect) {
    return null;
  }

  return (
    <ConnectComponentsProvider connectInstance={stripeConnect}>
      <ConnectNotificationBanner
        collectionOptions={{
          fields: 'eventually_due',
          futureRequirements: 'include',
        }}
      />
    </ConnectComponentsProvider>
  );
} 