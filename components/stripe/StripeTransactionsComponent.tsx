'use client';

import { useState, useEffect } from "react";
import { loadConnectAndInitialize } from "@stripe/connect-js/pure";
import {
  ConnectPayments,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js";
import { useSelectedVenue } from "@/lib/hooks/useSelectedVenue";

type ConnectJsInstance = Awaited<ReturnType<typeof loadConnectAndInitialize>>;

const StripeTransactionsComponent = () => {
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
              fontFamily: "Inter, system-ui, sans-serif",
              fontSizeBase: "16px",
              borderRadius: "0.5rem",
            }
          },
        });
        setStripeConnect(instance);
      } catch (err) {
        console.error("Error initializing Stripe Connect:", err);
        setError("Failed to load transactions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    initializeStripeConnect();
  }, [selectedVenue]);

  if (!selectedVenue) {
    return (
      <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium mb-3 text-gray-800">Stripe Transactions</h2>
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center text-gray-600 py-4">Please select a venue to view transactions</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-medium mb-3 text-gray-800">Stripe Transactions</h2>
      <div className="min-h-[400px]">
        {error ? (
          <div className="text-center text-red-500 py-4">{error}</div>
        ) : loading ? (
          <div className="text-center text-gray-600 py-4">Loading transactions...</div>
        ) : stripeConnect ? (
          <ConnectComponentsProvider connectInstance={stripeConnect}>
            <ConnectPayments />
          </ConnectComponentsProvider>
        ) : null}
      </div>
    </div>
  );
};

export default StripeTransactionsComponent; 