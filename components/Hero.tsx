"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;
const words = ["Bold.", "British.", "Bespoke."];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // The film recedes into a framed plate as the page scrolls away.
  const inset = useTransform(scrollYProgress, [0, 0.6], reduce ? ["0%", "0%"] : ["0%", "7%"]);
  const radius = useTransform(scrollYProgress, [0, 0.6], reduce ? ["0px", "0px"] : ["0px", "28px"]);
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(${i} ${i} ${i} ${i} round ${r})`);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.15]);
  const titleY = useTransform(scrollYProgress, [0, 0.6], ["0%", reduce ? "0%" : "-40%"]);
  const fade = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[180svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.div className="absolute inset-0 overflow-hidden" style={{ clipPath }}>
          <motion.video
            className="size-full object-cover"
            style={{ scale: videoScale }}
            src="/media/film/hero.mp4"
            poster="/media/film/poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/10 to-ink/85" />
        </motion.div>

        <motion.div
          className="relative z-10 flex h-full flex-col justify-end px-4 pb-8 sm:px-8 sm:pb-10"
          style={{ y: titleY, opacity: fade }}
        >
          <motion.p
            className="eyebrow mb-6 text-ivory/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2, duration: 1 }}
          >
            A new perspective on luxury automotive solutions
          </motion.p>

          <h1 className="font-display text-[clamp(3.75rem,13.5vw,15rem)] leading-[0.86] tracking-[-0.02em]" aria-label="Bold. British. Bespoke.">
            {words.map((w, i) => (
              <span key={w} aria-hidden className="block overflow-hidden">
                <motion.span
                  className={`inline-block ${i === 1 ? "italic text-champagne" : ""} ${i === 2 ? "sm:pl-[18vw]" : ""}`}
                  initial={reduce ? false : { y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.3, ease, delay: 1.9 + i * 0.12 }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            className="mt-8 flex flex-col gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 1, ease }}
          >
            <div className="flex gap-3">
              <a href="#collection" className="rounded-full bg-ivory px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-champagne">
                The Collection
              </a>
              <a
                href="#film"
                className="group flex items-center gap-3 rounded-full border border-white/25 px-6 py-3 text-sm backdrop-blur-md transition-colors hover:border-ivory"
              >
                <span className="grid size-4 place-items-center">
                  <svg viewBox="0 0 10 12" className="w-2.5 fill-current"><path d="M0 0l10 6-10 6z" /></svg>
                </span>
                Watch the Film
              </a>
            </div>
            <dl className="eyebrow grid grid-cols-3 gap-6 text-ivory/60 sm:flex sm:gap-10">
              <div><dt className="text-ivory/35">Origin</dt><dd>Great Britain</dd></div>
              <div><dt className="text-ivory/35">Marques</dt><dd>04</dd></div>
              <div><dt className="text-ivory/35">Collection</dt><dd>08 Models</dd></div>
            </dl>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
