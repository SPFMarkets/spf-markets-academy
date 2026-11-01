import QRCode from "qrcode";
import logoUrl from "@/assets/spf-logo.png";

const NAVY = "#0d1526";
const NAVY_DEEP = "#0a101d";
const GOLD = "#d4af37";
const GOLD_SOFT = "#e8cf8a";
const TEXT = "#e6e9f0";
const MUTED = "#9aa3b5";

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export function certificateId(seed: string): string {
  let h = 5381;
  for (let i = 0; i < seed.length; i++) h = ((h << 5) + h + seed.charCodeAt(i)) >>> 0;
  return `SPF-${h.toString(36).toUpperCase().padStart(7, "0").slice(0, 7)}`;
}

export async function renderCertificate(
  canvas: HTMLCanvasElement,
  opts: { name: string; date: string; certId: string },
): Promise<void> {
  const W = 1600;
  const H = 1131;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  try {
    await document.fonts.ready;
  } catch {
    /* fonts optional */
  }

  // background
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, NAVY);
  bg.addColorStop(1, NAVY_DEEP);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // subtle radial glow
  const glow = ctx.createRadialGradient(W / 2, H * 0.42, 80, W / 2, H * 0.42, 700);
  glow.addColorStop(0, "rgba(212,175,55,0.10)");
  glow.addColorStop(1, "rgba(212,175,55,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // double gold border
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 3;
  ctx.strokeRect(40, 40, W - 80, H - 80);
  ctx.lineWidth = 1;
  ctx.strokeRect(56, 56, W - 112, H - 112);

  // corner flourishes
  ctx.strokeStyle = GOLD_SOFT;
  ctx.lineWidth = 2;
  for (const [cx, cy, sx, sy] of [
    [40, 40, 1, 1],
    [W - 40, 40, -1, 1],
    [40, H - 40, 1, -1],
    [W - 40, H - 40, -1, -1],
  ] as const) {
    ctx.beginPath();
    ctx.moveTo(cx + 90 * sx, cy);
    ctx.lineTo(cx, cy);
    ctx.lineTo(cx, cy + 90 * sy);
    ctx.stroke();
  }

  // logo
  try {
    const logo = await loadImage(logoUrl);
    ctx.drawImage(logo, W / 2 - 70, 110, 140, 140);
  } catch {
    /* logo optional */
  }

  ctx.textAlign = "center";

  // brand
  ctx.fillStyle = GOLD;
  ctx.font = "600 34px 'Fraunces', Georgia, serif";
  ctx.fillText("SPF MARKETS", W / 2, 310);
  ctx.fillStyle = MUTED;
  ctx.font = "500 15px 'JetBrains Mono', monospace";
  ctx.fillText("F O R E X   A C A D E M Y", W / 2, 342);

  // title
  ctx.fillStyle = TEXT;
  ctx.font = "600 64px 'Fraunces', Georgia, serif";
  ctx.fillText("Certificate of Graduation", W / 2, 450);

  ctx.fillStyle = MUTED;
  ctx.font = "400 22px 'Inter', sans-serif";
  ctx.fillText("This certifies that", W / 2, 520);

  // recipient name
  ctx.fillStyle = GOLD_SOFT;
  ctx.font = "600 72px 'Fraunces', Georgia, serif";
  ctx.fillText(opts.name, W / 2, 620);

  // gold rule under name
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 260, 660);
  ctx.lineTo(W / 2 + 260, 660);
  ctx.stroke();

  // body
  ctx.fillStyle = TEXT;
  ctx.font = "400 24px 'Inter', sans-serif";
  ctx.fillText("has successfully completed the full SPF Markets curriculum —", W / 2, 725);
  ctx.fillText("all five schools, fifty lessons, and the Final Capstone Examination.", W / 2, 762);

  ctx.fillStyle = MUTED;
  ctx.font = "400 19px 'Inter', sans-serif";
  ctx.fillText(
    "Demonstrating proficiency in market mechanics, risk management, strategy design and professional trading practice.",
    W / 2,
    812,
  );

  // verification QR (links to /verify?cert=NUMBER)
  const QR_SIZE = 132;
  const qrX = W - 78 - QR_SIZE;
  const qrY = H - 224;
  try {
    const verifyUrl = `${window.location.origin}/verify?cert=${encodeURIComponent(opts.certId)}`;
    const qrData = await QRCode.toDataURL(verifyUrl, {
      margin: 2,
      width: QR_SIZE * 3,
      color: { dark: NAVY, light: GOLD_SOFT },
      errorCorrectionLevel: "M",
    });
    const qr = await loadImage(qrData);
    ctx.drawImage(qr, qrX, qrY, QR_SIZE, QR_SIZE);

    ctx.strokeStyle = GOLD;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(qrX - 6, qrY - 6, QR_SIZE + 12, QR_SIZE + 12);

    ctx.fillStyle = GOLD;
    ctx.font = "500 13px 'JetBrains Mono', monospace";
    ctx.fillText("SCAN TO VERIFY", qrX + QR_SIZE / 2, qrY + QR_SIZE + 26);
  } catch {
    /* QR optional */
  }

  // footer: date + certificate id
  ctx.font = "500 17px 'JetBrains Mono', monospace";
  ctx.fillStyle = GOLD;
  ctx.fillText(opts.date, W / 2 - 380, 960);
  ctx.fillText(`Certificate No. ${opts.certId}`, W / 2 + 240, 960);

  ctx.strokeStyle = "rgba(212,175,55,0.4)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 480, 930);
  ctx.lineTo(W / 2 - 280, 930);
  ctx.moveTo(W / 2 + 140, 930);
  ctx.lineTo(W / 2 + 340, 930);
  ctx.stroke();

  ctx.fillStyle = MUTED;
  ctx.font = "400 14px 'Inter', sans-serif";
  ctx.fillText("Date of Graduation", W / 2 - 380, 990);
  ctx.fillText("Verify online anytime", W / 2 + 240, 990);
}

