import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

const WAITLIST_FILE = path.join(process.cwd(), "data", "waitlist.json");

export interface WaitlistEntry {
  email: string;
  token: string;
  verified: boolean;
  joinedAt: string;
}

async function ensureFile() {
  const dir = path.dirname(WAITLIST_FILE);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
  try {
    await fs.access(WAITLIST_FILE);
  } catch {
    await fs.writeFile(WAITLIST_FILE, "[]", "utf-8");
  }
}

export async function readWaitlist(): Promise<WaitlistEntry[]> {
  await ensureFile();
  const data = await fs.readFile(WAITLIST_FILE, "utf-8");
  return JSON.parse(data);
}

export async function writeWaitlist(entries: WaitlistEntry[]) {
  await ensureFile();
  await fs.writeFile(
    WAITLIST_FILE,
    JSON.stringify(entries, null, 2),
    "utf-8"
  );
}

export function generateToken(): string {
  return randomUUID();
}