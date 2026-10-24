import { formatPrice } from "./data";

export type PublicMenuItem = {
  id: string;
  name: string;
  description: string | null;
  price: number | null;
  image: string | null;
  variants: { name: string; price: number }[];
};

export type PublicMenuCategory = {
  id: string;
  title: string;
  subtitle: string | null;
  note: string | null;
  items: PublicMenuItem[];
};

// "$6.00" for a single price, "$6.00 / $8.00" when sold in variants
export function itemPrice(item: Pick<PublicMenuItem, "price" | "variants">) {
  if (item.variants.length) return item.variants.map((v) => formatPrice(v.price)).join(" / ");
  return item.price === null ? "" : formatPrice(item.price);
}
