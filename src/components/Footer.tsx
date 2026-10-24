import Link from "next/link";
import { nav, site } from "@/lib/data";
import { Logo } from "./Logo";
import { Ornament } from "./Ornament";
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  PhoneIcon,
  PinIcon,
  TikTokIcon,
} from "./Icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-espresso text-cream/75">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="flex flex-col items-center text-center">
          <Logo className="h-28" />
          <p className="mt-6 max-w-md font-serif text-xl italic text-cream/70">
            “{site.tagline}.”
          </p>
          <Ornament className="mt-8" width="w-24" />
        </div>

        <div className="mt-16 grid gap-12 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="eyebrow !text-gold-300">Visit</h3>
            <p className="mt-5 flex gap-3 leading-relaxed">
              <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
              </span>
            </p>
          </div>
          <div>
            <h3 className="eyebrow !text-gold-300">Hours</h3>
            <p className="mt-5 flex gap-3 leading-relaxed">
              <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
              <span>
                {site.hours.label}
                <br />
                {site.hours.open} – {site.hours.close}
              </span>
            </p>
            <p className="mt-3 pl-7 text-xs text-gold-200/80">
              Breakfast deal · 7:30 – 9:30 AM
            </p>
          </div>
          <div>
            <h3 className="eyebrow !text-gold-300">Contact</h3>
            <a
              href={site.phoneHref}
              className="mt-5 flex gap-3 hover:text-gold-200"
            >
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
              {site.phoneDisplay}
            </a>
            <div className="mt-6 flex gap-3">
              {[
                { href: site.socials.instagram, Icon: InstagramIcon, label: "Instagram" },
                { href: site.socials.facebook, Icon: FacebookIcon, label: "Facebook" },
                { href: site.socials.tiktok, Icon: TikTokIcon, label: "TikTok" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center border border-gold/40 text-gold-200 transition-colors hover:bg-gold hover:text-espresso"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="eyebrow !text-gold-300">Explore</h3>
            <ul className="mt-5 grid grid-cols-2 gap-y-2.5">
              {[...nav, { href: "/reservations", label: "Reservations" }].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-gold-200">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-gold/15 pt-8 text-xs tracking-wider text-cream/45 sm:flex-row">
          <p>© {new Date().getFullYear()} Excellence Café · Hargeisa</p>
          <p className="font-serif text-sm italic">Ku soo dhowow — you are always welcome.</p>
        </div>
      </div>
    </footer>
  );
}
