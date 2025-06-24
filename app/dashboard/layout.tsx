import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wannabook | Dashboard",
  description: "Your dashboard overview",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 