import { notFound } from "next/navigation";
import { getCompetition, getCompetitions } from "@/lib/mock";
import { CompetitionDetailClient } from "@/components/CompetitionDetailClient";

export const dynamic = "force-dynamic";

export const generateStaticParams = async () => {
  return getCompetitions().map((c) => ({ id: c.id }));
};

export default async function CompetitionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const competition = getCompetition(id);

  if (!competition) {
    notFound();
  }

  return <CompetitionDetailClient competition={competition} />;
}
