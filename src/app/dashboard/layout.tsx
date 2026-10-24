import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { requireSession } from "@/lib/server/session";
import { logout } from "@/app/login/actions";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s · Dashboard · Excellence Café" },
  robots: { index: false },
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await requireSession();

  return (
    <div className="min-h-screen bg-ivory text-espresso md:flex">
      <aside className="bg-espresso text-cream md:sticky md:top-0 md:flex md:h-screen md:w-60 md:shrink-0 md:flex-col">
        <div className="flex items-center justify-between gap-3 px-5 py-4 md:block md:py-6">
          <Link href="/dashboard" className="flex items-center gap-3 text-gold-200">
            <LogoMark className="h-7 w-auto" />
            <span>
              <span className="block font-display text-lg leading-tight text-ivory">
                Excellence Café
              </span>
              <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-gold-300">
                Dashboard
              </span>
            </span>
          </Link>
          <form action={logout} className="md:hidden">
            <button className="text-xs font-semibold text-cream/70 hover:text-ivory">Sign out</button>
          </form>
        </div>
        <DashboardNav />
        <div className="mt-auto hidden border-t border-white/10 px-5 py-5 text-sm md:block">
          <p className="truncate text-ivory">{session.name}</p>
          <p className="truncate text-xs text-cream/60">{session.email}</p>
          <div className="mt-4 flex gap-4 text-xs font-semibold">
            <Link href="/" className="text-gold-200 hover:text-ivory">
              View site ↗
            </Link>
            <form action={logout}>
              <button className="text-cream/70 hover:text-ivory">Sign out</button>
            </form>
          </div>
        </div>
      </aside>
      <main className="min-w-0 flex-1 px-4 py-8 sm:px-8 md:py-10">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
