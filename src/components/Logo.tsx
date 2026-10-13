import Link from "next/link";

// Cup-with-cutlery mark redrawn from the brand logo. Replace with the official SVG when available.
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 48" fill="none" className={className} aria-hidden>
      <path
        d="M28 6c-2 3 2 5 0 8M34 4c-2 3 2 5 0 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 20h32v4c0 9-7 16-16 16s-16-7-16-16v-4Z"
        fill="currentColor"
      />
      <path
        d="M50 23h3a5 5 0 0 1 0 10h-4"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M6 44c14 4 38 4 52 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 14v8a3 3 0 0 0 3 3v14M6 14v6M12 14v6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <ellipse cx="59" cy="18" rx="3" ry="5" fill="currentColor" />
      <path d="M59 23v16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({
  light = false,
  className = "",
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Excellence Café — home"
      className={`group inline-flex items-center gap-3 ${className}`}
    >
      <LogoMark
        className={`h-9 w-12 shrink-0 ${light ? "text-gold-300" : "text-gold"}`}
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.65rem] font-bold italic tracking-tight ${
            light ? "text-gold-200" : "text-gilded"
          }`}
        >
          Excellence
        </span>
        <span
          className={`mt-1 flex items-center gap-2 text-[0.6rem] font-semibold uppercase tracking-[0.4em] ${
            light ? "text-gold-200/80" : "text-gold-600"
          }`}
        >
          <span className="h-px w-5 bg-current opacity-60" />
          Café
          <span className="h-px w-5 bg-current opacity-60" />
        </span>
      </span>
    </Link>
  );
}
