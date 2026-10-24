"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/menu", label: "Menu items" },
  { href: "/dashboard/categories", label: "Categories" },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:px-3 md:pb-0">
      {links.map((l) => {
        const active = l.href === "/dashboard" ? pathname === l.href : pathname.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={`shrink-0 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              active ? "bg-gold/20 text-gold-200" : "text-cream/75 hover:bg-white/5 hover:text-ivory"
            }`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
