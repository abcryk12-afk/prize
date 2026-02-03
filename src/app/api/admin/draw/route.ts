import { NextResponse } from "next/server";
import { adminDraw } from "@/lib/mock";

export const dynamic = "force-dynamic";

export const POST = async (req: Request) => {
  try {
    const body = (await req.json()) as { competitionId?: string };
    const competitionId = body.competitionId;

    if (!competitionId) {
      return NextResponse.json({ error: "Missing competitionId" }, { status: 400 });
    }

    const result = adminDraw(competitionId);
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Request failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
};
