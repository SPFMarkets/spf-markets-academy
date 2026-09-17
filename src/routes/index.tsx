import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Menu, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/academy/Sidebar";
import { FormulaBlock } from "@/components/academy/FormulaBlock";
import { DerivCta } from "@/components/academy/DerivCta";
import { Quiz } from "@/components/academy/Quiz";
import { allLessons } from "@/data/curriculum";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SPF Markets — Forex Academy for Serious Traders" },
      {
        name: "description",
        content:
          "Learn forex from Pre-School to High School with SPF Markets: clear lessons, worked pip and risk formulas, and quizzes that track your progress.",
      },
      { property: "og:title", content: "SPF Markets — Forex Academy for Serious Traders" },
      {
        property: "og:description",
        content:
          "Structured forex curriculum with worked formulas, risk management lessons and interactive quizzes.",
      },
    ],
  }),
  component: Academy,
});

function Academy() {
  const [activeId, setActiveId] = useState(allLessons[0].id);
  const [completed, setCompleted] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const index = useMemo(() => allLessons.findIndex((l) => l.id === activeId), [activeId]);
  const lesson = allLessons[index];
  const prev = allLessons[index - 1];
  const next = allLessons[index + 1];

  const select = (id: string) => {
    setActiveId(id);
    setMobileOpen(false);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const markComplete = (id: string) =>
    setCompleted((prevIds) => (prevIds.includes(id) ? prevIds : [...prevIds, id]));

  const sidebarProps = {
    activeLessonId: activeId,
    completed,
    onSelect: select,
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block">
        <Sidebar
          {...sidebarProps}
          collapsed={collapsed}
          onToggleCollapsed={() => setCollapsed((c) => !c)}
        />
      </div>

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/85 px-5 py-3.5 backdrop-blur-xl lg:px-10">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open course syllabus"
                className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:text-gold lg:hidden"
              >
                <Menu className="size-4" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] border-sidebar-border bg-sidebar p-0">
              <SheetTitle className="sr-only">Course syllabus</SheetTitle>
              <Sidebar {...sidebarProps} collapsed={false} onToggleCollapsed={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>

          <div className="flex min-w-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="truncate">{lesson.moduleTitle}</span>
            <span className="text-gold">/</span>
            <span className="truncate text-foreground">Lesson {index + 1}</span>
          </div>

          <span className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground">
            <Clock className="size-3" />
            {lesson.minutes} min
          </span>
        </header>

        <article className="mx-auto max-w-[72ch] px-6 py-12 sm:px-10 lg:px-12 lg:py-16">
          <h1 className="text-balance font-display text-[2.25rem] font-semibold leading-[1.08] text-foreground sm:text-[2.75rem]">
            {lesson.title}
          </h1>
          <p className="mt-5 max-w-[56ch] text-pretty text-[18px] leading-relaxed text-gold-soft/85">
            {lesson.summary}
          </p>

          <div className="lesson-prose mt-8">
            {lesson.blocks.map((block, i) => {
              if (block.type === "p") return <p key={i}>{block.text}</p>;
              if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
              if (block.type === "list")
                return (
                  <ul key={i}>
                    {block.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                );
              if (block.type === "callout")
                return (
                  <aside
                    key={i}
                    className="my-8 rounded-xl border-l-2 border-gold bg-surface px-5 py-4"
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                      {block.title}
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-foreground">{block.text}</p>
                  </aside>
                );
              return (
                <FormulaBlock
                  key={i}
                  label={block.label}
                  expression={block.expression}
                  worked={block.worked}
                  terms={block.terms}
                />
              );
            })}
          </div>

          <DerivCta lessonTitle={lesson.title} />

          <Quiz lessonId={lesson.id} questions={lesson.quiz} onComplete={markComplete} />

          <nav className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6 text-[13px]">
            {prev ? (
              <button
                onClick={() => select(prev.id)}
                className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-gold"
              >
                <ArrowLeft className="size-4" />
                <span className="truncate">{prev.title}</span>
              </button>
            ) : (
              <span />
            )}
            {next && (
              <button
                onClick={() => select(next.id)}
                className="flex items-center gap-2 text-right font-medium text-foreground transition-colors hover:text-gold"
              >
                <span className="truncate">{next.title}</span>
                <ArrowRight className="size-4" />
              </button>
            )}
          </nav>
        </article>
      </main>
    </div>
  );
}
