"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export const GoogleLoginButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center justify-between rounded border border-[#FF9933] px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-black">
        <span>{session.user?.name}</span>
        <button
          type="button"
          onClick={() => signOut()}
          className="text-[10px] tracking-[0.4em]"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => signIn("google")}
      className="w-full rounded border border-[#FF9933] bg-white px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-[#FF9933] hover:text-white"
    >
      Login with Google
    </button>
  );
};
