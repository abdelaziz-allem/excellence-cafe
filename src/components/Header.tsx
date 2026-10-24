"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/data";
import { Logo } from "./Logo";
import { OpenStatus } from "./OpenStatus";
import { ClockIcon, PhoneIcon } from "./Icons";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Top bar */}
      <div
        className={`hidden border-b border-gold/20 bg-espresso text-[0.7rem] tracking-[0.18em] text-cream/80 transition-all duration-500 md:block ${
          scrolled ? "-mt-10 opacity-0" : "h-10 opacity-100"
        }`}
      >
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-6 uppercase">
          <span className="flex items-center gap-2">
            <ClockIcon className="h-3.5 w-3.5 text-gold-300" />
            {site.hours.label}: {site.hours.open} – {site.hours.close}
          </span>
          <OpenStatus className="text-cream/90" />
          <a href={site.phoneHref} className="flex items-center gap-2 hover:text-gold-300">
            <PhoneIcon className="h-3.5 w-3.5 text-gold-300" />
            {site.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={`transition-all duration-500 ${
          solid
            ? "bg-ivory/95 shadow-[0_1px_0_rgba(184,134,43,0.25)] backdrop-blur"
            : "bg-gradient-to-b from-espresso/70 to-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Logo />

          <nav className="hidden items-center gap-9 lg:flex">
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative py-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] transition-colors ${
                    solid
                      ? active
                        ? "text-gold-600"
                        : "text-roast hover:text-gold-600"
                      : active
                        ? "text-gold-200"
                        : "text-ivory/90 hover:text-gold-200"
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-1/2 h-px -translate-x-1/2 bg-gold transition-all duration-300 ${
                      active ? "w-full" : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/reservations"
              className={`hidden sm:inline-flex ${solid ? "btn-gold" : "btn-outline text-gold-200"}`}
            >
              Reserve a Table
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className={`relative flex h-11 w-11 items-center justify-center lg:hidden ${
                solid ? "text-espresso" : "text-ivory"
              }`}
            >
              <span
                className={`absolute h-px w-6 bg-current transition-all duration-300 ${
                  menuOpen ? "rotate-45" : "-translate-y-2"
                }`}
              />
              <span
                className={`absolute h-px w-6 bg-current transition-opacity ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute h-px w-6 bg-current transition-all duration-300 ${
                  menuOpen ? "-rotate-45" : "translate-y-2"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`paper fixed inset-x-0 bottom-0 top-20 overflow-y-auto transition-all duration-500 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col items-center gap-7 px-6 pt-14 pb-10">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-display text-3xl text-espresso hover:text-gold-600"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/reservations" className="btn-gold mt-4">
            Reserve a Table
          </Link>
          <div className="mt-8 flex flex-col items-center gap-2 text-sm text-mocha">
            <OpenStatus />
            <a href={site.phoneHref} className="font-semibold tracking-widest text-gold-600">
              {site.phoneDisplay}
            </a>
            <span>
              {site.hours.label} · {site.hours.open} – {site.hours.close}
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
}
