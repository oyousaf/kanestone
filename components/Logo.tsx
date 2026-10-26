/** Kanestone lockup: Bodoni monogram, a champagne hairline and a spaced wordmark. */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`group/logo inline-flex items-center gap-3 font-logo text-ivory ${className}`}>
      <span className="text-[1.75em] leading-none [font-variation-settings:'opsz'_96]">K</span>
      <span className="h-[1.6em] w-px origin-center bg-champagne/60 transition-transform duration-700 ease-lux group-hover/logo:scale-y-125" />
      <span className="pt-[0.1em] text-[0.8em] font-medium tracking-[0.38em] uppercase [font-variation-settings:'opsz'_11]">
        Kanestone
      </span>
    </span>
  );
}
