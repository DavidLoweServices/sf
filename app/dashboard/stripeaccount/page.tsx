'use client';

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useSelectedVenue } from "@/lib/hooks/useSelectedVenue";
import ConnectAccountManagement from '../../../components/stripe/ConnectAccountManagement';

export default function StripeAccountPage() {
  const { selectedVenue } = useSelectedVenue();

  return (
    <DashboardLayout>
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-5 text-gray-900">
          Stripe Account {selectedVenue ? `- ${selectedVenue.name}` : ''}
        </h1>
        
        <div className="grid gap-5">
          <ConnectAccountManagement />
        </div>
      </div>
    </DashboardLayout>
  );
} 