import { useEffect, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import type { QuizQuestion } from "@/data/curriculum";
import { cn } from "@/lib/utils";

type Props = {
  lessonId: string;
  questions: QuizQuestion[];
  onComplete: (lessonId: string) => void;
};

export function Quiz({ lessonId, questions, onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setFinished(false);
  }, [lessonId]);

  const question = questions[index]!;
  const isCorrect = selected === question.answer;

  const check = () => {
    if (selected === null) return;
    setChecked(true);
    if (selected === question.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setSelected(null);
      setChecked(false);
    } else {
      setFinished(true);
      onComplete(lessonId);
    }
  };

  const restart = () => {
    setIndex(0);
    setSelected(null);
    setChecked(false);
    setScore(0);
    setFinished(false);
  };

  return (
    <section className="mt-10 rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Check your understanding
        </p>
        <span className="rounded-full bg-accent px-3 py-1 font-mono text-[10px] text-gold">
          {finished ? "Complete" : `Q${index + 1} / ${questions.length}`}
        </span>
      </div>

      {finished ? (
        <div className="mt-6 text-center">
          <p className="font-display text-3xl font-semibold text-gold">
            {score} / {questions.length}
          </p>
          <p className="mt-2 text-[15px] text-muted-foreground">
            {score === questions.length
              ? "Perfect run — this lesson is marked complete."
              : "Lesson marked complete. Review the formulas and try again for a perfect score."}
          </p>
          <button
            onClick={restart}
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-gold/40 px-5 py-2.5 text-[14px] font-medium text-gold transition-colors hover:bg-gold/10"
          >
            <RotateCcw className="size-4" />
            Retake quiz
          </button>
        </div>
      ) : (
        <>
          <p className="mt-4 text-pretty font-display text-xl font-semibold leading-snug text-foreground">
            {question.question}
          </p>

          <div className="mt-6 space-y-2.5">
            {question.options.map((option, i) => {
              const chosen = selected === i;
              const revealCorrect = checked && i === question.answer;
              const revealWrong = checked && chosen && i !== question.answer;
              return (
                <button
                  key={option}
                  disabled={checked}
                  onClick={() => setSelected(i)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left text-[15px] transition-all duration-200",
                    revealCorrect
                      ? "border-success/60 bg-success/10 text-foreground"
                      : revealWrong
                        ? "border-destructive/60 bg-destructive/10 text-foreground"
                        : chosen
                          ? "border-gold/60 bg-gold/10 text-foreground"
                          : "border-border bg-surface-raised text-muted-foreground hover:-translate-y-0.5 hover:border-gold/40 hover:text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-7 shrink-0 place-items-center rounded-lg font-mono text-[11px]",
                      chosen || revealCorrect ? "bg-gold/20 text-gold" : "bg-accent text-muted-foreground",
                    )}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {revealCorrect && <Check className="size-4 text-success" />}
                  {revealWrong && <X className="size-4 text-destructive" />}
                </button>
              );
            })}
          </div>

          {checked && (
            <p
              className={cn(
                "mt-5 rounded-xl px-4 py-3 text-[14px] leading-relaxed",
                isCorrect ? "bg-success/10 text-foreground" : "bg-destructive/10 text-foreground",
              )}
            >
              <strong className="font-semibold">{isCorrect ? "Correct. " : "Not quite. "}</strong>
              {question.explanation}
            </p>
          )}

          <div className="mt-6">
            {checked ? (
              <button
                onClick={next}
                className="cta-gold w-full rounded-xl px-5 py-3.5 text-[15px] font-semibold sm:w-auto sm:px-8"
              >
                {index + 1 < questions.length ? "Next question" : "Finish quiz"}
              </button>
            ) : (
              <button
                onClick={check}
                disabled={selected === null}
                className="cta-gold w-full rounded-xl px-5 py-3.5 text-[15px] font-semibold disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto sm:px-8"
              >
                Check answer
              </button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
