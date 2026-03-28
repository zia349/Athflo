"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { setStoredMockRole } from "@/lib/mockAuth";
import { AppRole } from "@/lib/roles";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const role: AppRole = email.toLowerCase().includes("coach") ? "coach" : "athlete";
    setStoredMockRole(role);
    router.push(role === "coach" ? "/coach" : "/athlete");
  };

  const continueAs = (role: AppRole) => {
    setStoredMockRole(role);
    router.push(role === "coach" ? "/coach" : "/athlete");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(14,165,233,0.2),transparent_36%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.18),transparent_38%)]" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-10 sm:px-10">
        <section className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <p className="font-[family-name:var(--font-athflo-display)] text-5xl uppercase tracking-[0.12em] text-cyan-200 sm:text-6xl">
              Athflo
            </p>
            <h1 className="max-w-xl text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Team wellbeing, in one calm and connected workspace.
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-300">
              Athletes can check in quickly before practice. Coaches can view trends and status context in a supportive,
              respectful dashboard.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.1em] text-slate-400">Athlete</p>
                <p className="mt-2 text-sm text-slate-200">Daily check-in, history, and profile insights.</p>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.1em] text-slate-400">Coach</p>
                <p className="mt-2 text-sm text-slate-200">Team trends, supportive alerts, and roster context.</p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-300/30 bg-slate-900/85 p-6 shadow-[0_30px_80px_rgba(8,145,178,0.22)] backdrop-blur-sm sm:p-8">
            <p className="text-xs uppercase tracking-[0.12em] text-cyan-200">Sign in</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-100">Welcome to your Athflo app</h2>

            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <label className="block space-y-2 text-sm text-slate-300">
                <span>Email</span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  required
                  placeholder="you@team.edu"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/80 focus:ring-2 focus:ring-cyan-300/25"
                />
              </label>

              <label className="block space-y-2 text-sm text-slate-300">
                <span>Password</span>
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/80 focus:ring-2 focus:ring-cyan-300/25"
                />
              </label>

              <button
                type="submit"
                className="mt-1 w-full rounded-xl bg-cyan-300 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
              >
                Sign in
              </button>
            </form>

            <div className="mt-6 space-y-3 border-t border-slate-800 pt-5">
              <button
                type="button"
                onClick={() => continueAs("athlete")}
                className="w-full rounded-xl border border-emerald-300/50 bg-emerald-300/10 px-4 py-3 text-sm font-medium text-emerald-100 transition hover:bg-emerald-300/15"
              >
                Continue as Athlete
              </button>
              <button
                type="button"
                onClick={() => continueAs("coach")}
                className="w-full rounded-xl border border-cyan-300/50 bg-cyan-300/10 px-4 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/15"
              >
                Continue as Coach
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
