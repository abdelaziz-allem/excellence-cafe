// Hairline rule with a centre diamond — lifted from the flyer's divider.
export function Ornament({
  className = "",
  width = "w-40",
}: {
  className?: string;
  width?: string;
}) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className={`h-px ${width} bg-gradient-to-r from-transparent to-gold/70`} />
      <span className="h-2 w-2 rotate-45 bg-gold" />
      <span className={`h-px ${width} bg-gradient-to-l from-transparent to-gold/70`} />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const centered = align === "center";
  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-xl"}>
      <p className={`eyebrow ${light ? "!text-gold-300" : ""}`}>{eyebrow}</p>
      <h2
        className={`mt-4 font-display text-4xl leading-[1.1] md:text-5xl ${
          light ? "text-ivory" : "text-espresso"
        }`}
      >
        {title}
      </h2>
      <Ornament
        className={`mt-6 ${centered ? "" : "!justify-start"}`}
        width={centered ? "w-16" : "w-12"}
      />
      {intro && (
        <p
          className={`mt-6 font-serif text-xl leading-relaxed ${
            light ? "text-cream/80" : "text-mocha"
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
