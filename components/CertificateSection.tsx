"use client";

import { useMemo, useState } from "react";

export const CertificateSection = () => {
  const [name, setName] = useState("Valentine Survivor");
  const [yearsSingle, setYearsSingle] = useState("1");
  const formattedDate = useMemo(() => {
    return new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }, []);

  const handleGenerate = () => {
    setName((prev) => prev.trim() || "Valentine Survivor");
  };

  return (
    <section
      id="certificate"
      className="rounded border border-[#E5E7EB] bg-white shadow-sm"
    >
      <div className="bg-[#FF9933] px-5 py-3 text-xs font-semibold uppercase tracking-[0.5em] text-white">
        Certificate Dispatch
      </div>
      <div className="px-5 py-6 space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">
            Name
          </label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded border border-[#E5E7EB] px-3 py-2 text-sm text-black focus:border-[#FF9933] focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-500">
            Years Single
          </label>
          <input
            value={yearsSingle}
            onChange={(event) => setYearsSingle(event.target.value)}
            className="w-full rounded border border-[#E5E7EB] px-3 py-2 text-sm text-black focus:border-[#FF9933] focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleGenerate}
          className="w-full rounded border border-[#FF9933] bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-[#FF9933] hover:text-white"
        >
          Generate Certificate
        </button>
        <div className="rounded border-2 border-[#FF9933] px-5 py-6 text-center text-sm tracking-[0.2em]">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-500">Certificate of Resilience</p>
          <p className="mt-6 text-sm">This is to certify that</p>
          <p className="mt-2 text-2xl font-bold text-[#0a0a0a]">{name || "Valentine Survivor"}</p>
          <p className="mt-1 text-sm">Years Single: {yearsSingle || "1"}</p>
          <p className="mt-2 text-sm">has officially survived Valentine’s Week</p>
          <p className="text-sm">under the supervision of the</p>
          <p className="text-sm font-semibold">Anti-Valentine Commission of India.</p>
          <p className="mt-4 text-xs uppercase tracking-[0.4em] text-[#555]">Date: {formattedDate}</p>
          <div className="mt-6 flex items-center justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.4em]">
            <div className="rounded-full border border-[#FF9933] px-4 py-2 text-[#FF9933]">
              Digitally Approved – AVCI
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
