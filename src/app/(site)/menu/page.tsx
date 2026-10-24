import type { Metadata } from "next";
import { images } from "@/lib/data";
import { getPublicMenu } from "@/lib/server/menu";
import { PageHero } from "@/components/PageHero";
import { MenuBrowser } from "@/components/MenuBrowser";

export const metadata: Metadata = {
  title: "Menu",
  description: "Breakfast, grills, burgers, salads, specialty coffee, fresh juices and desserts.",
};

export default async function MenuPage() {
  const menu = await getPublicMenu();

  return (
    <>
      <PageHero
        eyebrow="À la carte"
        title="Our Menu"
        intro="Somali classics and café favourites, prepared fresh from morning until midnight."
        image={images.fineDining}
      />
      <MenuBrowser categories={menu} />
    </>
  );
}
