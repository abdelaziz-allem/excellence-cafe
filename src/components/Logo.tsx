import Image from "next/image";
import Link from "next/link";

// Cup-with-cutlery mark cropped from the official logo (public/brand/logo.png)
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/brand/logo-mark.png"
      alt=""
      width={282}
      height={151}
      className={`object-contain ${className}`}
      aria-hidden
    />
  );
}

export function Logo({ className = "h-16" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Excellence Café — home" className="inline-flex shrink-0">
      <Image
        src="/brand/logo.png"
        alt="Excellence Café"
        width={370}
        height={271}
        priority
        className={`w-auto ${className}`}
      />
    </Link>
  );
}
