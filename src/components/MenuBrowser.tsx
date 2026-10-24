"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { itemPrice, type PublicMenuCategory } from "@/lib/menu";
import { Ornament } from "./Ornament";
import { ChevronIcon, ClockIcon } from "./Icons";

export function MenuBrowser({ categories }: { categories: PublicMenuCategory[] }) {
  const [active, setActive] = useState(categories[0]?.id ?? "");
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-180px 0px -55% 0px" },
    );
    categories.forEach((c) => {
      const el = document.getElementById(c.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [categories]);

  // Show an arrow on each side that has tabs scrolled out of view
  const [canScroll, setCanScroll] = useState({ left: false, right: false });
  const updateArrows = useCallback(() => {
    const el = tabsRef.current;
    if (!el) return;
    setCanScroll({
      left: el.scrollLeft > 1,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1,
    });
  }, []);

  useEffect(() => {
    const el = tabsRef.current;
    if (!el) return;
    updateArrows();
    const observer = new ResizeObserver(updateArrows);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateArrows]);

  const scrollTabs = (dir: 1 | -1) => {
    const el = tabsRef.current;
    el?.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: "smooth" });
  };

  // Keep the active tab visible in the horizontally scrolling bar
  useEffect(() => {
    const tab = tabsRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    tab?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <>
      <div className="sticky top-20 z-30 border-y border-gold/25 bg-ivory/95 backdrop-blur">
        <div className="relative mx-auto max-w-7xl">
          <div
            ref={tabsRef}
            onScroll={updateArrows}
            className="flex overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {/* mx-auto centres the tabs when they all fit, without clipping the start when they don't */}
            <div className="mx-auto flex gap-1">
              {categories.map((c) => (
                <a
                  key={c.id}
                  data-id={c.id}
                  href={`#${c.id}`}
                  className={`relative shrink-0 px-5 py-5 text-[0.7rem] font-semibold uppercase tracking-[0.24em] transition-colors ${
                    active === c.id ? "text-gold-600" : "text-mocha hover:text-gold-600"
                  }`}
                >
                  {c.title}
                  <span
                    className={`absolute inset-x-5 bottom-0 h-0.5 bg-gold transition-transform duration-300 ${
                      active === c.id ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              ))}
            </div>
          </div>

          {canScroll.left && (
            <button
              type="button"
              onClick={() => scrollTabs(-1)}
              aria-label="Previous categories"
              className="absolute inset-y-0 left-0 hidden lg:flex w-14 items-center justify-start bg-gradient-to-r from-ivory from-50% to-transparent pl-2 text-mocha hover:text-gold-600"
            >
              <ChevronIcon className="h-5 w-5 rotate-180" />
            </button>
          )}
          {canScroll.right && (
            <button
              type="button"
              onClick={() => scrollTabs(1)}
              aria-label="More categories"
              className="absolute inset-y-0 right-0 hidden lg:flex w-14 items-center justify-end bg-gradient-to-l from-ivory from-50% to-transparent pr-2 text-mocha hover:text-gold-600"
            >
              <ChevronIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="paper">
        {categories.map((cat, ci) => (
          <section
            key={cat.id}
            id={cat.id}
            className={`scroll-mt-40 py-24 ${ci % 2 ? "bg-cream/60" : ""}`}
          >
            <div className="mx-auto max-w-6xl px-6">
              <div className="text-center">
                <p className="eyebrow">{String(ci + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 font-display text-4xl text-espresso md:text-5xl">
                  {cat.title}
                </h2>
                <p className="mt-3 font-serif text-xl italic text-mocha">{cat.subtitle}</p>
                <Ornament className="mt-6" width="w-14" />
                {cat.note && (
                  <p className="mx-auto mt-8 inline-flex items-center gap-3 rounded-full border border-gold/50 bg-gold-50 px-6 py-2.5 text-sm text-gold-700">
                    <ClockIcon className="h-4 w-4" />
                    {cat.note}
                  </p>
                )}
              </div>

              <ul className="mt-16 grid gap-x-16 gap-y-10 md:grid-cols-2">
                {cat.items.map((item) => (
                  <li key={item.id} className="flex gap-5">
                    {item.image && (
                      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-gold/40 p-1">
                        <div className="relative h-full w-full overflow-hidden rounded-full">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex-1 pt-2">
                      <div className="flex items-baseline">
                        <h3 className="font-display text-xl text-espresso">{item.name}</h3>
                        <span className="menu-leader" />
                        <span className="font-display text-xl text-gold-600">
                          {itemPrice(item)}
                        </span>
                      </div>
                      {item.variants.length > 0 && (
                        <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-latte">
                          {item.variants.map((v) => v.name).join(" / ")}
                        </p>
                      )}
                      {item.description && (
                        <p className="mt-1.5 font-serif text-lg leading-snug text-mocha">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}

        <p className="mx-auto max-w-2xl px-6 pb-20 text-center text-sm text-latte">
          Prices in US dollars. Please let our team know about any allergies or
          dietary requirements — we are always happy to help.
        </p>
      </div>
    </>
  );
}
