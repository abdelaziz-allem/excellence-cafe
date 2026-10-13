import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/data";
import { PageHero } from "@/components/PageHero";
import { Ornament, SectionHeading } from "@/components/Ornament";

export const metadata: Metadata = {
  title: "Our Story",
  description: "The story and values behind Excellence Café in Hargeisa.",
};

const values = [
  {
    n: "I",
    title: "Hospitality",
    text: "Every guest is welcomed as family — soo dhowow is not just a greeting, it is a promise.",
  },
  {
    n: "II",
    title: "Freshness",
    text: "Bread baked at dawn, juices pressed to order, nothing kept past the day it was made.",
  },
  {
    n: "III",
    title: "Craft",
    text: "From the shaah blend to the plating, we sweat the small details so you don't have to.",
  },
  {
    n: "IV",
    title: "Community",
    text: "Proudly local — we work with Hargeisa suppliers and employ young people from our neighbourhood.",
  },
];

const timeline = [
  { year: "2019", text: "A small coffee counter opens in Jig-jiga Yar." },
  { year: "2021", text: "The kitchen expands — breakfast and the grill join the menu." },
  { year: "2023", text: "The dining room and family lounge are redesigned." },
  { year: "Today", text: "Open 16½ hours a day, seven days a week." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Since 2019"
        title="Our Story"
        intro="A café built on hospitality, craft and a love for bringing people together."
        image={images.interiorWarm}
      />

      <section className="paper py-28 md:py-36">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24">
          <div>
            <SectionHeading
              align="left"
              eyebrow="How it began"
              title={
                <>
                  Built on a <span className="italic text-gold-600">simple promise</span>
                </>
              }
            />
            <p className="mt-8 font-serif text-xl leading-relaxed text-mocha">
              <span className="float-left mr-3 font-display text-7xl leading-[0.8] text-gold-600">
                E
              </span>
              xcellence Café began with a single espresso machine and a big idea:
              that Hargeisa deserved a place where the coffee was serious, the
              food was honest and every guest left feeling looked after.
            </p>
            <p className="mt-5 leading-relaxed text-mocha">
              Our founders grew up around family tables piled high with
              canjeero, suqaar and sweet spiced tea. They wanted to keep that
              generosity — and pair it with the elegance of the grand cafés
              they had visited abroad. The result is a room where business
              meetings, family breakfasts and late-night desserts all feel at
              home.
            </p>
            <p className="mt-8 font-serif text-2xl italic text-gold-700">— The Excellence family</p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="relative mt-16 aspect-[3/4] overflow-hidden frame-double">
              <Image src={images.chefPrep} alt="Preparing fresh ingredients" fill sizes="25vw" className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden frame-double">
              <Image src={images.counter} alt="The coffee counter" fill sizes="25vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-espresso py-28 text-cream md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            light
            eyebrow="What we stand for"
            title={
              <>
                Our <span className="italic text-gold-200">values</span>
              </>
            }
          />
          <div className="mt-16 grid gap-px bg-gold/20 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="bg-espresso p-10 text-center">
                <p className="font-display text-3xl italic text-gold-300">{v.n}</p>
                <h3 className="mt-4 font-display text-2xl text-ivory">{v.title}</h3>
                <Ornament className="mt-4" width="w-6" />
                <p className="mt-5 leading-relaxed text-cream/65">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="paper py-28 md:py-36">
        <div className="mx-auto max-w-4xl px-6">
          <SectionHeading
            eyebrow="Our journey"
            title={
              <>
                Through the <span className="italic text-gold-600">years</span>
              </>
            }
          />
          <ol className="relative mt-16 space-y-12 before:absolute before:top-2 before:bottom-2 before:left-[5.5rem] before:w-px before:bg-gold/40 sm:before:left-1/2">
            {timeline.map((t, i) => (
              <li
                key={t.year}
                className={`relative flex items-center gap-10 sm:gap-0 ${
                  i % 2 ? "sm:flex-row-reverse" : ""
                }`}
              >
                <p className={`w-16 shrink-0 font-display text-2xl text-gold-600 sm:w-1/2 sm:px-12 ${i % 2 ? "sm:text-left" : "sm:text-right"}`}>
                  {t.year}
                </p>
                <span className="absolute left-[5.5rem] h-3 w-3 -translate-x-1/2 rotate-45 bg-gold sm:left-1/2" />
                <p className={`font-serif text-xl text-mocha sm:w-1/2 sm:px-12 ${i % 2 ? "sm:text-right" : ""}`}>
                  {t.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-cream py-24 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-4xl text-espresso md:text-5xl">
            Come and <span className="italic text-gold-600">taste the story</span>
          </h2>
          <Ornament className="mt-6" width="w-16" />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/menu" className="btn-gold">View menu</Link>
            <Link href="/reservations" className="btn-outline text-gold-700">Reserve a table</Link>
          </div>
        </div>
      </section>
    </>
  );
}
