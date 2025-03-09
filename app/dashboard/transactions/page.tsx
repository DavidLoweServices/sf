'use client';

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useSelectedVenue } from "@/lib/hooks/useSelectedVenue";
import StripeTransactionsComponent from '../../../components/stripe/StripeTransactionsComponent';

export default function TransactionsPage() {
  const { selectedVenue } = useSelectedVenue();

  return (
    <DashboardLayout>
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-5 text-gray-900">
          Transactions {selectedVenue ? `- ${selectedVenue.name}` : ''}
        </h1>
        
        <div className="grid gap-5">
          <StripeTransactionsComponent />
        </div>
      </div>
    </DashboardLayout>
  );
} 