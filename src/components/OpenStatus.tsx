"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data";

function hargeisaMinutes() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Mogadishu",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return h * 60 + m;
}

export function OpenStatus({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => {
      const now = hargeisaMinutes();
      setOpen(now >= site.hoursMinutes.open && now < site.hoursMinutes.close);
    };
    check();
    const t = setInterval(check, 60_000);
    return () => clearInterval(t);
  }, []);

  if (open === null) return null;

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="relative flex h-2 w-2">
        {open && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
        )}
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${
            open ? "bg-emerald-500" : "bg-rose-400"
          }`}
        />
      </span>
      {open ? "Open now" : `Closed · opens ${site.hours.open}`}
    </span>
  );
}
