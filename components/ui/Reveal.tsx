"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const tags = { h1: motion.h1, h2: motion.h2, h3: motion.h3, p: motion.p };

/**
 * Masked word-by-word reveal for display headings. The parent observes the
 * viewport: the words start clipped out of view, so they can't observe themselves.
 */
export function SplitReveal({
  text,
  className,
  delay = 0,
  as = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: keyof typeof tags;
}) {
  const reduce = useReducedMotion();
  const Tag = tags[as];
  const words = text.split(" ");
  const word: Variants = {
    hidden: { y: "110%" },
    show: (i: number) => ({ y: "0%", transition: { duration: 1.1, ease, delay: delay + i * 0.06 } }),
  };

  return (
    <Tag
      className={className}
      aria-label={text}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
    >
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span className="inline-block" variants={word} custom={i}>
            {w}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function FadeUp({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1, ease, delay }}
    >
      {children}
    </motion.div>
  );
}
