"use client";

import { useMemo, useState } from "react";
import { site } from "@/lib/data";
import { Ornament } from "./Ornament";
import { WhatsAppIcon } from "./Icons";

// Bookable slots: 7:30 AM to 11:00 PM in 30-minute steps
const slots = Array.from({ length: 32 }, (_, i) => {
  const mins = 7 * 60 + 30 + i * 30;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${m.toString().padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
});

const occasions = ["Just dining", "Breakfast meeting", "Birthday", "Family gathering", "Business", "Other"];

const field =
  "mt-2 w-full border border-gold/35 bg-ivory px-4 py-3.5 text-roast placeholder:text-latte/70 outline-none transition-colors focus:border-gold";
const label = "text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-mocha";

export function ReservationForm() {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    guests: "2",
    date: today,
    time: "7:30 PM",
    seating: "Main dining room",
    occasion: occasions[0],
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const set =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const whatsappText = encodeURIComponent(
    [
      `Reservation request — Excellence Café`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Guests: ${form.guests}`,
      `Date: ${form.date} at ${form.time}`,
      `Seating: ${form.seating}`,
      `Occasion: ${form.occasion}`,
      form.notes && `Notes: ${form.notes}`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  if (submitted) {
    return (
      <div className="frame-double bg-ivory p-10 text-center sm:p-14">
        <p className="eyebrow">Thank you, {form.name.split(" ")[0]}</p>
        <h3 className="mt-4 font-display text-4xl text-espresso">Request received</h3>
        <Ornament className="mt-6" width="w-14" />
        <p className="mx-auto mt-6 max-w-md font-serif text-xl text-mocha">
          A table for <strong className="font-semibold">{form.guests}</strong> on{" "}
          <strong className="font-semibold">{form.date}</strong> at{" "}
          <strong className="font-semibold">{form.time}</strong>. To confirm instantly,
          send your request to us on WhatsApp — or we will call you on {form.phone}.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={`${site.whatsappHref}?text=${whatsappText}`}
            target="_blank"
            rel="noreferrer"
            className="btn-gold"
          >
            <WhatsAppIcon className="h-4 w-4" /> Confirm on WhatsApp
          </a>
          <button type="button" onClick={() => setSubmitted(false)} className="btn-outline text-gold-700">
            Edit request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="frame-double bg-ivory p-8 sm:p-12"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Full name</span>
          <input required value={form.name} onChange={set("name")} placeholder="Your name" className={field} />
        </label>
        <label className="block">
          <span className={label}>Phone</span>
          <input required type="tel" value={form.phone} onChange={set("phone")} placeholder="063 …" className={field} />
        </label>
        <label className="block">
          <span className={label}>Date</span>
          <input required type="date" min={today} value={form.date} onChange={set("date")} className={field} />
        </label>
        <label className="block">
          <span className={label}>Time</span>
          <select value={form.time} onChange={set("time")} className={field}>
            {slots.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={label}>Guests</span>
          <select value={form.guests} onChange={set("guests")} className={field}>
            {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((n) => (
              <option key={n} value={n}>
                {n} {n === "1" ? "guest" : "guests"}
              </option>
            ))}
            <option value="13+">13+ (private event)</option>
          </select>
        </label>
        <label className="block">
          <span className={label}>Seating</span>
          <select value={form.seating} onChange={set("seating")} className={field}>
            <option>Main dining room</option>
            <option>Family lounge</option>
            <option>Garden terrace</option>
            <option>No preference</option>
          </select>
        </label>
        <fieldset className="sm:col-span-2">
          <legend className={label}>Occasion</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {occasions.map((o) => (
              <button
                type="button"
                key={o}
                onClick={() => setForm((f) => ({ ...f, occasion: o }))}
                className={`border px-4 py-2 text-xs tracking-wider transition-colors ${
                  form.occasion === o
                    ? "border-gold bg-gold text-ivory"
                    : "border-gold/35 text-mocha hover:border-gold"
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="block sm:col-span-2">
          <span className={label}>Special requests</span>
          <textarea
            rows={4}
            value={form.notes}
            onChange={set("notes")}
            placeholder="Allergies, high chair, a birthday cake…"
            className={field}
          />
        </label>
      </div>
      <div className="mt-10 flex flex-col items-center gap-4 text-center">
        <button type="submit" className="btn-gold w-full sm:w-auto">
          Request reservation
        </button>
        <p className="text-xs text-latte">
          Prefer to call? Ring us on{" "}
          <a href={site.phoneHref} className="font-semibold text-gold-600">
            {site.phoneDisplay}
          </a>
        </p>
      </div>
    </form>
  );
}
