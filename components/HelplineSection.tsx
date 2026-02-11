"use client";

import { useState } from "react";

const alerts = [
  {
    label: "I saw a couple holding hands",
    message: "Kindly close your eyes and count to five. Exposure minimized.",
  },
  {
    label: "My ex posted with someone new",
    message: "You have unlocked Premium Character Development.",
  },
  {
    label: "I almost texted my ex",
    message: "Message blocked by AVCI Emotional Firewall.",
  },
];

export const HelplineSection = () => {
  const [alert, setAlert] = useState<string | null>(null);

  return (
    <section
      id="helpline"
      className="rounded border border-[#E5E7EB] bg-white shadow-sm"
    >
      <div className="bg-[#FF9933] px-5 py-3 text-xs font-semibold uppercase tracking-[0.5em] text-white">
        Emotional Support Helpline
      </div>
      <div className="px-5 py-6 space-y-5">
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-500">
          Toll Free: 1800-SINGLE
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          {alerts.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => setAlert(item.message)}
              className="rounded border border-[#FF9933] px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-[#FF9933] hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </div>
        {alert && (
          <div className="rounded border border-[#FF9933] bg-[#fff7ed] px-4 py-3 text-sm text-[#b45309]">
            {alert}
          </div>
        )}
      </div>
    </section>
  );
};
