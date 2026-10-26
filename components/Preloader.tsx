"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const KEY = "ks-intro-seen";

/** Monogram curtain shown once per session; skipped entirely for reduced motion. */
export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setShow(false), seen || reduce ? 0 : 1900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[70] grid place-items-center bg-ink"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex flex-col items-center gap-6">
            <div className="overflow-hidden">
              <motion.span
                className="block font-display text-[clamp(6rem,18vw,12rem)] leading-[0.85]"
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              >
                K
              </motion.span>
            </div>
            <motion.div
              className="h-px w-40 origin-left bg-champagne"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            />
            <motion.span
              className="eyebrow text-ivory/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Kanestone Limited
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
