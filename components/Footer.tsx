import { contact, marques, nav } from "@/lib/content";
import Logo from "./Logo";

export default function Footer() {
  const strip = [...marques, ...marques];

  return (
    <footer className="relative overflow-hidden border-t border-white/10 pt-10">
      <div className="flex w-max animate-[marquee_40s_linear_infinite] gap-16 pb-10" aria-hidden>
        {[...strip, ...strip].map((m, i) => (
          <span key={i} className="flex items-center gap-16 font-display text-4xl text-ivory/25 italic sm:text-5xl">
            {m}
            <span className="size-1.5 rounded-full bg-champagne/60" />
          </span>
        ))}
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo className="text-lg" />
          <p className="mt-4 max-w-sm text-ivory/55">A British luxury automotive company supplying prestigious vehicles to businesses and industry professionals.</p>
        </div>
        <nav aria-label="Footer">
          <p className="eyebrow mb-4 text-mist">Explore</p>
          <ul className="space-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="text-ivory/75 transition-colors hover:text-ivory">{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="eyebrow mb-4 text-mist">Enquiries</p>
          <a href={`mailto:${contact.email}`} className="text-ivory/75 transition-colors hover:text-ivory">{contact.email}</a>
        </div>
      </div>

      <p
        aria-hidden
        className="bg-[url(/media/film/poster.jpg)] bg-cover bg-center bg-clip-text px-2 text-center font-display text-mega leading-[0.78] tracking-[-0.03em] text-transparent select-none"
      >
        KANESTONE
      </p>

      <div className="eyebrow mx-auto flex max-w-7xl flex-col justify-between gap-2 px-4 py-6 text-ivory/35 sm:flex-row sm:px-8">
        <span>© {new Date().getFullYear()} Kanestone Limited. All rights reserved.</span>
        <span>Bold · British · Bespoke</span>
      </div>
    </footer>
  );
}
