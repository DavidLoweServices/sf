'use client';

import { PoundSterling, Calendar, Ticket, Users } from "lucide-react";
import StripeBanner from "@/components/stripe/StripeBanner";

export default function DashboardCards() {
  return (
    <div>
      {/* Stripe Banner at the top */}
      <div className="mb-5">
        <StripeBanner />
      </div>
      
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue Card */}
        <div className="relative bg-blue-500 rounded-lg p-6 text-white overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-sm font-medium mb-2 text-blue-100">Total Revenue</h2>
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
            <h2 className="text-sm font-medium mb-2 text-purple-100">Total Events</h2>
            <p className="text-3xl font-bold mb-2">3</p>
            <p className="text-sm text-purple-100 flex items-center">
              <span className="flex items-center">↑ +5% from last month</span>
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
            <Calendar className="stroke-[2]" size={100} />
          </div>
        </div>

        {/* Tickets Sold Card */}
        <div className="relative bg-green-500 rounded-lg p-6 text-white overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-sm font-medium mb-2 text-green-100">Tickets Sold</h2>
            <p className="text-3xl font-bold mb-2">199</p>
            <p className="text-sm text-green-100 flex items-center">
              <span className="flex items-center">↑ +8% from last month</span>
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
            <Ticket className="stroke-[2]" size={100} />
          </div>
        </div>

        {/* Total Capacity Card */}
        <div className="relative bg-orange-500 rounded-lg p-6 text-white overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-sm font-medium mb-2 text-orange-100">Total Capacity</h2>
            <p className="text-3xl font-bold mb-2">470</p>
            <p className="text-sm text-orange-100 flex items-center">
              <span className="flex items-center">↑ +2.5% from last month</span>
            </p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-4 translate-y-4">
            <Users className="stroke-[2]" size={100} />
          </div>
        </div>
      </div>
    </div>
  );
} 