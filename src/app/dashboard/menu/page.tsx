import Image from "next/image";
import Link from "next/link";
import type { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/server/db";
import { itemPrice } from "@/lib/menu";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ItemRowActions } from "@/components/dashboard/ItemRowActions";

export const metadata = { title: "Menu items" };

type Search = { category?: string; q?: string; status?: string };

export default async function MenuItemsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const { category, q, status } = await searchParams;

  const where: Prisma.MenuItemWhereInput = {
    ...(category && { categoryId: category }),
    ...(q && { name: { contains: q, mode: "insensitive" } }),
    ...(status === "hidden" && { available: false }),
    ...(status === "no-photo" && { image: null }),
  };

  const [categories, items] = await Promise.all([
    prisma.category.findMany({
      orderBy: { sortOrder: "asc" },
      include: { _count: { select: { items: true } } },
    }),
    prisma.menuItem.findMany({
      where,
      orderBy: [{ category: { sortOrder: "asc" } }, { sortOrder: "asc" }],
      include: { category: true, variants: { orderBy: { sortOrder: "asc" } } },
    }),
  ]);

  const total = categories.reduce((n, c) => n + c._count.items, 0);
  // Reordering only makes sense within one unfiltered category
  const canReorder = Boolean(category) && !q && !status;
  const filterHref = (params: Search) => {
    const sp = new URLSearchParams(
      Object.entries({ category, q, status, ...params }).filter(([, v]) => v) as [string, string][],
    );
    return `/dashboard/menu${sp.size ? `?${sp}` : ""}`;
  };

  return (
    <>
      <PageHeader
        title="Menu items"
        description={`${total} items across ${categories.length} categories`}
        actions={
          <Link
            href={`/dashboard/menu/new${category ? `?category=${category}` : ""}`}
            className="dash-btn dash-btn-primary"
          >
            + New item
          </Link>
        }
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <form className="flex flex-1 gap-2" action="/dashboard/menu">
          {category && <input type="hidden" name="category" value={category} />}
          {status && <input type="hidden" name="status" value={status} />}
          <input
            name="q"
            defaultValue={q}
            placeholder="Search items…"
            className="dash-input max-w-xs"
            aria-label="Search items"
          />
          <button className="dash-btn">Search</button>
        </form>
        <div className="flex gap-1 text-sm">
          {[
            { value: undefined, label: "All" },
            { value: "hidden", label: "Hidden" },
            { value: "no-photo", label: "No photo" },
          ].map((s) => (
            <Link
              key={s.label}
              href={filterHref({ status: s.value })}
              className={`rounded-md px-3 py-1.5 ${
                status === s.value ? "bg-espresso text-ivory" : "text-mocha hover:bg-cream"
              }`}
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        <CategoryPill href={filterHref({ category: undefined })} active={!category}>
          All <span className="opacity-60">{total}</span>
        </CategoryPill>
        {categories.map((c) => (
          <CategoryPill key={c.id} href={filterHref({ category: c.id })} active={category === c.id}>
            {c.name} <span className="opacity-60">{c._count.items}</span>
          </CategoryPill>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="rounded-lg border border-dashed border-sand bg-white px-6 py-16 text-center text-mocha">
          No items match.
        </div>
      ) : (
        <ul className="divide-y divide-sand overflow-hidden rounded-lg border border-sand bg-white">
          {items.map((item, i) => (
            <li key={item.id} className="flex flex-wrap items-center gap-4 px-4 py-3 sm:flex-nowrap">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-cream">
                {item.image ? (
                  <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
                ) : (
                  <span className="flex h-full items-center justify-center text-[0.6rem] uppercase tracking-wider text-latte">
                    No photo
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/dashboard/menu/${item.id}`}
                  className="font-medium text-espresso hover:text-gold-700"
                >
                  {item.name}
                </Link>
                <p className="truncate text-xs text-mocha">
                  {item.category.name}
                  {item.variants.length > 0 && ` · ${item.variants.map((v) => v.name).join(" / ")}`}
                  {!item.available && <span className="ml-2 font-semibold text-red-700">Hidden</span>}
                </p>
              </div>
              <p className="w-28 text-right font-display text-gold-700 tabular-nums">
                {itemPrice({
                  price: item.price === null ? null : Number(item.price),
                  variants: item.variants.map((v) => ({ name: v.name, price: Number(v.price) })),
                })}
              </p>
              <ItemRowActions
                id={item.id}
                available={item.available}
                canMoveUp={canReorder && i > 0}
                canMoveDown={canReorder && i < items.length - 1}
              />
            </li>
          ))}
        </ul>
      )}
      {!canReorder && items.length > 1 && (
        <p className="mt-3 text-xs text-latte">Pick a single category to reorder its items.</p>
      )}
    </>
  );
}

function CategoryPill({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-sm ${
        active
          ? "border-gold bg-gold text-ivory"
          : "border-sand bg-white text-roast hover:border-gold-300"
      }`}
    >
      {children}
    </Link>
  );
}
