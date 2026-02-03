import { NextResponse } from "next/server";
import { getCompetitions } from "@/lib/mock";

export const dynamic = "force-dynamic";

export const GET = async () => {
  return NextResponse.json({ competitions: getCompetitions() });
};
