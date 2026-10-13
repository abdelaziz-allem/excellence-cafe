import type { Metadata } from "next";
import { images, site } from "@/lib/data";
import { PageHero } from "@/components/PageHero";
import { ReservationForm } from "@/components/ReservationForm";
import { Ornament } from "@/components/Ornament";
import { ClockIcon, PhoneIcon, PinIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Reservations",
  description: "Book a table at Excellence Café, Hargeisa.",
};

export default function ReservationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Book a table"
        title="Reservations"
        intro="For family gatherings, business breakfasts and every celebration in between."
        image={images.diningRoom}
      />
      <section className="paper py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_22rem]">
          <ReservationForm />
          <aside className="space-y-8">
            <div className="bg-espresso p-10 text-cream/80">
              <p className="eyebrow !text-gold-300">Good to know</p>
              <ul className="mt-6 space-y-5 text-sm leading-relaxed">
                <li className="flex gap-3">
                  <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                  <span>
                    Open {site.hours.label.toLowerCase()}, {site.hours.open} – {site.hours.close}.
                    Last seating 11:00 PM.
                  </span>
                </li>
                <li className="flex gap-3">
                  <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                  <span>
                    Same-day bookings by phone:{" "}
                    <a href={site.phoneHref} className="text-gold-200">
                      {site.phoneDisplay}
                    </a>
                  </span>
                </li>
                <li className="flex gap-3">
                  <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                  <span>{site.address.line1}, {site.address.line2}</span>
                </li>
              </ul>
            </div>
            <div className="frame-double bg-cream p-10 text-center">
              <p className="eyebrow">Private events</p>
              <h3 className="mt-3 font-display text-2xl text-espresso">Celebrate with us</h3>
              <Ornament className="mt-4" width="w-8" />
              <p className="mt-4 font-serif text-lg text-mocha">
                Groups of 13 or more, birthdays and corporate events — our team
                will tailor a menu for you.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
