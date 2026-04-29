import { NextResponse } from "next/server";
import { readWaitlist, writeWaitlist } from "@/lib/waitlist";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        new URL("/?verified=missing-token", request.url)
      );
    }

    const waitlist = await readWaitlist();
    const entry = waitlist.find((e) => e.token === token);

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

    entry.verified = true;
    await writeWaitlist(waitlist);

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