import { NextResponse } from "next/server";
import { readWaitlist, writeWaitlist } from "@/lib/waitlist";
import { sendConfirmationEmail } from "@/lib/mailer";
import { generateToken } from "@/lib/waitlist";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const waitlist = await readWaitlist();

    const existing = waitlist.find((entry) => entry.email === email);
    if (existing) {
      if (existing.verified) {
        return NextResponse.json(
          { error: "This email is already on the waiting list." },
          { status: 409 }
        );
      }
      const token = generateToken();
      existing.token = token;
      existing.joinedAt = new Date().toISOString();
      await writeWaitlist(waitlist);
      await sendConfirmationEmail(email, token);
      return NextResponse.json(
        {
          message:
            "We've sent a new confirmation email. Please check your inbox.",
        },
        { status: 200 }
      );
    }

    const token = generateToken();
    waitlist.push({
      email,
      token,
      verified: false,
      joinedAt: new Date().toISOString(),
    });
    await writeWaitlist(waitlist);
    await sendConfirmationEmail(email, token);

    return NextResponse.json(
      {
        message:
          "Check your inbox! We've sent a confirmation email. Click the link to verify your spot on the waiting list.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Waitlist POST error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const waitlist = await readWaitlist();
    const verified = waitlist.filter((e) => e.verified);
    return NextResponse.json({
      count: verified.length,
      total: waitlist.length,
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to read waitlist." },
      { status: 500 }
    );
  }
}