import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { BadgeCheck, ShieldX, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/spf-logo.png";

export const Route = createFileRoute("/verify")({
  validateSearch: z.object({ cert: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "Verify a Certificate — SPF Markets Academy" },
      { name: "description", content: "Confirm an SPF Markets Academy graduation certificate by its certificate number." },
      { property: "og:title", content: "Verify a Certificate — SPF Markets Academy" },
      { property: "og:description", content: "Enter a certificate number to confirm the graduate's name and validity." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: VerifyPage,
});

type Result = { cert_number: string; graduate_name: string; issued_at: string } | null | "none";

function VerifyPage() {
  const { cert } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [value, setValue] = useState(cert ?? "");
  const [result, setResult] = useState<Result>(null);
  const [busy, setBusy] = useState(false);

  const check = async (no: string) => {
    if (!no.trim()) return;
    setBusy(true);
    const { data } = await supabase.rpc("verify_certificate", { _cert: no.trim() });
    setResult(data?.[0] ?? "none");
    setBusy(false);
    void navigate({ search: { cert: no.trim().toUpperCase() }, replace: true });
  };

  if (cert && result === null && !busy) void check(cert);

  return (
    <main className="min-h-screen bg-background px-5 py-16 text-foreground">
      <div className="mx-auto max-w-xl">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="SPF Markets" className="size-10" />
          <span className="font-display text-lg font-semibold">SPF Markets Academy</span>
        </Link>
        <h1 className="mt-10 font-display text-3xl font-semibold">
          Verify a <span className="gold-text">certificate</span>
        </h1>
        <p className="mt-3 text-muted-foreground">
          Enter the certificate number printed on the graduation certificate (e.g. SPF-1A2B3C4D).
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); void check(value); }}
          className="mt-6 flex gap-3"
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="SPF-XXXXXXXX"
            className="flex-1 rounded-xl border border-border bg-surface-raised px-4 py-3 font-mono uppercase text-foreground outline-none focus:border-gold/50"
          />
          <button disabled={busy} className="cta-gold inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold disabled:opacity-50">
            <Search className="size-4" />{busy ? "Checking…" : "Verify"}
          </button>
        </form>

        {result === "none" && (
          <div className="mt-8 flex gap-4 rounded-2xl border border-destructive/40 bg-destructive/10 p-6">
            <ShieldX className="size-6 shrink-0 text-destructive" />
            <div>
              <p className="font-semibold">No valid certificate found</p>
              <p className="mt-1 text-sm text-muted-foreground">Check the number and try again.</p>
            </div>
          </div>
        )}
        {result && result !== "none" && (
          <div className="mt-8 flex gap-4 rounded-2xl border border-gold/40 bg-surface p-6">
            <BadgeCheck className="size-7 shrink-0 text-gold" />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold">Valid certificate</p>
              <p className="mt-2 font-display text-2xl font-semibold">{result.graduate_name}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Graduated SPF Markets Academy on{" "}
                {new Date(result.issued_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">No. {result.cert_number}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
