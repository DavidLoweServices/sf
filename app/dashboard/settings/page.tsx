import { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import VenueSettingsDebug from "@/components/dashboard/VenueSettingsDebug";

export const metadata: Metadata = {
  title: "Settings | Dashboard",
  description: "Manage your account and venue settings",
};

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-5 text-gray-900">Settings</h1>
        
        <div className="grid gap-5">
          {/* Account Settings Card */}
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-medium mb-3 text-gray-800">Account Settings</h2>
            <p className="text-sm text-gray-600">
              Your account settings will be available here. Currently in development.
            </p>
          </div>
          
          {/* Venue Settings Debug */}
          <VenueSettingsDebug />
        </div>
      </div>
    </DashboardLayout>
  );
} 