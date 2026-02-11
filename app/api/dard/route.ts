import { randomUUID } from "crypto";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { DardEntry } from "@/types/dard";

let entries: DardEntry[] = [];

export async function GET() {
  const sorted = [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json(sorted, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const now = new Date();
    const entry: DardEntry = {
      id: randomUUID(),
      message: String(payload.message).slice(0, 200),
      userName: payload.userName ?? "Citizen",
      anonymous: Boolean(payload.anonymous),
      createdAt: now.toISOString(),
    };
    entries = [entry, ...entries];
    return NextResponse.json(entry, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Unable to store emotional FIR." },
      { status: 500 }
    );
  }
}
