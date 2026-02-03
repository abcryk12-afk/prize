import { HomeClient } from "@/components/HomeClient";
import { getCompetitions } from "@/lib/mock";

export const dynamic = "force-dynamic";

export default function Home() {
  const competitions = getCompetitions();
  return <HomeClient initialCompetitions={competitions} />;
}
