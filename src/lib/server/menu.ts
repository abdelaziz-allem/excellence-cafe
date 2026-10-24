import "server-only";
import { prisma } from "./db";
import type { PublicMenuCategory } from "@/lib/menu";

export async function getPublicMenu(): Promise<PublicMenuCategory[]> {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      items: {
        where: { available: true },
        orderBy: { sortOrder: "asc" },
        include: { variants: { orderBy: { sortOrder: "asc" } } },
      },
    },
  });

  return categories
    .filter((c) => c.items.length > 0)
    .map((c) => ({
      id: c.slug,
      title: c.name,
      subtitle: c.subtitle,
      note: c.note,
      items: c.items.map((i) => ({
        id: i.id,
        name: i.name,
        description: i.description,
        price: i.price === null ? null : Number(i.price),
        image: i.image,
        variants: i.variants.map((v) => ({ name: v.name, price: Number(v.price) })),
      })),
    }));
}
