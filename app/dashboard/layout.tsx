import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s",
    default: "Dashboard",
  },
  description: "Dashboard for your application",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 