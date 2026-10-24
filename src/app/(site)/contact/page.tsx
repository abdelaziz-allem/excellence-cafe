import type { Metadata } from "next";
import { images, site } from "@/lib/data";
import { PageHero } from "@/components/PageHero";
import { Ornament } from "@/components/Ornament";
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: "Find Excellence Café in Jig-jiga Yar, Hargeisa. Call 063 629 9996.",
};

export default function ContactPage() {
  const cards = [
    {
      Icon: PinIcon,
      title: "Address",
      lines: [site.address.line1, site.address.line2],
      sub: site.address.somali,
      href: site.mapLink,
      cta: "Get directions",
    },
    {
      Icon: ClockIcon,
      title: "Opening hours",
      lines: [site.hours.label, `${site.hours.open} – ${site.hours.close}`],
      sub: "Breakfast deal 7:30 – 9:30 AM",
    },
    {
      Icon: PhoneIcon,
      title: "Telephone",
      lines: [site.phoneDisplay],
      sub: "Reservations & takeaway",
      href: site.phoneHref,
      cta: "Call now",
    },
    {
      Icon: WhatsAppIcon,
      title: "WhatsApp",
      lines: [site.phoneDisplay],
      sub: "Orders and enquiries",
      href: site.whatsappHref,
      cta: "Message us",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="Contact"
        intro="We'd love to hear from you — and even more, to welcome you in person."
        image={images.counter}
      />
      <section className="paper py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map(({ Icon, title, lines, sub, href, cta }) => (
              <div key={title} className="frame-double flex flex-col items-center bg-ivory p-8 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 text-gold-600">
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="mt-5 font-display text-xl text-espresso">{title}</h2>
                <Ornament className="mt-3" width="w-6" />
                <div className="mt-4 font-serif text-lg leading-snug text-roast">
                  {lines.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>
                <p className="mt-2 text-xs text-latte">{sub}</p>
                {href && (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="mt-auto pt-6 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-gold-600 hover:text-gold-700"
                  >
                    {cta} →
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="relative mt-16 h-[28rem] overflow-hidden border border-gold/30">
            <iframe
              title="Map to Excellence Café"
              src={site.mapEmbed}
              className="absolute inset-0 h-full w-full grayscale-[0.4] sepia-[0.35]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