export async function downloadCertificate(opts: {
  name: string;
  date: string;
  certId: string;
}): Promise<void> {
  const canvas = document.createElement("canvas");
  await renderCertificate(canvas, opts);
  const a = document.createElement("a");
  a.download = `SPF-Markets-Graduation-Certificate-${opts.certId}.png`;
  a.href = canvas.toDataURL("image/png");
  a.click();
}

/** Renders the certificate canvas and builds a print-ready A4 landscape PDF (QR + details preserved). */
export async function certificatePdfBlob(opts: {
  name: string;
  date: string;
  certId: string;
}): Promise<Blob> {
  const canvas = document.createElement("canvas");
  await renderCertificate(canvas, opts);
  const pngBlob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Could not render certificate"))), "image/png"),
  );
  const pngBytes = new Uint8Array(await pngBlob.arrayBuffer());
  const { PDFDocument } = await import("pdf-lib");
  const pdf = await PDFDocument.create();
  pdf.setTitle(`SPF Markets Graduation Certificate ${opts.certId}`);
  pdf.setAuthor("SPF Markets Forex Academy");
  pdf.setSubject(`Certificate of Graduation — ${opts.name}`);
  const page = pdf.addPage([842, 595]); // A4 landscape (points)
  const img = await pdf.embedPng(pngBytes);
  page.drawImage(img, { x: 0, y: 0, width: 842, height: 595 });
  const bytes = await pdf.save();
  return new Blob([bytes as unknown as BlobPart], { type: "application/pdf" });
}

export async function downloadCertificatePdf(opts: {
  name: string;
  date: string;
  certId: string;
}): Promise<void> {
  const blob = await certificatePdfBlob(opts);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `SPF-Markets-Graduation-Certificate-${opts.certId}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30_000);
}
