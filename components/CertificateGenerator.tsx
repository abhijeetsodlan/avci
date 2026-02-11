"use client";

import NextImage from "next/image";
import { useState } from "react";

const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 850;

const loadImage = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Canvas rendering requires a browser environment."));
      return;
    }

    const img = new window.Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
  });

const drawCircleImage = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  size: number
) => {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(img, x - size / 2, y - size / 2, size, size);
  ctx.restore();
};

export const CertificateGenerator = () => {
  const [name, setName] = useState("");
  const [breakupTime, setBreakupTime] = useState("");
  const [certificateUrl, setCertificateUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const drawParagraph = (
    ctx: CanvasRenderingContext2D,
    lines: string[],
    startX: number,
    startY: number,
    lineHeight: number,
    font: string
  ) => {
    ctx.font = font;
    lines.forEach((line, index) => {
      ctx.fillText(line, startX, startY + index * lineHeight);
    });
    return startY + lines.length * lineHeight;
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas context not available.");

      // Base background
      ctx.fillStyle = "#fffaf5";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Header bar
      ctx.fillStyle = "#FF9933";
      ctx.fillRect(0, 0, CANVAS_WIDTH, 110);

      // Header text
      ctx.fillStyle = "#111";
      ctx.font = "bold 26px 'Georgia', serif";
      ctx.fillText("एंटी-वैलेंटाइन आयोग, भारत", 70, 50);
      ctx.font = "18px 'Inter', sans-serif";
      ctx.fillText("(Anti-Valentine Commission of India)", 70, 80);
      ctx.fillText(
        "Recognized by the Ministry of Emotional Independence",
        70,
        100
      );

      // Title
      ctx.font = "bold 48px 'Georgia', serif";
      ctx.textAlign = "center";
      ctx.fillText("सिंगल नागरिक प्रमाण पत्र", CANVAS_WIDTH / 2, 180);
      ctx.textAlign = "left";

      // -----------------------------
      // BODY (switch based on breakup)
      // -----------------------------
      const isBreakup = breakupTime.trim().length > 0;
      const filledName = name.trim() ? name.trim() : "__________________________";

      // ✅ Fix: add "उक्त नागरिक" after name so Hindi reads correctly
      const commonIntro = [`${filledName}`];

      // Breakup version (ONLY when breakup time is filled)
      const breakupBody = [
        "आयोग विशेष रूप से पुष्टि करता है कि",
        "उक्त नागरिक ने हालिया भावनात्मक उथल-पुथल के पश्चात",
        "साहसपूर्वक “Move On अभियान” में भाग लिया है।",
        "स्थिति: अब आधिकारिक रूप से सिंगल",
        "",
        `Time since breakup: ${breakupTime.trim()}`,
      ];

      // No breakup time version (alternate)
      const noBreakupAlternate = [
        "आयोग यह पुष्टि करता है कि",
        "उक्त नागरिक ने प्रेम-प्रस्तावों, सिचुएशनशिप्स एवं भ्रमित चैट्स से दूर रहकर",
        "स्वाभिमान, करियर और आत्म-शांति को प्राथमिकता दी है।",
        "स्थिति: स्वेच्छा से सिंगल (Fully Peaceful Mode)",
        "",
        "यह नागरिक किसी भी प्रकार के",
        "अचानक “Where are you?” संदेशों एवं",
        "अनावश्यक इमोशनल ड्रामा से पूर्णतः सुरक्षित है।",
      ];

      const bodyLines = isBreakup
        ? [...commonIntro, ...breakupBody]
        : [...commonIntro, ...noBreakupAlternate];

      const bodyStartY = 230;
      const bodyEndY = drawParagraph(
        ctx,
        bodyLines,
        70,
        bodyStartY,
        28,
        "18px 'Inter', sans-serif"
      );

      // Load images
      const seal = await loadImage("/images/images.jfif");
      const guardian = await loadImage("/images/rahul.jfif");

      // -----------------------------
      // FOOTER (Dynamic positioning)
      // -----------------------------
      const PADDING_X = 70;
      const MIN_FOOTER_TOP = 520;
      const FOOTER_H = 220;

      // Keep footer below body, but reserve bottom space for signatures + metadata
      const FOOTER_TOP = Math.min(
        Math.max(bodyEndY + 28, MIN_FOOTER_TOP),
        CANVAS_HEIGHT - (FOOTER_H + 120)
      );

      const footerX = PADDING_X;
      const footerY = FOOTER_TOP;
      const footerW = CANVAS_WIDTH - PADDING_X * 2;
      const footerH = FOOTER_H;

      // Footer background
      ctx.fillStyle = "#FF9933";
      ctx.fillRect(footerX, footerY, footerW, footerH);

      // Circle images anchored inside footer
      const circleSize = 120;
      const circlePadding = 70;
      const circleCY = footerY + footerH / 2;
      const leftCX = footerX + circlePadding;
      const rightCX = footerX + footerW - circlePadding;

      drawCircleImage(ctx, seal, leftCX, circleCY, circleSize);
      drawCircleImage(ctx, guardian, rightCX, circleCY, circleSize);

      // Footer label centered
      ctx.save();
      ctx.fillStyle = "#fff";
      ctx.font = "16px 'Inter', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        "Ministry of Emotional Independence",
        CANVAS_WIDTH / 2,
        circleCY
      );
      ctx.restore();

      // -----------------------------
      // Signatures (below footer)
      // -----------------------------
      const sigY = footerY + footerH + 50;

      ctx.fillStyle = "#000";
      ctx.textBaseline = "alphabetic";

      ctx.textAlign = "left";
      ctx.font = "bold 18px 'Georgia', serif";
      ctx.fillText("नरेंद्र मोदी (सिंगल)", footerX, sigY);
      ctx.font = "16px 'Inter', sans-serif";
      ctx.fillText("अध्यक्ष, आत्मनिर्भर प्रेम प्रकोष्ठ", footerX, sigY + 24);

      ctx.textAlign = "right";
      ctx.font = "bold 18px 'Georgia', serif";
      ctx.fillText("राहुल गांधी (सिंगल)", footerX + footerW, sigY);
      ctx.font = "16px 'Inter', sans-serif";
      ctx.fillText("सचिव, अविवाहित कल्याण विभाग", footerX + footerW, sigY + 24);

      ctx.textAlign = "left";

      // -----------------------------
      // Metadata (bottom)
      // -----------------------------
      const metaY = sigY + 70;
      ctx.font = "16px 'Inter', sans-serif";
      ctx.fillText("जारी दिनांक: ______________", footerX, metaY);
      ctx.fillText("प्रमाण पत्र क्रमांक: AVCI-2026-457", footerX, metaY + 24);

      // Export
      const url = canvas.toDataURL("image/png");
      setCertificateUrl(url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 rounded border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="space-y-2 text-xs uppercase tracking-[0.3em] text-gray-600">
        <p>Fill in the details below to generate the ceremonial certificate</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.4em] text-[#FF9933]">
          Name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-black focus:border-[#FF9933] focus:outline-none"
            placeholder="Enter your full name"
          />
        </label>

        <label className="space-y-2 text-xs font-semibold uppercase tracking-[0.4em] text-[#FF9933]">
          Time Since Last Breakup (Optional)
          <input
            value={breakupTime}
            onChange={(event) => setBreakupTime(event.target.value)}
            className="w-full rounded border border-[#E5E7EB] bg-white px-3 py-2 text-sm text-black focus:border-[#FF9933] focus:outline-none"
            placeholder="e.g., 1 year, 5 months"
          />
        </label>
      </div>

      <button
        onClick={handleGenerate}
        className="w-full rounded border border-[#FF9933] bg-white px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-[#FF9933] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isGenerating}
      >
        {isGenerating ? "Generating certificate..." : "Generate Certificate"}
      </button>

      {certificateUrl && (
        <div className="space-y-4">
          <div className="rounded border border-[#FF9933] bg-[#fefaf8] p-4">
            <NextImage
              src={certificateUrl}
              alt="Generated certificate"
              width={1200}
              height={850}
              className="w-full rounded object-contain"
              unoptimized
            />
          </div>

          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
              Click below to download your certificate
            </p>
            <a
              href={certificateUrl}
              download={`avci-certificate-${name || "single"}.png`}
              className="rounded border border-[#FF9933] bg-[#FF9933] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-[#cc5900]"
            >
              Download Certificate
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
