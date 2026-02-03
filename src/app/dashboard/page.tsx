import { DashboardClient } from "@/components/DashboardClient";
import { getCompetitions, getTickets, getTransactions, getWallet } from "@/lib/mock";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <DashboardClient
      initial={{
        wallet: getWallet(),
        competitions: getCompetitions(),
        tickets: getTickets(),
        transactions: getTransactions(),
      }}
    />
  );
}
