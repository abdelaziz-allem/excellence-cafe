import { prisma } from "@/lib/server/db";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { CategoryRow, NewCategory } from "@/components/dashboard/CategoryForms";

export const metadata = { title: "Categories" };

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { items: true } } },
  });

  return (
    <>
      <PageHeader
        title="Categories"
        description="Sections of the menu page, in the order guests see them."
        actions={<NewCategory />}
      />
      <ul className="divide-y divide-sand overflow-hidden rounded-lg border border-sand bg-white">
        {categories.map((c, i) => (
          <CategoryRow
            key={c.id}
            category={{
              id: c.id,
              name: c.name,
              slug: c.slug,
              subtitle: c.subtitle ?? "",
              note: c.note ?? "",
              itemCount: c._count.items,
            }}
            isFirst={i === 0}
            isLast={i === categories.length - 1}
          />
        ))}
      </ul>
    </>
  );
}
