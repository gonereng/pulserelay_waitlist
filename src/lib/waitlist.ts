import { prisma } from "./prisma";
import { randomUUID } from "crypto";

export { prisma };

export interface WaitlistEntry {
  email: string;
  token: string;
  verified: boolean;
  joinedAt: Date;
  confirmedAt: Date | null;
  consentText: string;
}

export function generateToken(): string {
  return randomUUID();
}