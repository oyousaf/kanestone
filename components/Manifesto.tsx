"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { founderQuote } from "@/lib/content";
import { FadeUp } from "./ui/Reveal";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const [lead, ...rest] = founderQuote;
  const words = lead.split(" ");

  return (
    <section className="relative px-4 py-32 sm:px-8 sm:py-48">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow mb-10 flex items-center gap-4 text-champagne">
          <span className="h-px w-10 bg-champagne" /> The Founder
        </p>
        <p ref={ref} className="font-display text-[clamp(1.75rem,3.8vw,3.5rem)] leading-[1.15] tracking-[-0.01em]">
          <span className="text-champagne">“</span>
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </p>

        <div className="mt-20 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-12">
          <FadeUp className="md:col-span-3">
            <p className="eyebrow text-mist">Est. Great Britain</p>
          </FadeUp>
          {rest.map((para, i) => (
            <FadeUp key={i} delay={0.1 * i} className="text-pretty text-lg leading-relaxed text-ivory/70 md:col-span-4">
              <p>{para}{i === rest.length - 1 && "”"}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
