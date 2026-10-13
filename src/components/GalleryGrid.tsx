"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Photo = { src: string; alt: string; tall?: boolean };

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (d: number) =>
      setIndex((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setIndex(i)}
            className={`group relative mb-5 block w-full overflow-hidden break-inside-avoid ${
              p.tall ? "aspect-[3/4]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-espresso/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="font-serif text-lg text-ivory italic">{p.alt}</span>
            </div>
            <div className="pointer-events-none absolute inset-3 border border-gold-200/0 transition-colors duration-500 group-hover:border-gold-200/70" />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[index].alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-espresso/95 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="absolute top-6 right-6 text-3xl text-gold-200 hover:text-ivory"
          >
            ×
          </button>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
            className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center border border-gold/40 text-2xl text-gold-200 hover:bg-gold hover:text-espresso sm:left-8"
          >
            ‹
          </button>
          <figure
            className="relative h-[78vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[index].src}
              alt={photos[index].alt}
              fill
              sizes="90vw"
              className="object-contain"
            />
            <figcaption className="absolute -bottom-10 inset-x-0 text-center font-serif text-lg text-cream/80 italic">
              {photos[index].alt}
              <span className="ml-3 text-xs tracking-[0.3em] text-gold-300 not-italic">
                {index + 1} / {photos.length}
              </span>
            </figcaption>
          </figure>
          <button
            type="button"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
            className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center border border-gold/40 text-2xl text-gold-200 hover:bg-gold hover:text-espresso sm:right-8"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
