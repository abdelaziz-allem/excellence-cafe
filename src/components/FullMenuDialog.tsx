"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { BookIcon, CloseIcon } from "./Icons";

// The printed menu, rendered page by page from public/menu/excellence-cafe-menu.pdf
// (phone browsers can't show a multi-page PDF inline, so the dialog shows images)
const PDF = "/menu/excellence-cafe-menu.pdf";
const pages = Array.from({ length: 9 }, (_, i) => `/menu/page-${i + 1}.webp`);

export function FullMenuDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    // Stop the page behind from scrolling while the menu is open
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-gold fixed right-4 bottom-4 z-40 rounded-full !px-6 shadow-[0_10px_30px_-8px_rgba(36,25,16,0.6)] sm:right-6 sm:bottom-6"
      >
        <BookIcon className="h-4 w-4" />
        Full Menu
      </button>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        // Clicking the backdrop (the dialog element itself) closes it
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        aria-label="Full menu"
        className="m-auto h-dvh max-h-none w-full max-w-none bg-transparent p-0 backdrop:bg-espresso/85 backdrop:backdrop-blur-sm sm:h-[94dvh] sm:max-w-3xl"
      >
        <div className="flex h-full flex-col overflow-hidden bg-espresso sm:rounded-lg">
          <div className="flex items-center justify-between gap-3 border-b border-gold/25 px-4 py-3 sm:px-6">
            <p className="font-display text-lg text-ivory">Full Menu</p>
            <div className="flex items-center gap-2">
              <a
                href={PDF}
                download="Excellence Café Menu.pdf"
                className="px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gold-200 hover:text-ivory"
              >
                Download PDF
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close full menu"
                className="grid h-9 w-9 place-items-center rounded-full text-gold-200 hover:bg-gold/20 hover:text-ivory"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain">
            {/* Only load the pages once the dialog has been opened */}
            {open && (
              <div className="mx-auto flex max-w-3xl flex-col gap-3 p-3 sm:gap-4 sm:p-4">
                {pages.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`Menu page ${i + 1}`}
                    width={1240}
                    height={1753}
                    sizes="(min-width: 768px) 736px, 100vw"
                    priority={i === 0}
                    className="h-auto w-full rounded-sm"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
