import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import data from "./menu.json";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

type RawItem = {
  name: string;
  price: number | Record<string, number>;
  sauces?: string[];
};

// Subtitles and notes carried over from the original static menu
const extras: Record<string, { subtitle?: string; note?: string }> = {
  Breakfast: {
    subtitle: "Served daily 7:30 – 11:30 AM",
    note: "20% off the entire breakfast menu between 7:30 and 9:30 AM",
  },
  "Main Courses": { subtitle: "From the grill and the kitchen" },
  Burgers: { subtitle: "Flame-grilled to order" },
  Pizza: { subtitle: "Stone-baked" },
  Salads: { subtitle: "Light, fresh, generous" },
  "Fresh Juices": { subtitle: "Pressed fresh every morning" },
  "Hot Coffee": { subtitle: "Ethiopian highland beans, roasted for us" },
  Dessert: { subtitle: "Made in-house daily" },
};

// Top-level groups in menu.json that are drinks; they go after the food
const drinks = new Set([
  "Fresh Juices",
  "Mojitos",
  "Milkshakes",
  "Smoothies",
  "Healthy Booster",
  "Coffee & Tea",
]);

// Words that should stay upper case when title-casing the printed menu
const keepUpper = new Set(["BBQ", "4PCS", "2PCS"]);

function titleCase(s: string) {
  return s
    .toLowerCase()
    .replace(/(^|[\s(\-/&,])([a-z])/g, (_, sep, c) => sep + c.toUpperCase())
    .split(" ")
    .map((w) => (keepUpper.has(w.toUpperCase()) ? w.toUpperCase() : w))
    .join(" ");
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

async function seedAdmin() {
  const email = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error("Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env");
  }
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { name: "Admin", email, password: await bcrypt.hash(password, 10) },
  });
  console.log(`Admin user: ${email}`);
}

async function seedMenu() {
  // Flatten nested groups ("Coffee & Tea" → Iced Coffee, Hot Coffee, …)
  // and list drinks last
  const food: [string, RawItem[]][] = [];
  const drink: [string, RawItem[]][] = [];
  for (const [name, value] of Object.entries(data.menu)) {
    const list = drinks.has(name) ? drink : food;
    if (Array.isArray(value)) list.push([name, value as RawItem[]]);
    else
      for (const [sub, items] of Object.entries(value))
        list.push([sub, items as RawItem[]]);
  }
  const categories = [...food, ...drink];

  await prisma.category.deleteMany();

  for (const [ci, [name, items]] of categories.entries()) {
    await prisma.category.create({
      data: {
        name,
        slug: slugify(name),
        sortOrder: ci,
        ...extras[name],
        items: {
          create: items.map((item, ii) => ({
            name: titleCase(item.name),
            sortOrder: ii,
            description: item.sauces
              ? `Sauces: ${item.sauces.map(titleCase).join(", ")}`
              : null,
            price: typeof item.price === "number" ? item.price : null,
            variants:
              typeof item.price === "number"
                ? undefined
                : {
                    create: Object.entries(item.price).map(([v, price], vi) => ({
                      name: titleCase(v),
                      price,
                      sortOrder: vi,
                    })),
                  },
          })),
        },
      },
    });
  }

  const count = await prisma.menuItem.count();
  console.log(`Seeded ${categories.length} categories, ${count} items`);
}

seedAdmin()
  .then(seedMenu)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
