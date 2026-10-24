import Link from "next/link";
import { prisma } from "@/lib/server/db";
import { getSession } from "@/lib/server/session";
import { PageHeader } from "@/components/dashboard/PageHeader";

export default async function DashboardHome() {
  const [session, categories, items, hidden, withoutPhoto] = await Promise.all([
    getSession(),
    prisma.category.count(),
    prisma.menuItem.count(),
    prisma.menuItem.count({ where: { available: false } }),
    prisma.menuItem.count({ where: { image: null } }),
  ]);

  const stats = [
    { label: "Menu items", value: items, href: "/dashboard/menu" },
    { label: "Categories", value: categories, href: "/dashboard/categories" },
    { label: "Hidden from menu", value: hidden, href: "/dashboard/menu?status=hidden" },
    { label: "Missing a photo", value: withoutPhoto, href: "/dashboard/menu?status=no-photo" },
  ];

  return (
    <>
      <PageHeader
        title={`Welcome back${session ? `, ${session.name}` : ""}`}
        description="Manage what guests see on the menu page."
        actions={
          <Link href="/dashboard/menu/new" className="dash-btn dash-btn-primary">
            + New item
          </Link>
        }
      />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-lg border border-sand bg-white p-5 transition-colors hover:border-gold-300"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-mocha">{s.label}</p>
            <p className="mt-2 font-display text-3xl text-espresso tabular-nums">{s.value}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
