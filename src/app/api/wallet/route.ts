import { NextResponse } from "next/server";
import { getWallet } from "@/lib/mock";

export const dynamic = "force-dynamic";

export const GET = async () => {
  return NextResponse.json(getWallet());
};
