"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import Link from "next/link";

// ── Canvas helper: rounded rect path ─────────────────────────────────────────

function rr(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y,     x + w, y + r,     r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x,     y + h, x,     y + h - r, r);
  ctx.lineTo(x,     y + r);
  ctx.arcTo(x,     y,     x + r, y,         r);
  ctx.closePath();
}

// ── Vision AI live canvas ─────────────────────────────────────────────────────

function VisionCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    function resize() {
      if (!canvas) return;
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    type Person = {
      x: number; y: number;
      vx: number; vy: number;
      id: number; conf: number;
    };

    function makePersons(): Person[] {
      const W = canvas!.width, H = canvas!.height;
      return [
        { x: W * 0.25, y: H * 0.38, vx:  0.45, vy:  0.25, id: 1, conf: 0.97 },
        { x: W * 0.55, y: H * 0.62, vx: -0.35, vy:  0.38, id: 2, conf: 0.94 },
        { x: W * 0.18, y: H * 0.70, vx:  0.28, vy: -0.30, id: 3, conf: 0.91 },
      ];
    }

    resize();
    let persons = makePersons();

    function onResize() {
      resize();
      persons = makePersons();
    }
    window.addEventListener("resize", onResize);

    const getZone = () => ({
      x: canvas!.width  * 0.56,
      y: canvas!.height * 0.12,
      w: canvas!.width  * 0.38,
      h: canvas!.height * 0.58,
    });

    let frame = 0;

    function draw() {
      if (!canvas || !ctx) return;
      const W = canvas.width, H = canvas.height;
      const zone = getZone();
      frame++;

      // Background
      ctx.fillStyle = "#0d1520";
      ctx.fillRect(0, 0, W, H);

      // Grid
      ctx.strokeStyle = "rgba(100,130,180,0.07)";
      ctx.lineWidth = 1;
      const gs = Math.max(30, Math.round(W / 16));
      for (let x = 0; x <= W; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y <= H; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }

      // Restricted zone
      const inZone = persons.filter(
        p => p.x > zone.x && p.x < zone.x + zone.w && p.y > zone.y && p.y < zone.y + zone.h
      );
      const alert = inZone.length > 0;
      const pulse = alert ? 0.55 + 0.3 * Math.sin(frame * 0.09) : 0.55;

      ctx.save();
      ctx.strokeStyle = alert ? `rgba(255,75,55,${pulse})` : `rgba(255,175,45,${pulse})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([8, 5]);
      ctx.strokeRect(zone.x, zone.y, zone.w, zone.h);
      ctx.setLineDash([]);
      ctx.fillStyle = alert ? `rgba(255,60,40,0.06)` : "rgba(255,175,45,0.04)";
      ctx.fillRect(zone.x, zone.y, zone.w, zone.h);
      ctx.restore();

      ctx.font = "bold 8px ui-monospace, monospace";
      ctx.fillStyle = alert ? "rgba(255,100,80,0.9)" : "rgba(255,175,45,0.8)";
      ctx.fillText("RESTRICTED ZONE", zone.x + 8, zone.y + 14);

      // Heatmap blobs
      for (const [hx, hy, hr] of [
        [W * 0.28, H * 0.45, 55] as [number, number, number],
        [W * 0.20, H * 0.70, 38] as [number, number, number],
      ]) {
        const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, hr);
        g.addColorStop(0, "rgba(0,174,239,0.10)");
        g.addColorStop(1, "rgba(0,174,239,0)");
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(hx, hy, hr, 0, Math.PI * 2); ctx.fill();
      }

      // Persons
      for (const p of persons) {
        p.x += p.vx; p.y += p.vy;
        const pad = 40;
        if (p.x < pad || p.x > W - pad) p.vx *= -1;
        if (p.y < pad || p.y > H - pad) p.vy *= -1;

        const inZ = p.x > zone.x && p.x < zone.x + zone.w && p.y > zone.y && p.y < zone.y + zone.h;
        const col = inZ ? "255,75,55" : "0,174,239";

        // Glow
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 30);
        glow.addColorStop(0, `rgba(${col},0.18)`);
        glow.addColorStop(1, `rgba(${col},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath(); ctx.arc(p.x, p.y, 30, 0, Math.PI * 2); ctx.fill();

        // Person dot (top-down)
        ctx.fillStyle = `rgba(${col},0.9)`;
        ctx.beginPath(); ctx.arc(p.x, p.y, 10, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.65)";
        ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, Math.PI * 2); ctx.fill();

        // Bounding box (corner brackets)
        const bx = p.x - 24, by = p.y - 32, bw = 48, bh = 62, cs = 9;
        ctx.strokeStyle = `rgba(${col},0.85)`;
        ctx.lineWidth = 1.8;
        const corner = (ox: number, oy: number, dx: number, dy: number) => {
          ctx.beginPath();
          ctx.moveTo(ox, oy + dy * cs);
          ctx.lineTo(ox, oy);
          ctx.lineTo(ox + dx * cs, oy);
          ctx.stroke();
        };
        corner(bx,      by,      1, 1);
        corner(bx + bw, by,     -1, 1);
        corner(bx,      by + bh, 1, -1);
        corner(bx + bw, by + bh,-1, -1);

        // Label
        ctx.font = "bold 8.5px ui-monospace, monospace";
        const lbl = `Person  ${p.conf.toFixed(2)}`;
        const tw = ctx.measureText(lbl).width + 10;
        ctx.fillStyle = inZ ? "rgba(190,35,25,0.9)" : "rgba(0,55,135,0.9)";
        rr(ctx, bx, by - 19, tw, 15, 3);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.95)";
        ctx.fillText(lbl, bx + 5, by - 7);
      }

      // ── HUD: CAM label ──
      ctx.fillStyle = "rgba(0,0,0,0.58)";
      rr(ctx, 10, 10, 70, 18, 3); ctx.fill();
      ctx.fillStyle = "rgba(0,174,239,0.9)";
      ctx.font = "bold 8.5px ui-monospace, monospace";
      ctx.fillText("● CAM 01", 16, 22);

      // ── HUD: LIVE ──
      ctx.fillStyle = "rgba(0,0,0,0.58)";
      rr(ctx, W - 54, 10, 44, 18, 3); ctx.fill();
      ctx.fillStyle = frame % 50 < 35 ? "#ff4040" : "#ff9090";
      ctx.beginPath(); ctx.arc(W - 45, 19, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "bold 8.5px ui-monospace, monospace";
      ctx.fillText("LIVE", W - 38, 22);

      // ── HUD: Alert badge (centre top) ──
      if (alert) {
        const ap = 0.85 + 0.15 * Math.sin(frame * 0.13);
        ctx.fillStyle = `rgba(190,30,20,${ap})`;
        rr(ctx, W / 2 - 80, 10, 160, 18, 3); ctx.fill();
        ctx.fillStyle = "white";
        ctx.font = "bold 8.5px ui-monospace, monospace";
        ctx.textAlign = "center";
        ctx.fillText("⚠  ZONE BREACH DETECTED", W / 2, 22);
        ctx.textAlign = "left";
      }

      // ── Bottom stats bar ──
      ctx.fillStyle = "rgba(0,0,0,0.68)";
      ctx.fillRect(0, H - 26, W, 26);

      ctx.font = "7.5px ui-monospace, monospace";
      ctx.fillStyle = "rgba(0,174,239,0.95)";
      ctx.fillText(`${persons.length} PERSONS`, 12, H - 9);

      ctx.fillStyle = alert ? "rgba(255,90,70,0.95)" : "rgba(80,210,130,0.95)";
      ctx.fillText(alert ? "⚠  ZONE ALERT" : "✓  ZONES CLEAR", W / 2 - 38, H - 9);

      const ts = new Date().toTimeString().slice(0, 8);
      ctx.fillStyle = "rgba(130,155,200,0.75)";
      ctx.fillText(ts, W - 55, H - 9);

      // Scan line
      const scanY = (frame * 1.2) % H;
      ctx.fillStyle = "rgba(0,174,239,0.035)";
      ctx.fillRect(0, scanY, W, 2);

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// ── Hero ───────────────────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  return (
    <section className="relative h-screen bg-gray-950 overflow-x-clip flex flex-col lg:flex-row">

      {/* ── LEFT: text ───────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full lg:w-[45%] flex flex-col justify-center px-12 lg:px-24 pt-16 pb-8 tracking-[-0.08px]">
        <motion.h1
          custom={0} variants={fadeUp} initial="hidden" animate="visible"
          className="text-[42px] font-medium leading-[50px] tracking-[-0.84px] text-white mb-5"
        >
          Vision AI Solutions for<br />Industrial Automation
        </motion.h1>
        <motion.p
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="text-base text-gray-400 mb-8 whitespace-nowrap"
        >
          Automate workflows using advanced computer vision.
        </motion.p>
        <motion.div
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-row items-center justify-center gap-4"
        >
          <Link
            href="#contact"
            className="inline-flex items-center justify-center bg-gradient-to-r from-[#2E3192] to-[#00AEEF] hover:opacity-90 text-white font-semibold text-base px-10 py-4 rounded-[40px] tracking-[-0.08px] transition-opacity"
          >
            Get started
          </Link>
        </motion.div>
      </div>

      {/* ── RIGHT: Vision AI canvas ───────────────────────────────────────── */}
      <div className="relative w-full h-80 lg:h-full lg:w-[55%]">

        {/* Desktop frame */}
        <div className="hidden lg:block absolute left-6 right-12 top-24 bottom-10 z-10">
          <div className="absolute -top-2.5 -left-2.5  w-10 h-10 border-t-2 border-l-2 border-blue-400 pointer-events-none z-10" />
          <div className="absolute -top-2.5 -right-2.5 w-10 h-10 border-t-2 border-r-2 border-blue-400 pointer-events-none z-10" />
          <div className="absolute -bottom-2.5 -left-2.5  w-10 h-10 border-b-2 border-l-2 border-blue-400 pointer-events-none z-10" />
          <div className="absolute -bottom-2.5 -right-2.5 w-10 h-10 border-b-2 border-r-2 border-blue-400 pointer-events-none z-10" />
          <div className="w-full h-full rounded-[20px] border border-gray-700 shadow-2xl overflow-hidden">
            <VisionCanvas />
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden relative z-10 h-full p-6">
          <div className="w-full h-full rounded-2xl border border-gray-700 overflow-hidden">
            <VisionCanvas />
          </div>
        </div>

      </div>
    </section>
  );
}
