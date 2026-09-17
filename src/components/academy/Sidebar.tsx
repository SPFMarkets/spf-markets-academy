import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Check } from "lucide-react";
import logo from "@/assets/spf-logo.png";
import { curriculum } from "@/data/curriculum";
import { cn } from "@/lib/utils";

type Props = {
  activeLessonId: string;
  completed: string[];
  collapsed: boolean;
  onToggleCollapsed: () => void;
  onSelect: (lessonId: string) => void;
};

export function Sidebar({
  activeLessonId,
  completed,
  collapsed,
  onToggleCollapsed,
  onSelect,
}: Props) {
  const [open, setOpen] = useState<string[]>(curriculum.map((m) => m.id));
  const total = curriculum.reduce((n, m) => n + m.lessons.length, 0);
  const progress = Math.round((completed.length / total) * 100);

  const toggleModule = (id: string) =>
    setOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <aside
      className={cn(
        "sticky top-0 flex h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-300",
        collapsed ? "w-[76px]" : "w-[300px]",
      )}
    >
      <div className="flex items-center gap-3 px-4 pt-6 pb-5">
        <img
          src={logo}
          alt="SPF Markets shield emblem"
          width={816}
          height={816}
          className="size-10 shrink-0 object-contain"
        />
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-display text-base font-semibold leading-none text-sidebar-foreground">
              SPF Markets
            </p>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Forex Academy
            </p>
          </div>
        )}
      </div>

      {!collapsed && (
        <div className="mx-4 rounded-xl border border-sidebar-border bg-surface/60 px-4 py-3">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>Progress</span>
            <span className="text-gold">{progress}%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-accent">
            <div
              className="h-full rounded-full bg-gold transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            {completed.length} of {total} lessons complete
          </p>
        </div>
      )}

      <nav className="mt-5 flex-1 overflow-y-auto px-3 pb-6">
        {curriculum.map((module, i) => {
          const isOpen = open.includes(module.id) && !collapsed;
          return (
            <div key={module.id} className="mb-1">
              <button
                onClick={() => (collapsed ? onToggleCollapsed() : toggleModule(module.id))}
                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-sidebar-accent"
              >
                <span className="w-5 shrink-0 font-mono text-[11px] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {!collapsed && (
                  <>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold text-sidebar-foreground">
                        {module.title}
                      </span>
                      <span className="block truncate text-[11px] text-muted-foreground">
                        {module.subtitle}
                      </span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-3.5 shrink-0 text-muted-foreground transition-transform",
                        isOpen && "rotate-180",
                      )}
                    />
                  </>
                )}
              </button>

              {isOpen && (
                <ul className="mt-1 ml-[18px] space-y-0.5 border-l border-sidebar-border pl-2.5">
                  {module.lessons.map((lesson) => {
                    const active = lesson.id === activeLessonId;
                    const done = completed.includes(lesson.id);
                    return (
                      <li key={lesson.id}>
                        <button
                          onClick={() => onSelect(lesson.id)}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-[13px] transition-colors",
                            active
                              ? "bg-gold/12 font-medium text-gold"
                              : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
                          )}
                        >
                          <span className="flex-1 truncate">{lesson.title}</span>
                          {done && <Check className="size-3.5 shrink-0 text-success" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      <button
        onClick={onToggleCollapsed}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="flex items-center justify-center gap-2 border-t border-sidebar-border py-3.5 text-[12px] text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-gold"
      >
        {collapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
        {!collapsed && <span>Collapse</span>}
      </button>
    </aside>
  );
}
