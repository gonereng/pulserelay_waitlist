import { NextResponse } from "next/server";
import { prisma } from "@/lib/waitlist";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const validPassword = process.env.SUBSCRIBERS_PASSWORD;
    if (!validPassword || password !== validPassword) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const subscribers = await prisma.waitlistEntry.findMany({
      orderBy: { joinedAt: "asc" },
    });
    return NextResponse.json({ subscribers });
  } catch {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}