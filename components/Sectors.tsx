"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { sectors } from "@/lib/content";
import { SplitReveal } from "./ui/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Sectors() {
  const [active, setActive] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 28 });
  const y = useSpring(my, { stiffness: 220, damping: 28 });

  return (
    <section id="sectors" className="relative px-4 py-32 sm:px-8 sm:py-48">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow mb-4 text-champagne">Who we work with</p>
            <SplitReveal text="Trusted where it matters." className="font-display text-giant leading-[0.92]" />
          </div>
          <p className="max-w-md text-ivory/60 md:justify-self-end">
            Prestige vehicle supply for the industries that demand the very best — delivered with professionalism and absolute discretion.
          </p>
        </div>

        <ul
          className="relative border-t border-white/10"
          onPointerMove={(e) => {
            mx.set(e.clientX);
            my.set(e.clientY);
          }}
          onPointerLeave={() => setActive(null)}
        >
          {sectors.map((s, i) => (
            <li
              key={s.title}
              onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
              className="group relative border-b border-white/10"
            >
              <a href="#enquire" className="flex items-center gap-5 py-7 sm:gap-10 sm:py-9">
                <span className="w-8 shrink-0 font-mono text-xs text-mist">{String(i + 1).padStart(2, "0")}</span>
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl md:hidden">
                  <Image src={s.image} alt="" fill sizes="64px" className="object-cover grayscale" />
                </div>
                <div className="flex flex-1 flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="font-display text-2xl transition-all duration-700 ease-lux group-hover:translate-x-3 group-hover:italic sm:text-4xl lg:text-5xl">
                    {s.title}
                  </h3>
                  <p className="text-sm text-ivory/50 transition-colors group-hover:text-ivory/80">{s.line}</p>
                </div>
                <span className="hidden text-2xl text-champagne opacity-0 transition-all duration-500 group-hover:opacity-100 md:block">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-30 hidden md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <AnimatePresence mode="popLayout">
          {active !== null && (
            <motion.div
              key={active}
              className="relative h-60 w-80 overflow-hidden rounded-2xl"
              initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease }}
            >
              <Image src={sectors[active].image} alt="" fill sizes="320px" className="object-cover" />
              <div className="absolute inset-0 bg-ink/15" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
