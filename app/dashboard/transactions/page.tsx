import { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StripeTransactionsComponent from './StripeTransactionsComponent';

export const metadata: Metadata = {
  title: "Wannabook | Transactions",
  description: "View and manage your transactions",
};

export default function TransactionsPage() {
  return (
    <DashboardLayout>
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-5 text-gray-900">Transactions</h1>
        
        <div className="grid gap-5">
          {/* Stripe Transactions Component */}
          <StripeTransactionsComponent />
        </div>
      </div>
    </DashboardLayout>
  );
} 