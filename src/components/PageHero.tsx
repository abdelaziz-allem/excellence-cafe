import Image from "next/image";
import { Ornament } from "./Ornament";

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[26rem] items-end overflow-hidden bg-espresso pt-32 pb-20 md:min-h-[32rem]">
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-45" />
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/40 to-espresso/30" />
      <div className="relative mx-auto w-full max-w-7xl px-6 text-center">
        <p className="eyebrow animate-fade-up !text-gold-300">{eyebrow}</p>
        <h1 className="mt-5 animate-fade-up font-display text-5xl text-ivory [animation-delay:120ms] md:text-7xl">
          {title}
        </h1>
        <Ornament className="mt-7 animate-fade-up [animation-delay:200ms]" width="w-20" />
        {intro && (
          <p className="mx-auto mt-6 max-w-2xl animate-fade-up font-serif text-xl text-cream/80 [animation-delay:280ms] md:text-2xl">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
