"use client";

import { useActionState } from "react";
import { loginAction } from "./actions";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/";

  const [state, action, pending] = useActionState(loginAction, undefined);

  return (
    <form action={action} className="flex flex-col gap-5">
      <input type="hidden" name="from" value={from} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="username" className="text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          placeholder="Enter your username"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Enter your password"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
        />
      </div>

      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-gradient-to-r from-[#2E3192] to-[#00AEEF] hover:opacity-90 disabled:opacity-60 text-white font-semibold py-3 rounded-full transition-opacity text-base mt-1"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/XenRealitylogo.png"
            alt="XenReality"
            width={160}
            height={46}
            className="h-10 w-auto"
            priority
          />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">
          Welcome back
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Sign in to access the XenReality portal
        </p>

        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
