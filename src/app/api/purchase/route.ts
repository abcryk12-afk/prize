import { NextResponse } from "next/server";
import { buyTickets } from "@/lib/mock";

export const dynamic = "force-dynamic";

export const POST = async (req: Request) => {
  try {
    const body = (await req.json()) as { competitionId?: string; quantity?: number };
    const competitionId = body.competitionId;
    const quantity = Number(body.quantity);

    if (!competitionId) {
      return NextResponse.json({ error: "Missing competitionId" }, { status: 400 });
    }

    const result = buyTickets(competitionId, quantity);
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Request failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
};
