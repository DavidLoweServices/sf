import { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StripePaymentsComponent from './StripePaymentsComponent';

export const metadata: Metadata = {
  title: "Wannabook | Payouts",
  description: "Manage your payouts and payment settings",
};

export default function PayoutsPage() {
  return (
    <DashboardLayout>
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-5 text-gray-900">Payouts</h1>
        
        <div className="grid gap-5">
          {/* Stripe Payments Component */}
          <StripePaymentsComponent />
        </div>
      </div>
    </DashboardLayout>
  );
} 