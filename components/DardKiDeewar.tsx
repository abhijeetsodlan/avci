"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { DardEntry } from "@/types/dard";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { ProtectedSection } from "./ProtectedSection";

const fetchEntries = async () => {
  const response = await fetch("/api/dard", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to load entries");
  }
  const data = (await response.json()) as DardEntry[];
  return data;
};

export const DardKiDeewar = () => {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [entries, setEntries] = useState<DardEntry[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const loadEntries = () => {
    fetchEntries()
      .then(setEntries)
      .catch(() => setStatusMessage("Failed to load the wall of dard."));
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!message.trim()) {
      setStatusMessage("Please write at least one heartfelt sentence.");
      return;
    }

    setIsSaving(true);
    setStatusMessage(null);

    try {
      await fetch("/api/dard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message.trim().slice(0, 200),
          anonymous,
          userName: session?.user?.name ?? "Citizen",
        }),
      });
      setMessage("");
      loadEntries();
      setStatusMessage("Emotional FIR submitted successfully.");
    } catch {
      setStatusMessage("Failed to submit emotional FIR. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <ProtectedSection title="Dard Ki Deewar – Submit Your Emotional FIR" id="dard-deewar">
      {!session ? (
        <div className="space-y-4 text-sm">
          <p>Login with Google to submit your emotional FIR.</p>
          <GoogleLoginButton />
        </div>
      ) : (
        <div className="space-y-5">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block text-sm font-semibold text-[#0a0a0a]">
              Share your feelings (max 200 characters)
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={200}
                className="mt-2 w-full rounded border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-black focus:border-[#FF9933] focus:outline-none"
                rows={4}
                placeholder="The streets were not built for this level of affection..."
              />
            </label>
            <label className="flex items-center gap-3 text-sm font-semibold text-[#1f1f1f]">
              <input
                type="checkbox"
                checked={anonymous}
                onChange={(event) => setAnonymous(event.target.checked)}
                className="h-5 w-5 rounded border border-[#E5E7EB] accent-[#FF9933]"
              />
              Post Anonymously
            </label>
            <button
              type="submit"
              disabled={isSaving}
              className="w-full rounded border border-[#FF9933] bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-[#FF9933] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSaving ? "Submitting..." : "Submit Emotional FIR"}
            </button>
          </form>
          <GoogleLoginButton />
          {statusMessage && (
            <p className="rounded border border-[#E5E7EB] bg-[#fff7ed] px-4 py-2 text-xs text-[#b45309]">
              {statusMessage}
            </p>
          )}
          <div className="divide-y divide-[#E5E7EB]">
            {entries.map((entry) => (
              <article key={entry.id} className="py-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-gray-500">
                  <span>{entry.anonymous ? "Anonymous Citizen" : entry.userName}</span>
                  <span>{new Date(entry.createdAt).toLocaleString()}</span>
                </div>
                <p className="mt-3 text-sm text-[#1f1f1f]">{entry.message}</p>
              </article>
            ))}
            {entries.length === 0 && (
              <p className="py-4 text-sm text-gray-500">No emotional FIRs in the queue.</p>
            )}
          </div>
        </div>
      )}
    </ProtectedSection>
  );
};
