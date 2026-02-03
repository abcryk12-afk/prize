import { WinnersClient } from "@/components/WinnersClient";
import { getWinners } from "@/lib/mock";

export const dynamic = "force-dynamic";

export default function WinnersPage() {
  return <WinnersClient initial={getWinners()} />;
}
