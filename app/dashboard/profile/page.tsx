import { Metadata } from "next";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export const metadata: Metadata = {
  title: "Profile",
  description: "View and edit your profile",
};

export default function ProfilePage() {
  return (
    <DashboardLayout>
      <div className="p-5">
        <h1 className="text-2xl font-semibold mb-5 text-gray-900">Profile</h1>
        <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-base font-medium mb-3 text-gray-800">Your Profile</h2>
          <p className="text-sm text-gray-600">
            View and edit your profile information here.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
} 