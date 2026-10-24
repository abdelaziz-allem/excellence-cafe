// Placeholder site content — swap images for the real ones. The menu lives in the database (prisma/seed.ts, /dashboard).

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const site = {
  name: "Excellence Café",
  tagline: "Where every cup is a celebration",
  phoneDisplay: "063 629 9996",
  phoneHref: "tel:+252636299996",
  whatsappHref: "https://wa.me/252636299996",
  email: "hello@excellencecafe.so",
  address: {
    line1: "Jig-jiga Yar, opposite Qaalib Business Center",
    line2: "Hargeisa, Somaliland",
    somali: "Jig-jiga Yar, Kaso horjeedka Qaalib Business Center",
  },
  hours: { label: "All week", open: "7:30 AM", close: "12:00 AM" },
  // Minutes after midnight, Hargeisa local time (EAT, UTC+3)
  hoursMinutes: { open: 7 * 60 + 30, close: 24 * 60 },
  mapEmbed:
    "https://maps.google.com/maps?q=Jigjiga%20Yar%2C%20Hargeisa&z=15&output=embed",
  mapLink: "https://maps.google.com/?q=Jigjiga+Yar,+Hargeisa",
  socials: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/",
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "Our Story" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];

export const images = {
  hero: img("1504754524776-8f4f37790ca0", 2000),
  breakfastDeal: img("1533089860892-a7c6f0a88666", 1600),
  interior: img("1554118811-1e0d58224f24", 1600),
  interiorWarm: img("1521017432531-fbd92d768814", 1600),
  counter: img("1453614512568-c4024d13c247", 1400),
  terrace: img("1445116572660-236099ec97a0", 1400),
  greenery: img("1600093463592-8e36ae95ef56", 1400),
  chef: img("1600565193348-f74bd3c7ccdf", 1400),
  chefPrep: img("1551218808-94e220e084d2", 1400),
  latteArt: img("1509042239860-f550ce710b93", 1400),
  coffeeBeans: img("1497515114629-f71d768fd07c", 1600),
  espressoBar: img("1497935586351-b67a49e012bf", 1400),
  fineDining: img("1414235077428-338989a2e8c0", 1400),
  diningRoom: img("1517248135467-4c7edcad34c4", 1600),
};

export const signatureDishes = [
  {
    name: "Excellence Somali Breakfast",
    description: "A table of canjeero, sabaayad, suqaar and sweet shaah.",
    price: 14,
    image: img("1504754524776-8f4f37790ca0", 900),
  },
  {
    name: "Ribeye & Hand-cut Fries",
    description: "Char-grilled ribeye with rosemary fries.",
    price: 22,
    image: img("1600891964092-4316c288032e", 900),
  },
  {
    name: "Triple Chocolate Cake",
    description: "Dark sponge, ganache and chocolate shards.",
    price: 5,
    image: img("1578985545062-69928b1d9587", 900),
  },
];

export const testimonials = [
  {
    quote:
      "The most beautiful breakfast in Hargeisa. The sabaayad with honey is worth the trip on its own.",
    name: "Hodan A.",
    role: "Regular guest",
  },
  {
    quote:
      "Elegant room, warm service and a cappuccino as good as any I've had in Dubai. Our new family spot.",
    name: "Mohamed I.",
    role: "Visiting from Dubai",
  },
  {
    quote:
      "We booked the terrace for a birthday dinner — the team made it feel truly special.",
    name: "Sahra M.",
    role: "Private event",
  },
];

export const gallery = [
  { src: img("1554118811-1e0d58224f24", 1400), alt: "The main dining room", tall: true },
  { src: img("1504754524776-8f4f37790ca0", 1400), alt: "A breakfast table spread" },
  { src: img("1509042239860-f550ce710b93", 1400), alt: "Cappuccino with latte art" },
  { src: img("1600565193348-f74bd3c7ccdf", 1400), alt: "Our chef at the grill", tall: true },
  { src: img("1578985545062-69928b1d9587", 1400), alt: "Triple chocolate cake" },
  { src: img("1445116572660-236099ec97a0", 1400), alt: "Window table with greenery" },
  { src: img("1600891964092-4316c288032e", 1400), alt: "Ribeye with hand-cut fries" },
  { src: img("1453614512568-c4024d13c247", 1400), alt: "The coffee counter", tall: true },
  { src: img("1528207776546-365bb710ee93", 1400), alt: "Buttermilk pancakes" },
  { src: img("1600093463592-8e36ae95ef56", 1400), alt: "The garden terrace" },
  { src: img("1497935586351-b67a49e012bf", 1400), alt: "Espresso preparation" },
  { src: img("1565958011703-44f9829ba187", 1400), alt: "Raspberry cream slice" },
  { src: img("1521017432531-fbd92d768814", 1400), alt: "Evening at the café", tall: true },
  { src: img("1546069901-ba9599a7e63c", 1400), alt: "Salmon poke bowl" },
  { src: img("1544145945-f90425340c7e", 1400), alt: "Fresh fruit coolers" },
];

export const formatPrice = (n: number) =>
  `$${n % 1 === 0 ? n.toFixed(0) : n.toFixed(2)}`;
