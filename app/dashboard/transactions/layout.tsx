import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wannabook | Transactions",
  description: "View and manage your transactions",
};

export default function TransactionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 