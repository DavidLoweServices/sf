import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wannabook | Stripe Connect",
  description: "Manage your Stripe Connect account and settings",
};

export default function ConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 