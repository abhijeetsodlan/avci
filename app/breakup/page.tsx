import Link from "next/link";

export default function BreakupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12 text-center">
      <div className="w-full max-w-2xl space-y-6 rounded border border-[#E5E7EB] bg-white px-6 py-10 text-black shadow-sm">
        <h1 className="text-3xl font-bold uppercase tracking-[0.3em] text-black">
          Emergency Breakup Portal
        </h1>
        <p className="text-lg font-semibold text-[#333]">She left you, loser?</p>
        <p className="text-sm uppercase tracking-[0.4em] text-gray-500">
          You have been officially transferred to Peaceful Mode.
        </p>
        <Link
          href="/#certificate"
          className="rounded border border-[#FF9933] px-6 py-3 text-sm font-semibold uppercase tracking-[0.4em] text-black transition hover:bg-[#FF9933] hover:text-white"
        >
          Generate My Single Certificate
        </Link>
      </div>
    </div>
  );
}
