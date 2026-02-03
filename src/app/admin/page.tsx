import { AdminClient } from "@/components/AdminClient";
import { getCompetitions, getWinners } from "@/lib/mock";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return <AdminClient initial={{ competitions: getCompetitions(), winners: getWinners() }} />;
}
