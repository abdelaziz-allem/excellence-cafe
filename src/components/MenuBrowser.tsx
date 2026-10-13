"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatPrice, type MenuCategory } from "@/lib/data";
import { Ornament } from "./Ornament";
import { ClockIcon } from "./Icons";

const tagLabel: Record<string, string> = {
  signature: "Chef's signature",
  new: "New",
  vegetarian: "Vegetarian",
  spicy: "Spicy",
};

export function MenuBrowser({ categories }: { categories: MenuCategory[] }) {
  const [active, setActive] = useState(categories[0].id);
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

  // Keep the active tab visible in the horizontally scrolling bar on mobile
  useEffect(() => {
    const tab = tabsRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    tab?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [active]);

  return (
    <>
      <div className="sticky top-20 z-30 border-y border-gold/25 bg-ivory/95 backdrop-blur">
        <div
          ref={tabsRef}
          className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 [scrollbar-width:none] md:justify-center"
        >
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
                  <li key={item.name} className="flex gap-5">
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
                          {formatPrice(item.price)}
                        </span>
                      </div>
                      <p className="mt-1.5 font-serif text-lg leading-snug text-mocha">
                        {item.description}
                      </p>
                      {item.tags && (
                        <div className="mt-2.5 flex flex-wrap gap-2">
                          {item.tags.map((t) => (
                            <span
                              key={t}
                              className={`px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${
                                t === "signature"
                                  ? "bg-gold text-ivory"
                                  : "border border-gold/40 text-gold-700"
                              }`}
                            >
                              {tagLabel[t]}
                            </span>
                          ))}
                        </div>
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
