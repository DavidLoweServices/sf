'use client';

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useSelectedVenue } from "@/lib/hooks/useSelectedVenue";
import StripeDisputeManagementComponent from '../../../components/stripe/StripeDisputeManagementComponent';

export default function DisputeManagementPage() {
  const { selectedVenue } = useSelectedVenue();

  return (
    <DashboardLayout>
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-5 text-gray-900">
          Dispute Management {selectedVenue ? `- ${selectedVenue.name}` : ''}
        </h1>
        
        <div className="grid gap-5">
          <StripeDisputeManagementComponent />
        </div>
      </div>
    </DashboardLayout>
  );
} 