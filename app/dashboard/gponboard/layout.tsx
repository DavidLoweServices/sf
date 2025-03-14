import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wannabook | GP Onboarding",
  description: "Onboard and manage your GP settings",
};

export default function GPOnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 