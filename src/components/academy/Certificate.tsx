import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Award, Download, FileDown, FileText, Lock } from "lucide-react";
import { downloadCertificate, downloadCertificatePdf } from "@/lib/certificate";
import { downloadTranscriptPdf } from "@/lib/transcript";
import { supabase } from "@/integrations/supabase/client";

type Props = {
  unlocked: boolean;
  signedIn: boolean;
  defaultName: string;
  userSeed: string;
};

export function Certificate({ unlocked, signedIn, defaultName, userSeed }: Props) {
  const [name, setName] = useState(defaultName);
  const [busy, setBusy] = useState(false);

  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const [certId, setCertId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  const download = async () => {
    setBusy(true);
    setError(null);
    try {
      const { data, error: err } = await supabase.rpc("issue_certificate", {
        _name: name.trim() || "SPF Graduate",
      });
      const row = data?.[0];
      if (err || !row) throw new Error(err?.message ?? "Could not issue certificate");
      setCertId(row.cert_number);
      const issued = new Date(row.issued_at).toLocaleDateString("en-GB", {
        day: "numeric", month: "long", year: "numeric",
      });
      await downloadCertificate({ name: row.graduate_name, date: issued, certId: row.cert_number });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const downloadPdf = async () => {
    setBusy(true);
    setError(null);
    try {
      const { data, error: err } = await supabase.rpc("issue_certificate", {
        _name: name.trim() || "SPF Graduate",
      });
      const row = data?.[0];
      if (err || !row) throw new Error(err?.message ?? "Could not issue certificate");
      setCertId(row.cert_number);
      const issued = new Date(row.issued_at).toLocaleDateString("en-GB", {
        day: "numeric", month: "long", year: "numeric",
      });
      await downloadCertificatePdf({ name: row.graduate_name, date: issued, certId: row.cert_number });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const downloadTranscript = async () => {
    setBusy(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from("quiz_completions")
        .select("lesson_id, score, total, completed_at")
        .eq("user_id", userSeed);
      if (err) throw new Error(err.message);
      await downloadTranscriptPdf({
        name: name.trim() || defaultName || "SPF Graduate",
        certNumber: certId,
        completions: data ?? [],
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="mt-10 overflow-hidden rounded-2xl border border-gold/30 bg-surface">
      <div className="border-b border-gold/20 bg-gold/8 px-6 py-3">
        <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
          <Award className="size-3.5" />
          Graduation certificate
        </p>
      </div>

      <div className="px-6 py-7 sm:px-8">
        {unlocked ? (
          <>
            <p className="font-display text-xl font-semibold text-foreground">
              Congratulations, graduate.
            </p>
            <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
              You have completed all five schools and passed the Final Capstone Examination.
              Enter your name as it should appear, then download your certificate.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
              <label className="flex-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Name on certificate
                </span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="mt-1.5 w-full rounded-xl border border-border bg-surface-raised px-4 py-3 text-[15px] text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-gold/50"
                />
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => void download()}
                  disabled={busy}
                  className="cta-gold inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 text-[15px] font-semibold disabled:opacity-50"
                >
                  <Download className="size-4" />
                  {busy ? "Preparing…" : "Download PNG"}
                </button>
                <button
                  onClick={() => void downloadPdf()}
                  disabled={busy}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gold/40 bg-transparent px-6 py-3 text-[15px] font-semibold text-gold transition-colors hover:bg-gold/10 disabled:opacity-50"
                >
                  <FileDown className="size-4" />
                  {busy ? "Preparing…" : "Download PDF"}
                </button>
                <button
                  onClick={() => void downloadTranscript()}
                  disabled={busy}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-surface-raised px-6 py-3 text-[15px] font-semibold text-foreground transition-colors hover:border-gold/40 disabled:opacity-50"
                >
                  <FileText className="size-4" />
                  {busy ? "Preparing…" : "Download transcript"}
                </button>
              </div>
            </div>

            <p className="mt-4 font-mono text-[11px] text-muted-foreground">
              {certId ? <>Certificate No. {certId} · {date} · </> : null}
              Anyone can confirm it at{" "}
              <Link to="/verify" className="text-gold hover:underline">/verify</Link>
            </p>
            {error && <p className="mt-2 text-[13px] text-destructive">{error}</p>}
          </>
        ) : (
          <div className="flex items-start gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-gold">
              <Lock className="size-4.5" />
            </span>
            <div>
              <p className="font-display text-lg font-semibold text-foreground">
                Certificate locked
              </p>
              <p className="mt-1.5 max-w-[52ch] text-[14px] leading-relaxed text-muted-foreground">
                Complete every lesson in all five schools — including this capstone exam — to
                unlock your personalised graduation certificate.
                {!signedIn && (
                  <>
                    {" "}
                    <Link to="/auth" className="font-medium text-gold hover:underline">
                      Sign in
                    </Link>{" "}
                    so your progress is saved to your account.
                  </>
                )}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
