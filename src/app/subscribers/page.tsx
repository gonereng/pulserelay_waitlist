"use client";

import { useState } from "react";

interface Subscriber {
  email: string;
  token: string;
  verified: boolean;
  joinedAt: string;
  confirmedAt: string | null;
  consentText: string;
}

export default function SubscribersPage() {
  const [password, setPassword] = useState("");
  const [subscribers, setSubscribers] = useState<Subscriber[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setSubscribers(null);
        setError("Invalid password.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setSubscribers(data.subscribers);
    } catch {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (subscribers) {
    const verifiedCount = subscribers.filter((s) => s.verified).length;

    return (
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-on-surface">
              Subscribers
            </h1>
            <p className="text-sm text-on-surface-variant mt-1">
              {verifiedCount} verified / {subscribers.length} total
            </p>
          </div>
          <button
            onClick={() => {
              setSubscribers(null);
              setPassword("");
            }}
            className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Lock
          </button>
        </div>
        <div className="overflow-x-auto border border-outline-variant rounded-lg">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface-container-low text-on-surface-variant uppercase text-xs tracking-wider">
              <tr>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Confirmed</th>
                <th className="px-4 py-3">Consent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {subscribers.map((s) => (
                <tr key={s.token} className="hover:bg-surface-container-low">
                  <td className="px-4 py-3 font-mono text-sm">{s.email}</td>
                  <td className="px-4 py-3">
                    {s.verified ? (
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        Verified
                      </span>
                    ) : (
                      <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">
                    {new Date(s.joinedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant">
                    {s.confirmedAt
                      ? new Date(s.confirmedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </td>
                  <td className="px-4 py-3 text-on-surface-variant text-xs max-w-[200px] truncate">
                    {s.consentText || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-sm mx-auto px-6 py-24">
      <div className="bg-surface-container-lowest border border-outline-variant p-8">
        <h1 className="text-xl font-bold text-on-surface mb-2">
          Subscribers
        </h1>
        <p className="text-sm text-on-surface-variant mb-6">
          Enter the password to view the waitlist.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-surface-container border border-outline-variant text-on-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary mb-4"
            autoFocus
          />
          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-primary text-on-primary font-medium text-sm px-4 py-2 hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            {loading ? "Loading..." : "Unlock"}
          </button>
        </form>
      </div>
    </section>
  );
}