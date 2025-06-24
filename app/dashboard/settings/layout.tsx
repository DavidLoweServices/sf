import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wannabook | Settings",
  description: "Manage your account and venue settings",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 