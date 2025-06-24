import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wannabook | Account Management",
  description: "Manage your Stripe Connect account settings",
};

export default function AccountManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 