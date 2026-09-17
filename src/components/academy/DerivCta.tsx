import { ArrowRight, ShieldCheck } from "lucide-react";
import { DERIV_AFFILIATE_URL } from "@/data/curriculum";

export function DerivCta({ lessonTitle }: { lessonTitle: string }) {
  return (
    <section className="mt-12 overflow-hidden rounded-2xl border border-gold/30 bg-surface shadow-[var(--shadow-panel)]">
      <div className="relative px-7 py-8 sm:px-9 sm:py-10">
        <div className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-[44ch]">
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
              <ShieldCheck className="size-3.5" />
              Recommended Broker
            </p>
            <h3 className="mt-3 text-balance font-display text-2xl font-semibold text-foreground sm:text-[28px]">
              Practise “{lessonTitle}” on live Deriv prices.
            </h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-muted-foreground">
              Open a Deriv account and apply this lesson on a risk-free demo with real market feeds
              before you commit capital.
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
          No deposit required to start · Affiliate link · Trading involves risk of loss
        </p>
      </div>
    </section>
  );
}
