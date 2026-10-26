"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { marques, vehicles, type Marque } from "@/lib/content";
import { selectVehicle } from "@/lib/enquiry";

const ease = [0.22, 1, 0.36, 1] as const;

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
}

export default function Collection() {
  const [filter, setFilter] = useState<Marque | "All">("All");
  const list = filter === "All" ? vehicles : vehicles.filter((v) => v.marque === filter);
  const desktop = useIsDesktop();

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [list.length, desktop]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const smoothX = useSpring(x, { stiffness: 120, damping: 30, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="relative bg-ivory text-ink"
      style={desktop ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div className={desktop ? "sticky top-0 flex h-svh flex-col overflow-hidden" : "py-24"}>
        <header className="flex flex-col gap-6 px-4 pt-24 pb-8 sm:px-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3 text-ink/50">The Collection</p>
            <h2 className="font-display text-[clamp(2.75rem,5.5vw,5.5rem)] leading-[0.9]">
              Eight icons. <span className="italic text-ink/40">One standard.</span>
            </h2>
          </div>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:justify-end md:px-0" role="tablist" aria-label="Filter by marque">
            {(["All", ...marques] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                aria-selected={filter === m}
                onClick={() => setFilter(m)}
                className="relative shrink-0 rounded-full border border-ink/15 px-4 py-2 text-sm transition-colors"
              >
                {filter === m && (
                  <motion.span layoutId="marque-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.5, ease }} />
                )}
                <span className={`relative ${filter === m ? "text-ivory" : "text-ink/70"}`}>{m}</span>
              </button>
            ))}
          </div>
        </header>

        <div className={desktop ? "flex flex-1 items-center" : "mt-10 overflow-x-auto [scrollbar-width:none] snap-x snap-mandatory"}>
          <motion.div
            ref={trackRef}
            style={desktop ? { x: smoothX } : undefined}
            className="flex w-max gap-4 px-4 sm:gap-6 sm:px-8"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map((v, i) => (
                <motion.article
                  key={v.slug}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7, ease }}
                  className="group relative flex h-[58svh] max-h-[620px] min-h-[400px] w-[84vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[24px] bg-ivory-2 p-6 sm:w-[60vw] sm:p-8 md:w-[46vw] lg:w-[38vw]"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="eyebrow text-ink/50">{v.marque}</p>
                      <h3 className="mt-2 font-display text-5xl leading-none sm:text-6xl">{v.model}</h3>
                    </div>
                    <span className="font-mono text-xs text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                  </div>

                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display text-[11vw] leading-none whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgb(10_10_11/0.08)] md:text-[7vw]"
                  >
                    {v.model}
                  </span>

                  <div className="relative -mx-4 flex-1">
                    <Image
                      src={v.image}
                      alt={`${v.marque} ${v.model}`}
                      fill
                      sizes="(min-width: 1024px) 38vw, (min-width: 768px) 46vw, 84vw"
                      className="object-contain mix-blend-multiply transition-transform duration-[1.2s] ease-lux group-hover:scale-[1.04] group-hover:-translate-x-2"
                      quality={80}
                    />
                  </div>

                  <div className="flex items-center justify-between border-t border-ink/10 pt-4">
                    <span className="text-sm text-ink/60">{v.body}</span>
                    <a
                      href="#enquire"
                      onClick={() => selectVehicle(`${v.marque} ${v.model}`)}
                      className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm text-ivory transition-colors hover:bg-racing"
                    >
                      Enquire
                      <span className="transition-transform duration-500 group-hover:translate-x-0.5">→</span>
                    </a>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

        {desktop && (
          <div className="mx-8 mb-8 h-px bg-ink/10">
            <motion.div className="h-px bg-ink" style={{ width: bar }} />
          </div>
        )}
      </div>
    </section>
  );
}
