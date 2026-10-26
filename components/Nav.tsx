"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { nav } from "@/lib/content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 400 && !open);
    setSolid(y > 80);
  });

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: 0.6, ease }}
      >
        <nav
          className={`flex w-full max-w-6xl items-center justify-between rounded-full border px-5 py-3 transition-[background-color,border-color,backdrop-filter] duration-500 ${
            solid || open
              ? "border-white/10 bg-ink/60 backdrop-blur-xl"
              : "border-transparent bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-baseline gap-2" aria-label="Kanestone home">
            <span className="font-display text-2xl leading-none">K</span>
            <span className="eyebrow hidden text-ivory/80 sm:inline">Kanestone</span>
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {nav.slice(0, 3).map((item) => (
              <li key={item.href}>
                <a href={item.href} className="group relative text-sm text-ivory/70 transition-colors hover:text-ivory">
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-champagne transition-transform duration-500 ease-lux group-hover:origin-left group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#enquire"
              className="hidden rounded-full bg-ivory px-5 py-2 text-sm font-medium text-ink transition-colors hover:bg-champagne sm:inline-block"
            >
              Enquire
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid size-10 place-items-center md:hidden"
            >
              <span className={`absolute h-px w-5 bg-ivory transition-transform duration-500 ease-lux ${open ? "rotate-45" : "-translate-y-1"}`} />
              <span className={`absolute h-px w-5 bg-ivory transition-transform duration-500 ease-lux ${open ? "-rotate-45" : "translate-y-1"}`} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-6 pb-12 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-2">
              {nav.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block font-display text-6xl"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.07 }}
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-12 text-mist">Bold · British · Bespoke</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
