"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "motion/react";

function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const PARTICLE_COUNT = 55;
    const MAX_DIST = 140;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    type Particle = { x: number; y: number; vx: number; vy: number };
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200,210,255,0.7)";
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(160,180,255,${0.25 * (1 - dist / MAX_DIST)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  );
}

export default function ReadyToBusiness() {
  return (
    <section className="bg-[#060608] min-h-[520px] flex flex-col lg:flex-row">

      {/* Left — particle network + headline */}
      <div className="relative lg:w-1/2 flex items-center justify-center px-10 py-24 overflow-hidden min-h-[300px]">
        <ParticleNetwork />
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative z-10 text-3xl md:text-4xl font-semibold text-white text-center leading-snug max-w-sm"
        >
          Are You Ready to Accelerate Your Business?
        </motion.h2>
      </div>

      {/* Divider */}
      <div className="hidden lg:block w-px bg-gray-700/60 my-16" />

      {/* Right — text + CTA */}
      <div className="lg:w-1/2 flex items-center px-10 lg:px-16 py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const }}
          className="flex flex-col gap-8 max-w-lg"
        >
          <p className="text-gray-300 text-base md:text-lg leading-relaxed text-justify">
            Empower your organization to unlock the full potential of visual data
            and drive meaningful innovation. Our solutions are designed to transform
            how you work, enhancing efficiency and enabling smarter decisions. By
            integrating advanced AI-driven tools into your operations, you can achieve
            unparalleled accuracy, streamline complex processes, and position your
            business for long-term success.
          </p>
          <Link
            href="/contact"
            className="self-start inline-flex items-center justify-center bg-[#F58220] hover:bg-[#d96e10] text-white font-semibold px-8 py-4 rounded-lg transition-colors text-base"
          >
            Connect With Us Today
          </Link>
        </motion.div>
      </div>

    </section>
  );
}
