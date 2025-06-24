import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wannabook | Payouts",
  description: "Manage your payouts and payment settings",
};

export default function PayoutsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 