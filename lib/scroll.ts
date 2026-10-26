import type Lenis from "lenis";

export const lenisRef: { current: Lenis | null } = { current: null };

/** Pause page scrolling while an overlay is open. */
export function lockScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (locked) lenisRef.current?.stop();
  else lenisRef.current?.start();
}
