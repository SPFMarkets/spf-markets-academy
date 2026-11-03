import { curriculum } from "@/data/curriculum";

export type Completion = {
  lesson_id: string;
  score: number;
  total: number;
  completed_at: string;
};

export type TranscriptOptions = {
  name: string;
  certNumber?: string | null;
  completions: Completion[];
};

const NAVY = { r: 0.051, g: 0.082, b: 0.149 }; // #0d1526
const GOLD = { r: 0.831, g: 0.686, b: 0.216 }; // #d4af37
const GOLD_DARK = { r: 0.659, g: 0.518, b: 0.165 }; // #a8842a (gold legible on white)
const TEXT = { r: 0.153, g: 0.180, b: 0.243 }; // near-navy body text
const MUTED = { r: 0.42, g: 0.455, b: 0.53 };

const A4 = { W: 595.28, H: 841.89 };
const M = 52;

const fmtDate = (iso: string): string => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
};

/** Builds the full academic transcript as a print-ready A4 portrait PDF. */
export async function buildTranscriptPdf(opts: TranscriptOptions): Promise<Blob> {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const { W, H } = A4;

  const pdf = await PDFDocument.create();
  pdf.setTitle(`SPF Markets Academic Transcript — ${opts.name}`);
  pdf.setAuthor("SPF Markets Forex Academy");
  pdf.setSubject("Academic transcript of quiz and examination results");
  pdf.setProducer("SPF Markets Forex Academy");

  const times = await pdf.embedFont(StandardFonts.TimesRoman);
  const timesBold = await pdf.embedFont(StandardFonts.TimesRomanBold);
  const helv = await pdf.embedFont(StandardFonts.Helvetica);
  const helvBold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const helvOblique = await pdf.embedFont(StandardFonts.HelveticaOblique);

  const col = (c: { r: number; g: number; b: number }) => rgb(c.r, c.g, c.b);

  const completions = new Map<string, Completion>();
  for (const c of opts.completions) completions.set(c.lesson_id, c);

  const done = opts.completions.filter((c) => c.total > 0);
  const totalQ = done.reduce((s, c) => s + c.total, 0);
  const totalS = done.reduce((s, c) => s + c.score, 0);
  const avg = totalQ > 0 ? Math.round((totalS / totalQ) * 100) : 0;
  const completedCount = opts.completions.length;
  const lessonCount = curriculum.reduce((s, m) => s + m.lessons.length, 0);
  const lastMod = curriculum[curriculum.length - 1];
  const capstoneId = lastMod ? lastMod.lessons[lastMod.lessons.length - 1]?.id : undefined;
  const capstone = capstoneId ? completions.get(capstoneId) : undefined;

  const pages: { page: ReturnType<typeof pdf.addPage>; y: number }[] = [];
  const cur = (): { page: ReturnType<typeof pdf.addPage>; y: number } => pages[pages.length - 1]!;
  let page = pdf.addPage([W, H]);
  pages.push({ page, y: 0 });

  const newPage = () => {
    page = pdf.addPage([W, H]);
    pages.push({ page, y: H - 64 });
    // thin gold rule at the top of continuation pages
    page.drawLine({
      start: { x: M, y: H - 44 },
      end: { x: W - M, y: H - 44 },
      thickness: 1,
      color: col(GOLD),
    });
  };

  const ensure = (needed: number): void => {
    if (cur().y - needed < M + 24) newPage();
  };

  // ---------- header band ----------
  const bandH = 132;
  page.drawRectangle({ x: 0, y: H - bandH, width: W, height: bandH, color: col(NAVY) });
  page.drawText("SPF MARKETS", {
    x: M, y: H - 46, size: 20, font: timesBold, color: col(GOLD),
  });
  page.drawText("F O R E X   A C A D E M Y", {
    x: M, y: H - 62, size: 7.5, font: helv, color: col(MUTED),
  });
  page.drawText("Academic Transcript", {
    x: M, y: H - 102, size: 28, font: timesBold, color: rgb(0.902, 0.914, 0.941),
  });
  page.drawText("Official record of coursework and examination results", {
    x: M, y: H - 120, size: 9, font: helv, color: col(MUTED),
  });

  let y = H - bandH - 40;

  // ---------- student block ----------
  const name = opts.name.trim() || "SPF Graduate";
  const rightX = W - M;
  page.drawText("GRADUATE", { x: M, y, size: 8, font: helvBold, color: col(MUTED) });
  page.drawText(name.slice(0, 48), { x: M, y: y - 17, size: 15, font: timesBold, color: col(NAVY) });

  if (opts.certNumber) {
    const cert = `Certificate No. ${opts.certNumber}`;
    page.drawText(cert, {
      x: rightX - helvBold.widthOfTextAtSize(cert, 10), y, size: 10, font: helvBold, color: col(GOLD_DARK),
    });
  }
  const today = fmtDate(new Date().toISOString());
  const issued = `Issued ${today}`;
  page.drawText(issued, {
    x: rightX - helv.widthOfTextAtSize(issued, 9), y: y - 15, size: 9, font: helv, color: col(MUTED),
  });

  y -= 42;
  page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 1.2, color: col(GOLD) });
  y -= 24;

  // ---------- summary ----------
  const summary = [
    `Lessons completed: ${completedCount} of ${lessonCount}`,
    `Average quiz score: ${avg}%`,
    `Final Capstone Examination: ${capstone ? `${capstone.score}/${capstone.total}` : "not yet taken"}`,
  ];
  let sx = M;
  for (const line of summary) {
    const w = helvBold.widthOfTextAtSize(line, 10);
    if (sx + w > rightX && sx > M) {
      sx = M;
      y -= 16;
    }
    page.drawText(line, { x: sx, y, size: 10, font: helvBold, color: col(TEXT) });
    sx += w + 18;
  }
  y -= 20;
  cur().y = y;

  // ---------- per-school sections ----------
  for (const mod of curriculum) {
    ensure(30);
    y = cur().y;
    page.drawText(mod.title.toUpperCase(), {
      x: M, y, size: 12, font: timesBold, color: col(NAVY),
    });
    page.drawLine({
      start: { x: M, y: y - 4.5 },
      end: { x: W - M, y: y - 4.5 },
      thickness: 0.75,
      color: col(GOLD),
    });
    cur().y = y - 22;

    for (const lesson of mod.lessons) {
      ensure(18);
      y = cur().y;
      const c = completions.get(lesson.id);
      const title = lesson.title.length > 64 ? `${lesson.title.slice(0, 63)}…` : lesson.title;
      const isExam = /exam/.test(lesson.id);
      if (c) {
        page.drawText(title, {
          x: M, y, size: 10, font: isExam ? helvBold : helv, color: col(TEXT),
        });
        const when = fmtDate(c.completed_at);
        page.drawText(when, {
          x: rightX - 96 - helv.widthOfTextAtSize(when, 9), y: y + 0.5, size: 9, font: helv, color: col(MUTED),
        });
        const sc = `${c.score}/${c.total}`;
        page.drawText(sc, {
          x: rightX - helvBold.widthOfTextAtSize(sc, 10), y, size: 10, font: helvBold, color: col(GOLD_DARK),
        });
      } else {
        page.drawText(title, { x: M, y, size: 10, font: helv, color: col(MUTED) });
        const nc = "not yet completed";
        page.drawText(nc, {
          x: rightX - helvOblique.widthOfTextAtSize(nc, 9), y: y + 0.5, size: 9, font: helvOblique, color: col(MUTED),
        });
      }
      cur().y = y - 17;
    }
    cur().y -= 6;
  }

  // ---------- footers ----------
  const verifyUrl = `${typeof window !== "undefined" ? window.location.origin : "https://spfmarkets.lovable.app"}/verify`;
  pages.forEach((p, i) => {
    p.page.drawLine({
      start: { x: M, y: M + 20 },
      end: { x: W - M, y: M + 20 },
      thickness: 0.75,
      color: col(GOLD),
    });
    p.page.drawText("SPF Markets Forex Academy — Academic Transcript", {
      x: M, y: M + 8, size: 8, font: helv, color: col(MUTED),
    });
    p.page.drawText(`Certificates verified at ${verifyUrl}`, {
      x: W - M - helv.widthOfTextAtSize(`Certificates verified at ${verifyUrl}`, 8),
      y: M + 8, size: 8, font: helv, color: col(MUTED),
    });
    const num = `Page ${i + 1} of ${pages.length}`;
    p.page.drawText(num, {
      x: W - M - helv.widthOfTextAtSize(num, 8), y: M - 4, size: 8, font: helv, color: col(MUTED),
    });
  });

  const bytes = await pdf.save();
  return new Blob([bytes as unknown as BlobPart], { type: "application/pdf" });
}

export async function downloadTranscriptPdf(opts: TranscriptOptions): Promise<void> {
  const blob = await buildTranscriptPdf(opts);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `SPF-Markets-Academic-Transcript${opts.certNumber ? `-${opts.certNumber}` : ""}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
