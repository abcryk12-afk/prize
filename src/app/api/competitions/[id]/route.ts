import { NextResponse } from "next/server";
import { getCompetition } from "@/lib/mock";

export const dynamic = "force-dynamic";

export const GET = async (_req: Request, ctx: { params: Promise<{ id: string }> }) => {
  const { id } = await ctx.params;
  const competition = getCompetition(id);
  if (!competition) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ competition });
};
