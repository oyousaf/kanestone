"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { lockScroll } from "@/lib/scroll";
import { SplitReveal } from "./ui/Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Film() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.25, 1]);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section id="film" className="px-4 pb-32 sm:px-8 sm:pb-48">
      <div className="mx-auto mb-12 flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow mb-4 text-champagne">A Short Film · 00:50</p>
          <SplitReveal text="Motion, in its purest form." className="font-display text-giant leading-[0.92]" />
        </div>
        <p className="max-w-xs text-ivory/60">
          Fifty seconds across the four marques that define British luxury — filmed for those who notice the detail.
        </p>
      </div>

      <motion.div ref={ref} style={{ scale }} className="mx-auto max-w-7xl">
        <motion.button
          layoutId="film-frame"
          type="button"
          onClick={() => setOpen(true)}
          className="group relative block aspect-[16/9] w-full overflow-hidden rounded-[28px] bg-ink-2 text-left"
          aria-label="Play the Kanestone film"
        >
          <motion.img
            src="/media/film/poster.jpg"
            alt=""
            style={{ scale: imgScale }}
            className="size-full object-cover transition-[filter] duration-700 group-hover:brightness-75"
          />
          <span className="absolute inset-0 grid place-items-center">
            <span className="relative grid size-24 place-items-center rounded-full border border-white/40 bg-white/10 backdrop-blur-md transition-transform duration-700 ease-lux group-hover:scale-110 sm:size-32">
              <svg viewBox="0 0 10 12" className="ml-1 w-4 fill-ivory sm:w-5"><path d="M0 0l10 6-10 6z" /></svg>
              <span className="absolute inset-0 animate-ping rounded-full border border-white/20 [animation-duration:2.4s]" />
            </span>
          </span>
          <span className="eyebrow absolute bottom-6 left-6 text-ivory/80">Play film</span>
          <span className="eyebrow absolute right-6 bottom-6 text-ivory/80">Sound on</span>
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-ink/95 p-4 backdrop-blur-xl sm:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Kanestone film"
          >
            <motion.div
              layoutId="film-frame"
              className="relative aspect-[16/9] w-full max-w-[min(100%,calc((100svh-5rem)*16/9))] overflow-hidden rounded-2xl bg-black"
              transition={{ duration: 0.8, ease }}
              onClick={(e) => e.stopPropagation()}
            >
              <video
                className="size-full"
                src="/media/film/film.mp4"
                poster="/media/film/poster.jpg"
                autoPlay
                controls
                playsInline
              />
            </motion.div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="eyebrow absolute top-6 right-6 rounded-full border border-white/20 px-4 py-2 text-ivory/80 hover:text-ivory"
            >
              Close ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
