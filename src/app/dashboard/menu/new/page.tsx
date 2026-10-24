import { prisma } from "@/lib/server/db";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { MenuItemForm } from "@/components/dashboard/MenuItemForm";

export const metadata = { title: "New item" };

export default async function NewMenuItemPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    select: { id: true, name: true },
  });

  return (
    <>
      <PageHeader title="New menu item" />
      <MenuItemForm
        categories={categories}
        item={{
          name: "",
          description: "",
          categoryId: categories.some((c) => c.id === category) ? category! : "",
          price: "",
          image: null,
          available: true,
          variants: [],
        }}
      />
    </>
  );
}
