import { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your account settings",
};

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-5 text-gray-900">Settings</h1>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-base font-medium mb-3 text-gray-800">Account Settings</h2>
          <p className="text-sm text-gray-600">
            Manage your account settings and preferences here.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
} 