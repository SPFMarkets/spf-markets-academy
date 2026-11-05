import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  FileText,
  GraduationCap,
  Send,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import logo from "@/assets/spf-logo.png";
import heroChart from "@/assets/hero-chart.jpg";
import {
  curriculum,
  allLessons,
  TELEGRAM_CHANNEL_URL,
  DERIV_AFFILIATE_URL,
} from "@/data/curriculum";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SPF Markets — Forex Academy for Serious Traders" },
      {
        name: "description",
        content:
          "Go from your first pip to graduation with SPF Markets Academy: 50 structured lessons, worked risk formulas, interactive quizzes and a verifiable graduation certificate.",
      },
      { property: "og:title", content: "SPF Markets — Forex Academy for Serious Traders" },
      {
        property: "og:description",
        content:
          "50 structured forex lessons across 5 schools, worked pip and risk formulas, interactive quizzes, and a verifiable graduation certificate.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const features = [
  {
    icon: BookOpen,
    title: "Structured curriculum",
    text: "Five schools, fifty lessons — a deliberate path from market anatomy to a final capstone exam.",
  },
  {
    icon: TrendingUp,
    title: "Worked formulas",
    text: "Every pip value, position size and risk calculation shown step by step in dedicated math panels.",
  },
  {
    icon: ShieldCheck,
    title: "Quizzes that stick",
    text: "Each lesson ends with an interactive quiz. Scores are saved to your student account.",
  },
  {
    icon: Award,
    title: "Graduation certificate",
    text: "Finish all fifty lessons and the capstone exam to earn a certificate with a public verification page.",
  },
  {
    icon: FileText,
    title: "Academic transcript",
    text: "Download a PDF transcript showing how you scored in every quiz and final exam.",
  },
  {
    icon: Send,
    title: "Daily analysis",
    text: "Join the free SPF Analysis Telegram channel for daily market breakdowns and trade ideas.",
  },
];

const steps = [
  {
    title: "Enrol free",
    text: "Create your student account with your email and full name — the name you register goes on your transcript and graduation certificate.",
  },
  {
    title: "Learn & practise",
    text: "Work through each school's lessons, formulas and quizzes, applying concepts on a risk-free Deriv demo.",
  },
  {
    title: "Graduate & verify",
    text: "Pass the capstone exam, download your certificate, PDF transcript and share a verification link.",
  },
];

