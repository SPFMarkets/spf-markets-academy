import { useEffect, useState } from "react";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { ArrowLeft, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { curriculum } from "@/data/curriculum";

type Stat = { lesson_id: string; completions: number; avg_score: number };

export const Route = createFileRoute("/dashboard")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Lesson Completion Dashboard — SPF Markets Academy" },
      {
        name: "description",
        content:
          "See how many students complete each lesson quiz, with average scores per lesson across the SPF Markets forex curriculum.",
      },
      { property: "og:title", content: "Lesson Completion Dashboard — SPF Markets Academy" },
      {
        property: "og:description",
        content:
          "Quiz completion counts and average scores for every lesson in the SPF Markets forex curriculum.",
      },
    ],
  }),
  beforeLoad: async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) throw redirect({ to: "/auth" });
  },
  component: Dashboard,
});

function Dashboard() {
  const [stats, setStats] = useState<Stat[] | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      const { user } = await supabase.auth.getUser();
      const uid = user?.id;
      if (!uid) return;
      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", uid);
      if (rolesError) {
        setError(rolesError.message);
        setIsAdmin(false);
        return;
      }
      const admin = (roles ?? []).some((r) => r.role === "admin");
      setIsAdmin(admin);
      if (!admin) return;
      const { data, error: statsError } = await supabase.rpc("lesson_stats");
      if (statsError) setError(statsError.message);
      else setStats((data ?? []) as Stat[]);
    })();
  }, []);

  const statFor = (lessonId: string): Stat | undefined =>
    stats?.find((s) => s.lesson_id === lessonId);
  const max = Math.max(1, ...(stats ?? []).map((s) => s.completions));
  const totalCompletions = (stats ?? []).reduce((n, s) => n + s.completions, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-12 sm:px-10 lg:py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-gold"
        >
          <ArrowLeft className="size-3.5" />
          Back to lessons
        </Link>

        <h1 className="mt-7 font-display text-3xl font-semibold text-foreground">
          Lesson completion dashboard
        </h1>
        <p className="mt-3 max-w-[56ch] text-[15px] leading-relaxed text-muted-foreground">
          How many students finish each lesson quiz, and how they score — so you can see which
          lessons convert.
        </p>

        {isAdmin === null ? (
          <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Loading…
          </p>
        ) : !isAdmin ? (
          <div className="mt-10 flex items-start gap-4 rounded-2xl border border-border bg-surface p-6">
            <Lock className="mt-0.5 size-5 shrink-0 text-gold" />
            <div>
              <p className="text-[15px] font-medium text-foreground">Owner access only</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">
                This dashboard shows quiz completions across all students and is only visible to
                the academy owner account.
              </p>
            </div>
          </div>
        ) : error ? (
          <p className="mt-10 rounded-xl bg-destructive/10 px-4 py-3 text-[14px] text-foreground">
            {error}
          </p>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-surface px-4 py-3.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Quiz completions
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-gold">
                  {totalCompletions}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-surface px-4 py-3.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Lessons
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-foreground">
                  {curriculum.reduce((n, m) => n + m.lessons.length, 0)}
                </p>
              </div>
              <div className="col-span-2 rounded-xl border border-border bg-surface px-4 py-3.5 sm:col-span-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Modules
                </p>
                <p className="mt-1 font-display text-2xl font-semibold text-foreground">
                  {curriculum.length}
                </p>
              </div>
            </div>

            {stats !== null && stats.length === 0 && (
              <p className="mt-8 rounded-xl border border-border bg-surface px-4 py-3 text-[14px] text-muted-foreground">
                No quiz completions yet — counts appear here as students finish lessons.
              </p>
            )}

            <div className="mt-8 space-y-8">
              {curriculum.map((module) => (
                <section key={module.id}>
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">
                    {module.title}
                  </h2>
                  <div className="mt-3 space-y-2.5">
                    {module.lessons.map((lesson) => {
                      const stat = statFor(lesson.id);
                      const completions = stat?.completions ?? 0;
                      const avg = stat?.avg_score ?? 0;
                      return (
                        <div
                          key={lesson.id}
                          className="rounded-xl border border-border bg-surface px-4 py-3.5"
                        >
                          <div className="flex items-baseline justify-between gap-3">
                            <p className="min-w-0 truncate text-[14px] font-medium text-foreground">
                              {lesson.title}
                            </p>
                            <p className="shrink-0 font-mono text-[12px] text-muted-foreground">
                              <span className="text-gold">{completions}</span> complete
                              <span className="mx-1.5 text-border">·</span>
                              {avg}% avg
                            </p>
                          </div>
                          <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-accent">
                            <div
                              className="h-full rounded-full bg-gold transition-[width] duration-500"
                              style={{ width: `${(completions / max) * 100}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
