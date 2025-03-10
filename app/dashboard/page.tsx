'use client';

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { useSelectedVenue } from "@/lib/hooks/useSelectedVenue";
import { PoundSterling, ChartSpline, ShieldQuestion } from "lucide-react";

export default function Dashboard() {
  const { selectedVenue } = useSelectedVenue();

  return (
    <DashboardLayout>
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-5 text-gray-900">
          Dashboard {selectedVenue ? `- ${selectedVenue.name}` : ''}
        </h1>
        
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Revenue Card */}
          <div className="relative bg-blue-500 rounded-lg p-6 text-white overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-sm font-medium mb-2 text-blue-100">Total Income</h2>
              <p className="text-3xl font-bold mb-2">£3836.47</p>
              <p className="text-sm text-blue-100 flex items-center">
                <span className="flex items-center">↑ 12% from last month</span>
              </p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
              <PoundSterling className="stroke-[2]" size={100} />
            </div>
          </div>

          {/* Total Events Card */}
          <div className="relative bg-purple-500 rounded-lg p-6 text-white overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-sm font-medium mb-2 text-purple-100">Total Transactions</h2>
              <p className="text-3xl font-bold mb-2">38</p>
              <p className="text-sm text-purple-100 flex items-center">
                <span className="flex items-center">↑ +5% from last month</span>
              </p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
              <ChartSpline className="stroke-[2]" size={100} />
            </div>
          </div>

          {/* Tickets Sold Card */}
          <div className="relative bg-green-500 rounded-lg p-6 text-white overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-sm font-medium mb-2 text-green-100">Item</h2>
              <p className="text-3xl font-bold mb-2">??</p>
              <p className="text-sm text-green-100 flex items-center">
                <span className="flex items-center">↑ +??% from last month</span>
              </p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
              <ShieldQuestion className="stroke-[2]" size={100} />
            </div>
          </div>

          {/* Total Capacity Card */}
          <div className="relative bg-orange-500 rounded-lg p-6 text-white overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-sm font-medium mb-2 text-orange-100">Item</h2>
              <p className="text-3xl font-bold mb-2">??</p>
              <p className="text-sm text-orange-100 flex items-center">
                <span className="flex items-center">↑ +??% from last month</span>
              </p>
            </div>
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
              <ShieldQuestion className="stroke-[2]" size={100} />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 