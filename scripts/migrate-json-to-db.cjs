require("dotenv").config();
const { Pool } = require("pg");

async function migrate() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  const fs = require("fs");
  const path = require("path");
  const data = fs.readFileSync(
    path.join(__dirname, "..", "data", "waitlist.json"),
    "utf-8"
  );
  const entries = JSON.parse(data);

  for (const entry of entries) {
    await pool.query(
      `INSERT INTO "WaitlistEntry" (email, token, verified, "joinedAt", "confirmedAt", "consentText")
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (email) DO NOTHING`,
      [
        entry.email,
        entry.token,
        entry.verified,
        entry.joinedAt,
        entry.verified ? entry.joinedAt : null,
        "",
      ]
    );
  }

  console.log(`Migrated ${entries.length} entries.`);
  await pool.end();
}

migrate().catch((e) => {
  console.error(e);
  process.exit(1);
});