function HomePage() {
  const totalLessons = allLessons.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3.5 sm:px-8">
          <img src={logo} alt="SPF Markets shield emblem" className="size-9 object-contain" />
          <div className="min-w-0">
            <p className="font-display text-[15px] font-semibold leading-none text-foreground">
              SPF Markets
            </p>
            <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
              Forex Academy
            </p>
          </div>
          <nav className="ml-auto hidden items-center gap-7 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground md:flex">
            <a href="#curriculum" className="transition-colors hover:text-gold">
              Curriculum
            </a>
            <a href="#features" className="transition-colors hover:text-gold">
              Why SPF
            </a>
            <Link to="/verify" className="transition-colors hover:text-gold">
              Verify
            </Link>
          </nav>
          <Link
            to="/lessons"
            className="cta-gold ml-auto rounded-full px-4 py-1.5 text-[12px] font-semibold md:ml-6"
          >
            Start learning
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-gold/8 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/8 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
              <GraduationCap className="size-3.5" />
              Free curriculum · {totalLessons} lessons · 5 schools
            </p>
            <h1 className="mt-6 text-balance font-display text-[2.6rem] font-semibold leading-[1.05] text-foreground sm:text-[3.4rem]">
              From your first pip to <span className="gold-text">graduation day</span>.
            </h1>
            <p className="mt-6 max-w-[54ch] text-pretty text-[17px] leading-relaxed text-muted-foreground sm:text-[18px]">
              SPF Markets Academy is a structured forex curriculum — clear lessons, worked pip and
              risk formulas, and interactive quizzes that track your progress from Pre-School all
              the way to a verifiable graduation certificate.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                to="/lessons"
                className="cta-gold inline-flex items-center gap-2.5 rounded-xl px-7 py-4 font-display text-[15px] font-semibold"
              >
                Enrol Free
                <ArrowRight className="size-4" />
              </Link>
              <a
                href={TELEGRAM_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl border border-border px-6 py-4 text-[14px] font-medium text-foreground transition-colors hover:border-gold/50 hover:text-gold"
              >
                <Send className="size-4" />
                Join the Telegram channel
              </a>
            </div>
            <dl className="mt-11 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {[
                ["5", "Schools"],
                [String(totalLessons), "Lessons"],
                ["50+", "Quiz questions"],
              ].map(([value, label]) => (
                <div key={label} className="bg-surface px-4 py-4 text-center">
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-display text-2xl font-semibold text-gold">{value}</dd>
                  <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl border border-gold/25 shadow-[var(--shadow-panel)]">
              <img
                src={heroChart}
                alt="Golden candlestick chart on a deep navy background"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl border border-gold/30 bg-surface px-5 py-3.5 shadow-[var(--shadow-gold)]">
              <ShieldCheck className="size-5 shrink-0 text-gold" />
              <p className="text-[13px] leading-tight text-foreground">
                Verifiable certificates
                <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Public verification page
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">The curriculum</p>
        <h2 className="mt-4 max-w-[22ch] text-balance font-display text-3xl font-semibold text-foreground sm:text-[2.1rem]">
          Five schools. One disciplined path.
        </h2>
        <p className="mt-4 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">
          Every school builds on the last — foundations, then chart skills, then strategy, then the
          professional mindset. Pass each school's quizzes to unlock the next.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {curriculum.map((mod, i) => (
            <Link
              key={mod.id}
              to="/lessons"
              className={`group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-gold/40 ${
                i === 0 ? "lg:col-span-2" : ""
              }`}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] text-gold">
                  School {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {mod.lessons.length} lessons
                </span>
              </div>
              <h3 className="mt-3 font-display text-xl font-semibold text-foreground transition-colors group-hover:text-gold">
                {mod.title}
              </h3>
              <p className="mt-1.5 text-[14px] text-muted-foreground">{mod.subtitle}</p>
              <ul className="mt-4 space-y-1.5 border-t border-border pt-4">
                {mod.lessons.slice(0, 3).map((lesson) => (
                  <li key={lesson.id} className="flex items-center gap-2 text-[13px] text-muted-foreground">
                    <span className="size-1 shrink-0 rounded-full bg-gold" />
                    <span className="truncate">{lesson.title}</span>
                  </li>
                ))}
                {mod.lessons.length > 3 && (
                  <li className="font-mono text-[11px] text-muted-foreground">
                    + {mod.lessons.length - 3} more
                  </li>
                )}
              </ul>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-gold">
                Start this school
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-24 border-y border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">Why SPF Markets</p>
          <h2 className="mt-4 max-w-[26ch] text-balance font-display text-3xl font-semibold text-foreground sm:text-[2.1rem]">
            Built like a real school, not a course checklist.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl border border-border bg-surface p-6">
                <span className="grid size-10 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                  <Icon className="size-4.5" />
                </span>
                <h3 className="mt-4 font-display text-[17px] font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-gold">How it works</p>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="bg-surface p-7">
              <span className="font-display text-3xl font-semibold text-gold/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Broker */}
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-surface p-8 sm:p-10">
          <div className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-gold/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-[52ch]">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                Recommended broker
              </p>
              <h3 className="mt-3 text-balance font-display text-2xl font-semibold text-foreground">
                Practise every lesson on live Deriv prices.
              </h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
                Apply what you learn on a free demo account with real market feeds — before you
                commit capital.
              </p>
            </div>
            <a
              href={DERIV_AFFILIATE_URL}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="cta-gold inline-flex shrink-0 items-center gap-2 rounded-xl px-6 py-4 font-display text-[15px] font-semibold"
            >
              Open a Deriv Account
              <ArrowRight className="size-4" />
            </a>
          </div>
          <p className="relative mt-5 border-t border-border pt-4 font-mono text-[11px] text-muted-foreground">
            Affiliate link · Trading involves risk of loss
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-border bg-sidebar/60">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8">
          <img src={logo} alt="SPF Markets shield emblem" className="mx-auto size-14 object-contain" />
          <h2 className="mt-6 text-balance font-display text-3xl font-semibold text-foreground sm:text-[2.2rem]">
            Your trading education starts today.
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
            Join students working through the full curriculum — free, structured and with proof of
            graduation at the end.
          </p>
          <Link
            to="/lessons"
            className="cta-gold mt-8 inline-flex items-center gap-2.5 rounded-xl px-8 py-4 font-display text-[15px] font-semibold"
          >
            Enrol Free
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-sidebar">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="SPF Markets" className="size-9 object-contain" />
            <p className="font-display text-[15px] font-semibold text-foreground">SPF Markets Academy</p>
          </div>
          <nav className="flex flex-wrap items-center gap-6 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <Link to="/lessons" className="transition-colors hover:text-gold">
              Lessons
            </Link>
            <Link to="/verify" className="transition-colors hover:text-gold">
              Verify a certificate
            </Link>
            <a
              href={TELEGRAM_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold"
            >
              Telegram
            </a>
          </nav>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-10 sm:px-8">
          <p className="max-w-[80ch] text-[12px] leading-relaxed text-muted-foreground">
            SPF Markets Academy provides educational content only and does not provide financial
            advice. Trading foreign exchange carries a high level of risk and may not be suitable
            for all investors. Past performance is not indicative of future results.
          </p>
        </div>
      </footer>
    </div>
  );
}
