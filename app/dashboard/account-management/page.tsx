'use client';

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useSelectedVenue } from "@/lib/hooks/useSelectedVenue";
import StripeAccountManagementComponent from '../../../components/stripe/StripeAccountManagementComponent';

export default function AccountManagementPage() {
  const { selectedVenue } = useSelectedVenue();

  return (
    <DashboardLayout>
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-5 text-gray-900">
          Account Management {selectedVenue ? `- ${selectedVenue.name}` : ''}
        </h1>
        
        <div className="grid gap-5">
          <StripeAccountManagementComponent />
        </div>
      </div>
    </DashboardLayout>
  );
} 