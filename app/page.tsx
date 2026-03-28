export default function Home() {
  const athleteFeatures = [
    {
      title: "Daily pre-practice check-in",
      description:
        "Athletes complete a required 30-second check-in before training starts.",
    },
    {
      title: "3-5 question pulse survey",
      description:
        "Fast prompts capture emotional, mental, and physical readiness without disrupting routines.",
    },
    {
      title: "Mood slider + optional note",
      description:
        "A simple emoji scale and optional context like low energy, stressed, or feeling good.",
    },
    {
      title: "Wellness signal checkboxes",
      description:
        "Quick toggles for sleep, soreness, stress, and confidence to improve daily context.",
    },
  ];

  const coachFeatures = [
    {
      title: "Team mood dashboard",
      description: "Get a real-time read on group morale before every practice.",
    },
    {
      title: "Daily individual status",
      description:
        "See readiness indicators that support better conversations and coaching decisions.",
    },
    {
      title: "Low-mood pattern alerts",
      description:
        "Surface repeated yellow/red patterns early so support can happen before breakdowns.",
    },
    {
      title: "Weekly trend line",
      description:
        "Track momentum over days and weeks to inform workload and practice plans.",
    },
  ];

  const surveyQuestions = [
    "How are you feeling today?",
    "How mentally ready do you feel for practice?",
    "How physically ready do you feel?",
    "How stressed are you today?",
    "Anything your coaches should be aware of?",
  ];

  return (
    <div className="relative overflow-x-clip bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(34,197,94,0.24),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.25),transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_45%,#020617_100%)]" />

      <main className="relative mx-auto flex w-full max-w-6xl flex-col px-6 pb-20 pt-8 sm:px-10 md:px-14 lg:px-16">
        <header className="animate-reveal flex items-center justify-between gap-6">
          <a
            href="#top"
            className="font-[family-name:var(--font-athflo-display)] text-3xl uppercase tracking-[0.16em] text-cyan-300"
          >
            Athflo
          </a>
          <a
            href="#waitlist"
            className="rounded-full border border-cyan-300/70 bg-cyan-300/10 px-5 py-2 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:bg-cyan-300/20"
          >
            Join Waitlist
          </a>
        </header>

        <section
          id="top"
          className="animate-reveal mt-14 grid items-end gap-10 md:mt-20 md:grid-cols-[1.1fr_0.9fr]"
          style={{ animationDelay: "120ms" }}
        >
          <div className="space-y-7">
            <p className="inline-flex rounded-full border border-emerald-300/40 bg-emerald-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200">
              MoodCheck For Athletes
            </p>
            <h1 className="font-[family-name:var(--font-athflo-display)] text-5xl uppercase leading-[0.95] tracking-[0.02em] text-white sm:text-6xl lg:text-7xl">
              30 Seconds To
              <span className="block text-cyan-300">Train Smarter</span>
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-200/90 sm:text-xl">
              Athflo gives college teams a daily pre-practice wellness pulse so
              coaches can reduce unnecessary pressure, support athletes sooner,
              and make mental health part of performance culture.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#waitlist"
                className="inline-flex h-12 items-center justify-center rounded-full bg-cyan-300 px-8 text-sm font-bold uppercase tracking-[0.1em] text-slate-950 transition hover:bg-cyan-200"
              >
                Join Waitlist
              </a>
              <a
                href="#how-it-works"
                className="inline-flex h-12 items-center justify-center rounded-full border border-slate-300/40 bg-slate-900/60 px-8 text-sm font-semibold uppercase tracking-[0.08em] text-slate-100 transition hover:border-cyan-200/70 hover:bg-slate-800"
              >
                See How It Works
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-cyan-300/30 bg-slate-900/70 p-6 shadow-[0_30px_100px_rgba(6,182,212,0.18)] backdrop-blur-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200">
              Practice Readiness Snapshot
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-2xl border border-emerald-300/40 bg-emerald-300/10 px-3 py-4">
                <p className="text-2xl font-bold text-emerald-200">74%</p>
                <p className="mt-1 text-xs uppercase tracking-[0.08em] text-emerald-100/80">
                  Green
                </p>
              </div>
              <div className="rounded-2xl border border-amber-300/40 bg-amber-300/10 px-3 py-4">
                <p className="text-2xl font-bold text-amber-200">18%</p>
                <p className="mt-1 text-xs uppercase tracking-[0.08em] text-amber-100/80">
                  Yellow
                </p>
              </div>
              <div className="rounded-2xl border border-rose-300/40 bg-rose-300/10 px-3 py-4">
                <p className="text-2xl font-bold text-rose-200">8%</p>
                <p className="mt-1 text-xs uppercase tracking-[0.08em] text-rose-100/80">
                  Red
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-sm text-slate-200">
              <p className="rounded-xl border border-slate-700/70 bg-slate-950/70 px-4 py-2">
                Team mood average: <strong className="text-cyan-200">7.6/10</strong>
              </p>
              <p className="rounded-xl border border-slate-700/70 bg-slate-950/70 px-4 py-2">
                Repeated low-mood alerts: <strong className="text-amber-200">3</strong>
              </p>
              <p className="rounded-xl border border-slate-700/70 bg-slate-950/70 px-4 py-2">
                Weekly trend: <strong className="text-emerald-200">Improving +12%</strong>
              </p>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="animate-reveal mt-20 grid gap-6 md:mt-24 md:grid-cols-3"
          style={{ animationDelay: "220ms" }}
        >
          {[
            ["Athlete checks in", "Complete a quick 4-question survey before training."],
            ["Coach sees readiness", "Get team and individual indicators before practice starts."],
            ["Support gets activated", "Escalate concerns to wellbeing leads when policy requires."],
          ].map(([title, desc]) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-700/70 bg-slate-900/70 p-6"
            >
              <h2 className="font-[family-name:var(--font-athflo-display)] text-2xl uppercase tracking-[0.04em] text-cyan-200">
                {title}
              </h2>
              <p className="mt-3 leading-7 text-slate-200/90">{desc}</p>
            </article>
          ))}
        </section>

        <section className="mt-20 md:mt-24">
          <h2 className="font-[family-name:var(--font-athflo-display)] animate-reveal text-4xl uppercase tracking-[0.04em] text-white sm:text-5xl">
            Built For Athletes And Coaches
          </h2>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <article
              className="animate-reveal rounded-3xl border border-emerald-300/30 bg-emerald-300/10 p-7"
              style={{ animationDelay: "80ms" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-100">
                For Athletes
              </p>
              <div className="mt-4 space-y-4">
                {athleteFeatures.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-emerald-200/20 bg-slate-950/40 p-4"
                  >
                    <h3 className="text-lg font-semibold text-emerald-100">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-200/85">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article
              className="animate-reveal rounded-3xl border border-cyan-300/30 bg-cyan-300/10 p-7"
              style={{ animationDelay: "150ms" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
                For Coaches
              </p>
              <div className="mt-4 space-y-4">
                {coachFeatures.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-cyan-200/20 bg-slate-950/40 p-4"
                  >
                    <h3 className="text-lg font-semibold text-cyan-100">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-200/85">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="mt-20 grid gap-6 lg:mt-24 lg:grid-cols-[1.05fr_0.95fr]">
          <article className="animate-reveal rounded-3xl border border-slate-700/70 bg-slate-900/75 p-7">
            <h2 className="font-[family-name:var(--font-athflo-display)] text-4xl uppercase tracking-[0.04em] text-white sm:text-5xl">
              Example Daily Survey
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-200/90">
              Keep check-ins short. Athletes can complete this in under 30
              seconds before practice.
            </p>
            <ol className="mt-6 space-y-3">
              {surveyQuestions.map((question, index) => (
                <li
                  key={question}
                  className="flex items-start gap-3 rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3"
                >
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-300/20 text-sm font-bold text-cyan-100">
                    {index + 1}
                  </span>
                  <p className="leading-6 text-slate-100/95">{question}</p>
                </li>
              ))}
            </ol>
          </article>

          <article
            className="animate-reveal rounded-3xl border border-amber-300/35 bg-amber-300/10 p-7"
            style={{ animationDelay: "110ms" }}
          >
            <h2 className="font-[family-name:var(--font-athflo-display)] text-4xl uppercase tracking-[0.04em] text-amber-100 sm:text-5xl">
              Trust Is The Product
            </h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-100/90">
              <li className="rounded-xl border border-amber-200/25 bg-slate-950/45 px-4 py-3">
                Coaches see team mood trends and individual readiness status.
              </li>
              <li className="rounded-xl border border-amber-200/25 bg-slate-950/45 px-4 py-3">
                Personal written details are private unless athletes choose to
                share.
              </li>
              <li className="rounded-xl border border-amber-200/25 bg-slate-950/45 px-4 py-3">
                Serious risk flags route to designated wellbeing professionals
                based on campus policy.
              </li>
            </ul>
            <p className="mt-5 text-sm leading-6 text-amber-100/90">
              This keeps MoodCheck supportive, not invasive, so athletes can be
              honest and coaching responses can be more thoughtful.
            </p>
          </article>
        </section>

        <section className="mt-20 rounded-3xl border border-sky-300/40 bg-sky-300/10 p-8 md:mt-24 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-100">
                MVP Ready
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-athflo-display)] text-4xl uppercase tracking-[0.04em] text-white sm:text-5xl">
                A First Prototype That Delivers Real Value
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-100/90">
                Start with athlete login, a 4-question daily check-in, and a
                coach dashboard with green/yellow/red indicators, team averages,
                individual daily status, and a weekly trend line.
              </p>
            </div>
            <a
              id="waitlist"
              href="#"
              className="inline-flex h-13 items-center justify-center rounded-full bg-sky-300 px-9 text-sm font-bold uppercase tracking-[0.1em] text-slate-950 transition hover:bg-sky-200"
            >
              Join Waitlist
            </a>
          </div>
        </section>

        <footer className="mt-12 border-t border-slate-700/70 pt-6 text-sm text-slate-300/85">
          <p>
            Athflo MoodCheck helps programs improve athlete wellbeing,
            communication, burnout prevention, and healthier performance
            cultures.
          </p>
        </footer>
      </main>
    </div>
  );
}
