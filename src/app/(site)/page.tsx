import Image from "next/image";
import Link from "next/link";
import {
  formatPrice,
  gallery,
  images,
  signatureDishes,
  site,
  testimonials,
} from "@/lib/data";
import { getPublicMenu } from "@/lib/server/menu";
import { itemPrice } from "@/lib/menu";
import { Ornament, SectionHeading } from "@/components/Ornament";
import { ArrowIcon, ClockIcon, PhoneIcon, PinIcon, StarIcon } from "@/components/Icons";

export default async function Home() {
  const menu = await getPublicMenu();
  const previewCategories = ["breakfast", "hot-coffee"]
    .flatMap((id) => menu.find((c) => c.id === id) ?? [])
    .map((c) => ({ ...c, items: c.items.slice(0, 5) }));

  return (
    <>
      {/* ───────────── Hero ───────────── */}
      <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-espresso">
        <Image
          src={images.hero}
          alt="A breakfast table at Excellence Café"
          fill
          priority
          sizes="100vw"
          className="animate-ken-burns object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso/90 via-espresso/50 to-espresso/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-transparent to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pt-36 pb-40">
          <div className="max-w-2xl">
            <p className="eyebrow animate-fade-up !text-gold-300 [animation-delay:200ms]">
              Café &amp; Restaurant · Hargeisa
            </p>
            <h1 className="mt-6 font-display text-6xl leading-[1] font-bold tracking-tight text-ivory sm:text-7xl md:text-8xl">
              <span className="block overflow-hidden pb-1">
                <span className="block animate-reveal-up [animation-delay:350ms]">The Art of</span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="text-shimmer block italic [animation:reveal-up_1.1s_cubic-bezier(0.22,1,0.36,1)_500ms_both,shimmer_6s_linear_1.6s_infinite]">
                  Excellence
                </span>
              </span>
            </h1>
            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-16 origin-left animate-draw-line bg-gold [animation-delay:900ms]" />
              <span className="h-2 w-2 animate-spin-in bg-gold [animation-delay:1500ms]" />
            </div>
            <p className="mt-8 max-w-lg animate-fade-up font-serif text-xl leading-relaxed font-medium text-cream sm:text-2xl [animation-delay:1000ms]">
              From the first cup of shaah at sunrise to a candlelit dinner at
              midnight — classic hospitality, honest food and the finest coffee
              in Jig-jiga Yar.
            </p>
            <div className="mt-10 flex animate-fade-up flex-wrap gap-4 [animation-delay:1200ms]">
              <Link href="/menu" className="btn-gold">
                Discover the Menu
              </Link>
              <Link href="/reservations" className="btn-outline text-ivory">
                Book a Table
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-32 left-1/2 hidden -translate-x-1/2 animate-fade-up flex-col items-center gap-2 text-gold-300 [animation-delay:1800ms] md:flex">
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.35em]">Scroll</span>
          <span className="h-8 w-px animate-scroll-cue bg-gold-300" />
        </div>

        {/* Info plaque */}
        <div className="absolute inset-x-0 bottom-0 hidden animate-fade-up [animation-delay:1400ms] md:block">
          <div className="mx-auto grid max-w-7xl grid-cols-3 border-t border-gold/25 px-6 text-cream/85">
            {[
              {
                Icon: ClockIcon,
                label: "Open all week",
                value: `${site.hours.open} – ${site.hours.close}`,
              },
              { Icon: PinIcon, label: "Find us", value: "Jig-jiga Yar, Hargeisa" },
              { Icon: PhoneIcon, label: "Reservations", value: site.phoneDisplay },
            ].map(({ Icon, label, value }, i) => (
              <div
                key={label}
                className={`flex items-center gap-4 py-7 ${i > 0 ? "border-l border-gold/25 pl-10" : ""}`}
              >
                <Icon className="h-6 w-6 text-gold-300" />
                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-gold-300">
                    {label}
                  </p>
                  <p className="mt-1 font-display text-lg font-semibold text-ivory">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Welcome ───────────── */}
      <section className="paper py-28 md:py-36">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:gap-24">
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="frame-double relative aspect-[4/5] w-[82%] overflow-hidden">
              <Image
                src={images.interior}
                alt="Inside Excellence Café"
                fill
                sizes="(min-width: 1024px) 40vw, 80vw"
                className="object-cover"
              />
            </div>
            <div className="absolute right-0 -bottom-10 aspect-square w-[48%] overflow-hidden border-[10px] border-ivory shadow-2xl shadow-espresso/20">
              <Image
                src={images.latteArt}
                alt="Cappuccino with latte art"
                fill
                sizes="(min-width: 1024px) 20vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute top-10 -right-2 hidden flex-col items-center bg-espresso px-6 py-5 text-center sm:flex">
              <span className="font-display text-4xl text-gold-200">15+</span>
              <span className="mt-1 text-[0.6rem] uppercase tracking-[0.3em] text-cream/70">
                House recipes
              </span>
            </div>
          </div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Welcome to Excellence"
              title={
                <>
                  A classic café,
                  <br />
                  <span className="italic text-gold-600">made in Hargeisa</span>
                </>
              }
            />
            <p className="mt-8 font-serif text-xl leading-relaxed text-mocha">
              Excellence Café was born from a simple belief: that a good meal
              shared with family and friends is one of life&apos;s great
              pleasures. We bring together the warmth of Somali hospitality and
              the polish of a classic European café.
            </p>
            <p className="mt-5 leading-relaxed text-mocha">
              Our kitchen bakes canjeero and sabaayad fresh every morning, our
              baristas pull every shot by hand, and our grill keeps going until
              midnight. Whether it&apos;s a business breakfast across from Qaalib
              Business Center or a late dessert with friends — there is a table
              waiting for you.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6 border-y border-gold/25 py-8 text-center">
              {[
                ["7 days", "a week"],
                ["16½", "hours daily"],
                ["100%", "fresh, daily"],
              ].map(([n, l]) => (
                <div key={l}>
                  <p className="font-display text-3xl text-gold-600">{n}</p>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.25em] text-latte">
                    {l}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="mt-10 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold-600 hover:text-gold-700"
            >
              Read our story <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── Breakfast Deal ───────────── */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-[1fr_1.3fr]">
          <div className="relative flex flex-col justify-center overflow-hidden px-6 py-20 sm:px-12 lg:py-28">
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full border-[18px] border-gold/15" />
            <div className="pointer-events-none absolute -bottom-20 -left-40 h-96 w-96 rounded-full border border-gold/30" />
            <p className="eyebrow relative">Every morning</p>
            <h2 className="relative mt-4 font-display text-4xl font-bold uppercase tracking-tight text-gold-600 md:text-5xl">
              Breakfast Deal
            </h2>
            <Ornament className="relative mt-6 !justify-start" width="w-24" />
            <p className="relative mt-6 font-display text-[7rem] leading-[0.85] text-gilded md:text-[9rem]">
              20<span className="text-[0.6em]">%</span>
            </p>
            <p className="relative font-display text-6xl tracking-wide text-gilded md:text-7xl">
              OFF
            </p>
            <p className="relative mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-roast">
              The entire breakfast menu
            </p>
            <div className="relative mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-gold/50 px-6 py-3 text-roast">
              <ClockIcon className="h-5 w-5 text-gold-600" />
              <span className="font-medium tracking-wide">7:30 AM – 9:30 AM</span>
            </div>
            <Link href="/menu#breakfast" className="btn-gold relative mt-10 w-fit">
              See breakfast menu
            </Link>
          </div>
          <div className="relative min-h-[24rem] lg:min-h-full">
            <Image
              src={images.breakfastDeal}
              alt="Breakfast spread at Excellence Café"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cream/40 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* ───────────── Signature dishes ───────────── */}
      <section className="paper py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="From our kitchen"
            title={
              <>
                Signature <span className="italic text-gold-600">Creations</span>
              </>
            }
            intro="Three dishes our guests return for, again and again."
          />
          <div className="mt-20 grid gap-10 md:grid-cols-3">
            {signatureDishes.map((d, i) => (
              <article key={d.name} className={`group ${i === 1 ? "md:mt-12" : ""}`}>
                <div className="frame-double relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={d.image}
                    alt={d.name}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent" />
                  <span className="absolute top-5 right-5 bg-ivory/95 px-4 py-2 font-display text-lg text-gold-700">
                    {formatPrice(d.price)}
                  </span>
                </div>
                <div className="mt-7 text-center">
                  <h3 className="font-display text-2xl text-espresso">{d.name}</h3>
                  <p className="mt-2 font-serif text-lg text-mocha">{d.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Menu preview ───────────── */}
      <section className="relative overflow-hidden bg-espresso py-28 text-cream md:py-36">
        <Image
          src={images.coffeeBeans}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-15"
        />
        <div className="relative mx-auto max-w-6xl px-6">
          <SectionHeading
            light
            eyebrow="A taste of the menu"
            title={
              <>
                Morning <span className="italic text-gold-200">Favourites</span>
              </>
            }
          />
          <div className="mt-20 grid gap-16 md:grid-cols-2">
            {previewCategories.map((cat) => (
              <div key={cat.id} className="border border-gold/30 p-8 sm:p-10">
                <h3 className="text-center font-display text-3xl text-gold-200 italic">
                  {cat.title}
                </h3>
                <p className="mt-2 text-center text-[0.65rem] uppercase tracking-[0.3em] text-cream/50">
                  {cat.subtitle}
                </p>
                <ul className="mt-10 space-y-7">
                  {cat.items.map((item) => (
                    <li key={item.id}>
                      <div className="flex items-baseline">
                        <span className="font-display text-lg text-ivory">{item.name}</span>
                        <span className="menu-leader" />
                        <span className="font-display text-lg text-gold-200">
                          {itemPrice(item)}
                        </span>
                      </div>
                      {item.description && (
                        <p className="mt-1 pr-16 font-serif text-base text-cream/60">
                          {item.description}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link href="/menu" className="btn-outline text-gold-200">
              View the full menu
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── Experience ───────────── */}
      <section className="paper py-28 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="The Excellence experience"
            title={
              <>
                More than a meal,
                <span className="italic text-gold-600"> a moment</span>
              </>
            }
          />
          <div className="mt-20 grid gap-8 md:grid-cols-3">
            {[
              {
                img: images.chef,
                title: "Our Kitchen",
                text: "Recipes passed down and refined — cooked fresh to order, from sunrise breakfasts to the late-night grill.",
              },
              {
                img: images.espressoBar,
                title: "The Coffee Bar",
                text: "Highland beans from across the border, roasted for us and pulled by trained baristas.",
              },
              {
                img: images.terrace,
                title: "Family & Events",
                text: "Private family seating and a garden terrace for birthdays, meetings and celebrations.",
              },
            ].map((f) => (
              <div key={f.title} className="group bg-ivory text-center shadow-[0_30px_60px_-30px_rgba(36,25,16,0.25)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={f.img}
                    alt={f.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                </div>
                <div className="px-8 pt-8 pb-10">
                  <h3 className="font-display text-2xl text-espresso">{f.title}</h3>
                  <Ornament className="mt-4" width="w-8" />
                  <p className="mt-4 leading-relaxed text-mocha">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Testimonials ───────────── */}
      <section className="bg-cream py-28 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow="Kind words"
            title={
              <>
                From our <span className="italic text-gold-600">guests</span>
              </>
            }
          />
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="frame-double bg-ivory p-10 text-center">
                <span className="font-display text-6xl leading-none text-gold-300">“</span>
                <div className="flex justify-center gap-1 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="mt-6 font-serif text-xl leading-relaxed text-roast italic">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8">
                  <p className="font-display text-lg text-espresso">{t.name}</p>
                  <p className="mt-1 text-[0.65rem] uppercase tracking-[0.3em] text-gold-600">
                    {t.role}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Gallery strip ───────────── */}
      <section className="paper pt-28 md:pt-32">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="@excellencecafe"
            title={
              <>
                Life at <span className="italic text-gold-600">Excellence</span>
              </>
            }
          />
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-gold-600 hover:text-gold-700"
          >
            Full gallery <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {gallery.slice(0, 6).map((g) => (
            <Link
              key={g.src}
              href="/gallery"
              className="group relative aspect-square overflow-hidden"
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(min-width: 1024px) 17vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/40" />
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────── Visit ───────────── */}
      <section className="paper py-28 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="frame-double flex flex-col justify-center bg-ivory p-10 text-center sm:p-14">
            <p className="eyebrow">Visit us</p>
            <h2 className="mt-4 font-display text-4xl text-espresso md:text-5xl">
              Opening <span className="italic text-gold-600">Hours</span>
            </h2>
            <Ornament className="mt-6" width="w-14" />
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.35em] text-latte">
              {site.hours.label}
            </p>
            <p className="mt-3 font-display text-3xl text-gilded md:text-4xl">
              {site.hours.open} — {site.hours.close}
            </p>
            <div className="mx-auto mt-10 h-px w-full max-w-xs bg-gold/25" />
            <p className="mt-10 font-serif text-xl leading-relaxed text-mocha">
              {site.address.line1}
              <br />
              {site.address.line2}
            </p>
            <p className="mt-2 font-serif text-base italic text-latte">
              {site.address.somali}
            </p>
            <a
              href={site.phoneHref}
              className="mt-8 font-display text-2xl tracking-wider text-gold-600 hover:text-gold-700"
            >
              {site.phoneDisplay}
            </a>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/reservations" className="btn-gold">
                Reserve
              </Link>
              <a href={site.mapLink} target="_blank" rel="noreferrer" className="btn-outline text-gold-700">
                Directions
              </a>
            </div>
          </div>
          <div className="relative min-h-[26rem] overflow-hidden border border-gold/30">
            <iframe
              title="Excellence Café location"
              src={site.mapEmbed}
              className="absolute inset-0 h-full w-full grayscale-[0.4] sepia-[0.35]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ───────────── Reservation CTA ───────────── */}
      <section className="relative overflow-hidden bg-espresso py-28 text-center md:py-36">
        <Image
          src={images.diningRoom}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso/60 to-espresso/80" />
        <div className="relative mx-auto max-w-3xl px-6">
          <p className="eyebrow !text-gold-300">Reservations</p>
          <h2 className="mt-5 font-display text-5xl text-ivory md:text-6xl">
            Your table is <span className="italic text-gold-200">waiting</span>
          </h2>
          <Ornament className="mt-7" width="w-20" />
          <p className="mx-auto mt-7 max-w-xl font-serif text-xl text-cream/80">
            Book ahead for family gatherings, business breakfasts and special
            celebrations — or simply call and we&apos;ll take care of the rest.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/reservations" className="btn-gold">
              Reserve online
            </Link>
            <a href={site.phoneHref} className="btn-outline text-gold-200">
              Call {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
