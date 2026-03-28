export default function AthleteProfilePage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Athlete Profile</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-100">Jordan Mitchell</h2>
        <p className="mt-2 text-sm text-slate-300">Women&apos;s Lacrosse, Midfielder</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
          <p className="text-xs uppercase tracking-[0.1em] text-slate-400">Preferred support</p>
          <p className="mt-2 text-sm text-slate-200">Brief one-on-one check-ins before practice.</p>
        </article>
        <article className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
          <p className="text-xs uppercase tracking-[0.1em] text-slate-400">Current focus</p>
          <p className="mt-2 text-sm text-slate-200">Recovery rhythm, sleep consistency, and hydration.</p>
        </article>
      </div>
    </section>
  );
}
