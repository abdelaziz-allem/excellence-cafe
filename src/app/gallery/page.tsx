import type { Metadata } from "next";
import { gallery, images } from "@/lib/data";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Inside Excellence Café — our dining room, kitchen, coffee bar and dishes.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Moments"
        title="Gallery"
        intro="A glimpse of our room, our kitchen and the plates that leave it."
        image={images.greenery}
      />
      <section className="paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <GalleryGrid photos={gallery} />
        </div>
      </section>
    </>
  );
}
