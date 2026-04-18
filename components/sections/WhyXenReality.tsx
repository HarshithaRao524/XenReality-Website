"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

const STATS = [
  { value: 5,   prefix: "",  suffix: "",   label: "Market Sectors"        },
  { value: 3,   prefix: "",  suffix: "M+", label: "Training Data Points"  },
  { value: 90,  prefix: ">", suffix: "%",  label: "Base Accuracy"         },
  { value: 1,   prefix: "< ",suffix: "s",  label: "Inference Time"        },
  { value: 5,   prefix: "",  suffix: "X",  label: "Higher Efficiency"     },
];

function Counter({ value, prefix, suffix }: { value: number; prefix: string; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate(v: number) {
        el.textContent = prefix + Math.round(v) + suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-bold text-[#F58220]">
      {prefix}0{suffix}
    </span>
  );
}

export default function WhyXenReality() {
  return (
    <section className="bg-[#0a0a0a] py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-white text-center mb-16">
          Why choose XenReality?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-3">
              <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              <div className="w-12 h-px bg-gray-600" />
              <p className="text-sm text-gray-400 text-center leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
