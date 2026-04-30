import { NextResponse } from "next/server";
import { prisma } from "@/lib/waitlist";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/?verified=missing-token", request.url)
      );
    }

    const entry = await prisma.waitlistEntry.findUnique({
      where: { token },
    });

    if (!entry) {
      return NextResponse.redirect(
        new URL("/?verified=invalid", request.url)
      );
    }

    if (entry.verified) {
      return NextResponse.redirect(
        new URL("/?verified=already", request.url)
      );
    }

    await prisma.waitlistEntry.update({
      where: { token },
      data: { verified: true, confirmedAt: new Date() },
    });

    return NextResponse.redirect(
      new URL("/?verified=success", request.url)
    );
  } catch (err) {
    console.error("Verify GET error:", err);
    return NextResponse.redirect(
      new URL("/?verified=error", request.url)
    );
  }
}