import { notFound } from "next/navigation";
import { prisma } from "@/lib/server/db";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { MenuItemForm } from "@/components/dashboard/MenuItemForm";

export const metadata = { title: "Edit item" };

export default async function EditMenuItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [item, categories] = await Promise.all([
    prisma.menuItem.findUnique({
      where: { id },
      include: { variants: { orderBy: { sortOrder: "asc" } } },
    }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" }, select: { id: true, name: true } }),
  ]);
  if (!item) notFound();

  return (
    <>
      <PageHeader title={item.name} description="Edit menu item" />
      <MenuItemForm
        categories={categories}
        item={{
          id: item.id,
          name: item.name,
          description: item.description ?? "",
          categoryId: item.categoryId,
          price: item.price?.toString() ?? "",
          image: item.image,
          available: item.available,
          variants: item.variants.map((v) => ({ name: v.name, price: v.price.toString() })),
        }}
      />
    </>
  );
}
