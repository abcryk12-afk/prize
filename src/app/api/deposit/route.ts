import { NextResponse } from "next/server";
import { deposit } from "@/lib/mock";

export const dynamic = "force-dynamic";

export const POST = async (req: Request) => {
  try {
    const body = (await req.json()) as { method?: string; amountPKR?: number };
    const method = body.method;
    const amountPKR = body.amountPKR;

    if (method !== "easypaisa" && method !== "jazzcash") {
      return NextResponse.json({ error: "Invalid method" }, { status: 400 });
    }

    const result = deposit(method, Number(amountPKR));
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Request failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
};
