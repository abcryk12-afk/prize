import { NextResponse } from "next/server";
import { getTickets } from "@/lib/mock";

export const dynamic = "force-dynamic";

export const GET = async () => {
  return NextResponse.json({ tickets: getTickets() });
};
