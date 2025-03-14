'use client';

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useSelectedVenue } from "@/lib/hooks/useSelectedVenue";
import DashboardCards from "@/components/stripe/dashboardcards";

export default function Dashboard() {
  const { selectedVenue } = useSelectedVenue();

  return (
    <DashboardLayout>
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-5 text-gray-900">
          Dashboard {selectedVenue ? `- ${selectedVenue.name}` : ''}
        </h1>
        
        <DashboardCards />
      </div>
    </DashboardLayout>
  );
} 