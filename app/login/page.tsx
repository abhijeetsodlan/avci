import Link from "next/link";
import { GoogleLoginButton } from "@/components/GoogleLoginButton";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12 text-center">
      <div className="w-full max-w-md space-y-6 rounded border border-[#E5E7EB] bg-white px-6 py-10 text-black shadow-sm">
        <h1 className="text-2xl font-bold uppercase tracking-[0.3em]">Login Portal</h1>
        <p className="text-sm uppercase tracking-[0.4em] text-gray-500">
          Only Google login is permitted for emotional sincerity.
        </p>
        <GoogleLoginButton />
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-[0.4em] text-[#FF9933]"
        >
          Return to homepage
        </Link>
      </div>
    </div>
  );
}
