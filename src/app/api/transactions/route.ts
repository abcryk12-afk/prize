import { NextResponse } from "next/server";
import { getTransactions } from "@/lib/mock";

export const dynamic = "force-dynamic";

export const GET = async () => {
  return NextResponse.json({ transactions: getTransactions() });
};
