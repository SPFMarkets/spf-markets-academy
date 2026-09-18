import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import logo from "@/assets/spf-logo.png";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Student Sign In — SPF Markets Academy" },
      {
        name: "description",
        content:
          "Sign in to SPF Markets Academy to save your quiz results and track your progress through the forex curriculum.",
      },
      { property: "og:title", content: "Student Sign In — SPF Markets Academy" },
      {
        property: "og:description",
        content: "Create a free student account to track your forex course progress.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate({ to: "/", replace: true });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setMessage(null);

    if (mode === "signup") {
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { display_name: name || email.split("@")[0] },
        },
      });
      if (err) setError(err.message);
      else if (!data.session) setMessage("Check your inbox and confirm your email to finish signing up.");
      else navigate({ to: "/", replace: true });
    } else {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      if (err) setError(err.message);
      else navigate({ to: "/", replace: true });
    }
    setBusy(false);
  };

  const google = async () => {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setError("Google sign-in did not complete. Please try again.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/", replace: true });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-5 py-14">
      <div className="w-full max-w-[26rem]">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-gold"
        >
          <ArrowLeft className="size-3.5" />
          Back to lessons
        </Link>

        <div className="rounded-2xl border border-border bg-surface p-7 sm:p-9">
          <div className="flex items-center gap-3">
            <img src={logo} alt="SPF Markets" className="size-10 rounded-lg" />
            <div>
              <p className="font-display text-lg font-semibold text-foreground">SPF Markets</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Forex Academy
              </p>
            </div>
          </div>

          <h1 className="mt-7 font-display text-2xl font-semibold text-foreground">
            {mode === "signin" ? "Sign in to continue" : "Create your student account"}
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
            Your quiz results and lesson progress are saved to your account.
          </p>

          <form onSubmit={submit} className="mt-7 space-y-3.5">
            {mode === "signup" && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Display name"
                className="w-full rounded-xl border border-border bg-surface-raised px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none"
              />
            )}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full rounded-xl border border-border bg-surface-raised px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none"
            />
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full rounded-xl border border-border bg-surface-raised px-4 py-3 text-[15px] text-foreground placeholder:text-muted-foreground focus:border-gold/60 focus:outline-none"
            />

            {error && (
              <p className="rounded-xl bg-destructive/10 px-4 py-3 text-[13px] text-foreground">{error}</p>
            )}
            {message && (
              <p className="rounded-xl bg-success/10 px-4 py-3 text-[13px] text-foreground">{message}</p>
            )}

            <button
              type="submit"
              disabled={busy}
              className="cta-gold w-full rounded-xl px-5 py-3.5 text-[15px] font-semibold disabled:opacity-50"
            >
              {mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            or
            <span className="h-px flex-1 bg-border" />
          </div>

          <button
            type="button"
            onClick={google}
            className="w-full rounded-xl border border-border px-5 py-3 text-[15px] font-medium text-foreground transition-colors hover:border-gold/50 hover:text-gold"
          >
            Continue with Google
          </button>

          <p className="mt-6 text-center text-[13px] text-muted-foreground">
            {mode === "signin" ? "New here?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode(mode === "signin" ? "signup" : "signin");
                setError(null);
                setMessage(null);
              }}
              className="font-medium text-gold hover:underline"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
