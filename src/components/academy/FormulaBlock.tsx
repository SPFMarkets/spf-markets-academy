type Props = {
  label: string;
  expression: string;
  worked?: string;
  terms?: { symbol: string; meaning: string }[];
};

export function FormulaBlock({ label, expression, worked, terms }: Props) {
  return (
    <figure className="my-9 overflow-hidden rounded-2xl border border-gold/25 bg-surface">
      <figcaption className="flex items-center justify-between border-b border-gold/20 bg-gold/8 px-5 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-gold">
          Formula · {label}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">ƒ</span>
      </figcaption>

      <div className="px-6 py-7">
        <p className="text-center font-mono text-[17px] leading-relaxed tracking-tight text-foreground sm:text-[19px]">
          {expression}
        </p>

        {worked && (
          <p className="mt-5 border-t border-border pt-4 text-center font-mono text-[13px] text-muted-foreground">
            <span className="text-gold">→ </span>
            {worked}
          </p>
        )}

        {terms && terms.length > 0 && (
          <dl className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {terms.map((t) => (
              <div key={t.symbol} className="rounded-lg bg-surface-raised px-3.5 py-2.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-gold/80">
                  {t.symbol}
                </dt>
                <dd className="mt-1 text-[13px] text-muted-foreground">{t.meaning}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </figure>
  );
}
