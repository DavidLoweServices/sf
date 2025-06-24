import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wannabook | Dispute Management",
  description: "Manage and respond to payment disputes",
};

export default function DisputeManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 