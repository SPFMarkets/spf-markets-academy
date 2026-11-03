import { ArrowRight, Send } from "lucide-react";
import { TELEGRAM_CHANNEL_URL } from "@/data/curriculum";

export function TelegramCta() {
  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-gold/30 bg-surface shadow-[var(--shadow-panel)]">
      <div className="relative px-7 py-7 sm:px-9">
        <div className="pointer-events-none absolute -top-20 -left-16 size-56 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
              <Send className="size-5" />
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
                Daily Updates · Free
              </p>
              <h3 className="mt-2 text-balance font-display text-xl font-semibold text-foreground sm:text-[22px]">
                Join the SPF Analysis Telegram channel
              </h3>
              <p className="mt-1.5 max-w-[52ch] text-[14px] leading-relaxed text-muted-foreground">
                Daily market analysis, trade ideas and lesson extras posted every day — join
                thousands of students following along in real time.
              </p>
            </div>
          </div>

          <a
            href={TELEGRAM_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-gold inline-flex shrink-0 items-center gap-2 rounded-xl px-6 py-3.5 font-display text-[14px] font-semibold"
          >
            Join Channel
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
