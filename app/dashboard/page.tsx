import { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export const metadata: Metadata = {
  title: "Wannabook | Dashboard",
  description: "Your dashboard overview",
};

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-5 text-gray-900">Dashboard</h1>
        
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Dashboard cards */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-base font-medium mb-3 text-gray-800">Analytics</h2>
            <p className="text-sm text-gray-600">
              Your analytics data will appear here.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-base font-medium mb-3 text-gray-800">Recent Activity</h2>
            <p className="text-sm text-gray-600">
              Your recent activity will appear here.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-base font-medium mb-3 text-gray-800">Tasks</h2>
            <p className="text-sm text-gray-600">
              Your tasks will appear here.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 