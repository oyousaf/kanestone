"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { pillars } from "@/lib/content";

function Card({
  pillar,
  index,
  total,
  progress,
}: {
  pillar: (typeof pillars)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each card recedes as the next one slides over it.
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - index - 1) * 0.05]);
  const dim = useTransform(progress, [start, start + 1 / total], [0, index < total - 1 ? 0.5 : 0]);
  const isMarques = pillar.word === "British";

  return (
    <div className="sticky top-0 flex h-svh items-start justify-center px-4 sm:px-8" style={{ paddingTop: `calc(9svh + ${index * 22}px)` }}>
      <motion.article
        style={{ scale }}
        className="relative grid h-[76svh] w-full max-w-7xl origin-top overflow-hidden rounded-[28px] border border-white/10 bg-ink-2 md:grid-cols-2"
      >
        <div className="flex flex-col justify-between p-7 sm:p-12">
          <p className="eyebrow flex items-center gap-3 text-mist">
            <span className="text-champagne">0{index + 1}</span> / 0{total}
          </p>
          <div>
            <h3 className="font-display text-[clamp(4rem,11vw,10rem)] leading-[0.85] capitalize italic">{pillar.word}</h3>
            <p className="mt-6 max-w-sm text-xl text-ivory/75 sm:text-2xl">{pillar.title}</p>
          </div>
        </div>
        <div className={`relative min-h-[34svh] ${isMarques ? "bg-black" : ""}`}>
          <Image
            src={pillar.image}
            alt={isMarques ? "Rolls-Royce, Land Rover, Bentley and Aston Martin marques" : ""}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className={isMarques ? "object-contain p-8 sm:p-14" : "object-cover"}
            quality={80}
          />
        </div>
        <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" />
      </motion.article>
    </div>
  );
}

export default function Pillars() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} className="relative">
      {pillars.map((p, i) => (
        <Card key={p.word} pillar={p} index={i} total={pillars.length} progress={scrollYProgress} />
      ))}
    </section>
  );
}
