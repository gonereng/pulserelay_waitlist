import { NextResponse } from "next/server";
import { prisma, generateToken } from "@/lib/waitlist";
import { sendConfirmationEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, consentText } = body;

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

    const existing = await prisma.waitlistEntry.findUnique({
      where: { email },
    });

    if (existing) {
      if (existing.verified) {
        return NextResponse.json(
          { error: "This email is already on the waiting list." },
          { status: 409 }
        );
      }

      const token = generateToken();
      await prisma.waitlistEntry.update({
        where: { email },
        data: { token, joinedAt: new Date(), consentText: consentText || existing.consentText },
      });
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
    await prisma.waitlistEntry.create({
      data: {
        email,
        token,
        verified: false,
        consentText: consentText || "",
      },
    });
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
    const total = await prisma.waitlistEntry.count();
    const verified = await prisma.waitlistEntry.count({
      where: { verified: true },
    });
    return NextResponse.json({ count: verified, total });
  } catch {
    return NextResponse.json(
      { error: "Failed to read waitlist." },
      { status: 500 }
    );
  }
}