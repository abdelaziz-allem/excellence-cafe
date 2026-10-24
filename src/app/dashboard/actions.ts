"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/server/db";
import { requireSession } from "@/lib/server/session";
import { MAX_UPLOAD_BYTES, deleteImage, isImageFile, uploadImage } from "@/lib/server/storage";

export type FormState = { error?: string; ok?: boolean };

// Public pages that render menu data
function revalidateMenu() {
  revalidatePath("/menu");
  revalidatePath("/");
  revalidatePath("/dashboard", "layout");
}

const text = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();

function parsePrice(raw: string) {
  const n = Number(raw);
  return raw !== "" && Number.isFinite(n) && n >= 0 ? Math.round(n * 100) / 100 : null;
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/* ---------------------------------- Items --------------------------------- */

export async function saveMenuItem(_: FormState, formData: FormData): Promise<FormState> {
  await requireSession();

  const id = text(formData, "id");
  const name = text(formData, "name");
  const categoryId = text(formData, "categoryId");
  const description = text(formData, "description") || null;
  const available = formData.get("available") === "on";
  const pricing = text(formData, "pricing");

  if (!name) return { error: "Name is required." };
  if (!categoryId) return { error: "Choose a category." };

  let price: number | null = null;
  let variants: { name: string; price: number; sortOrder: number }[] = [];

  if (pricing === "variants") {
    const names = formData.getAll("variantName").map((v) => String(v).trim());
    const prices = formData.getAll("variantPrice").map((v) => parsePrice(String(v).trim()));
    for (const [i, vName] of names.entries()) {
      if (!vName && prices[i] === null) continue; // blank row
      if (!vName) return { error: `Variant ${i + 1} needs a name.` };
      if (prices[i] === null) return { error: `Enter a valid price for “${vName}”.` };
      variants.push({ name: vName, price: prices[i]!, sortOrder: variants.length });
    }
    if (variants.length === 0) return { error: "Add at least one variant with a price." };
  } else {
    price = parsePrice(text(formData, "price"));
    if (price === null) return { error: "Enter a valid price." };
    variants = [];
  }

  const existing = id ? await prisma.menuItem.findUnique({ where: { id } }) : null;
  if (id && !existing) return { error: "This item no longer exists." };

  // Image: keep, replace with an upload, or remove
  let image = existing?.image ?? null;
  const file = formData.get("image");
  const upload = file instanceof File && file.size > 0 ? file : null;
  if (upload) {
    if (!isImageFile(upload)) return { error: "The photo must be an image file." };
    if (upload.size > MAX_UPLOAD_BYTES) return { error: "The photo must be under 8 MB." };
    try {
      image = await uploadImage(upload);
    } catch (error) {
      console.error("Error uploading file to DigitalOcean:", error);
      return { error: "Couldn't upload the photo. Please try again." };
    }
  } else if (formData.get("removeImage") === "on") {
    image = null;
  }

  const data = { name, description, price, image, available, categoryId };

  if (existing) {
    await prisma.$transaction([
      prisma.menuItemVariant.deleteMany({ where: { menuItemId: existing.id } }),
      prisma.menuItem.update({
        where: { id: existing.id },
        data: {
          ...data,
          // Moving to another category puts the item at the end of it
          ...(existing.categoryId !== categoryId && {
            sortOrder: await nextItemSortOrder(categoryId),
          }),
          variants: { create: variants },
        },
      }),
    ]);
    if (existing.image && existing.image !== image) await deleteImage(existing.image);
  } else {
    await prisma.menuItem.create({
      data: {
        ...data,
        sortOrder: await nextItemSortOrder(categoryId),
        variants: { create: variants },
      },
    });
  }

  revalidateMenu();
  redirect(`/dashboard/menu?category=${categoryId}`);
}

async function nextItemSortOrder(categoryId: string) {
  const last = await prisma.menuItem.findFirst({
    where: { categoryId },
    orderBy: { sortOrder: "desc" },
    select: { sortOrder: true },
  });
  return (last?.sortOrder ?? -1) + 1;
}

export async function deleteMenuItem(id: string) {
  await requireSession();
  const item = await prisma.menuItem.delete({ where: { id } }).catch(() => null);
  if (item) await deleteImage(item.image);
  revalidateMenu();
}

export async function setMenuItemAvailable(id: string, available: boolean) {
  await requireSession();
  await prisma.menuItem.update({ where: { id }, data: { available } });
  revalidateMenu();
}

export async function moveMenuItem(id: string, direction: "up" | "down") {
  await requireSession();
  const item = await prisma.menuItem.findUnique({ where: { id } });
  if (!item) return;
  const neighbour = await prisma.menuItem.findFirst({
    where: {
      categoryId: item.categoryId,
      sortOrder: direction === "up" ? { lt: item.sortOrder } : { gt: item.sortOrder },
    },
    orderBy: { sortOrder: direction === "up" ? "desc" : "asc" },
  });
  if (!neighbour) return;
  await prisma.$transaction([
    prisma.menuItem.update({ where: { id: item.id }, data: { sortOrder: neighbour.sortOrder } }),
    prisma.menuItem.update({ where: { id: neighbour.id }, data: { sortOrder: item.sortOrder } }),
  ]);
  revalidateMenu();
}

/* ------------------------------- Categories ------------------------------- */

export async function saveCategory(_: FormState, formData: FormData): Promise<FormState> {
  await requireSession();

  const id = text(formData, "id");
  const name = text(formData, "name");
  const subtitle = text(formData, "subtitle") || null;
  const note = text(formData, "note") || null;
  const slug = slugify(text(formData, "slug") || name);

  if (!name) return { error: "Name is required." };
  if (!slug) return { error: "The link name needs at least one letter or number." };

  const clash = await prisma.category.findUnique({ where: { slug } });
  if (clash && clash.id !== id) return { error: `Another category already uses “${slug}”.` };

  if (id) {
    await prisma.category.update({ where: { id }, data: { name, slug, subtitle, note } });
  } else {
    const last = await prisma.category.findFirst({ orderBy: { sortOrder: "desc" } });
    await prisma.category.create({
      data: { name, slug, subtitle, note, sortOrder: (last?.sortOrder ?? -1) + 1 },
    });
  }

  revalidateMenu();
  return { ok: true };
}

export async function deleteCategory(id: string): Promise<FormState> {
  await requireSession();
  const count = await prisma.menuItem.count({ where: { categoryId: id } });
  if (count > 0) {
    return { error: `Move or delete its ${count} item${count === 1 ? "" : "s"} first.` };
  }
  await prisma.category.delete({ where: { id } }).catch(() => null);
  revalidateMenu();
  return { ok: true };
}

export async function moveCategory(id: string, direction: "up" | "down") {
  await requireSession();
  const cat = await prisma.category.findUnique({ where: { id } });
  if (!cat) return;
  const neighbour = await prisma.category.findFirst({
    where: { sortOrder: direction === "up" ? { lt: cat.sortOrder } : { gt: cat.sortOrder } },
    orderBy: { sortOrder: direction === "up" ? "desc" : "asc" },
  });
  if (!neighbour) return;
  await prisma.$transaction([
    prisma.category.update({ where: { id: cat.id }, data: { sortOrder: neighbour.sortOrder } }),
    prisma.category.update({ where: { id: neighbour.id }, data: { sortOrder: cat.sortOrder } }),
  ]);
  revalidateMenu();
}
