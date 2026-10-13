// All content below is placeholder data — swap images and prices for the real ones.

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

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  image?: string;
  tags?: ("signature" | "new" | "vegetarian" | "spicy")[];
};

export type MenuCategory = {
  id: string;
  title: string;
  subtitle: string;
  note?: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
  {
    id: "breakfast",
    title: "Breakfast",
    subtitle: "Served daily 7:30 – 11:30 AM",
    note: "20% off the entire breakfast menu between 7:30 and 9:30 AM",
    items: [
      {
        name: "Excellence Somali Breakfast",
        description:
          "Canjeero, sabaayad, beef suqaar, liver, foul and sweet shaah — the full table for two.",
        price: 14,
        image: img("1504754524776-8f4f37790ca0", 800),
        tags: ["signature"],
      },
      {
        name: "Canjeero & Beer",
        description: "Fresh canjeero with sautéed lamb liver, onions, peppers and fresh herbs.",
        price: 6.5,
        image: img("1490645935967-10de6ba17061", 800),
      },
      {
        name: "Sabaayad with Honey",
        description: "Flaky layered flatbread brushed with ghee, drizzled with mountain honey.",
        price: 4.5,
        image: img("1484723091739-30a097e8f929", 800),
        tags: ["vegetarian"],
      },
      {
        name: "Skillet Eggs",
        description: "Four sunny eggs baked on a cast-iron sizzler with herbs and tomato.",
        price: 5.5,
        image: img("1533089860892-a7c6f0a88666", 800),
        tags: ["vegetarian"],
      },
      {
        name: "Buttermilk Pancakes",
        description: "Golden stack, fresh berries, banana and warm maple syrup.",
        price: 6,
        image: img("1528207776546-365bb710ee93", 800),
        tags: ["vegetarian"],
      },
      {
        name: "Avocado Egg Toast",
        description: "Sourdough, smashed avocado, fried egg, chilli flakes and lemon.",
        price: 6.5,
        image: img("1525351484163-7529414344d8", 800),
        tags: ["new"],
      },
    ],
  },
  {
    id: "mains",
    title: "Main Courses",
    subtitle: "From the grill and the kitchen",
    items: [
      {
        name: "Bariis iyo Hilib Ari",
        description:
          "Slow-roasted goat on fragrant spiced basmati, banana and fresh basbaas.",
        price: 15,
        image: img("1414235077428-338989a2e8c0", 800),
        tags: ["signature"],
      },
      {
        name: "Ribeye & Hand-cut Fries",
        description: "Char-grilled ribeye, rosemary fries and peppercorn sauce.",
        price: 22,
        image: img("1600891964092-4316c288032e", 800),
      },
      {
        name: "Mixed Grill Platter",
        description: "Chicken, lamb kebab and beef skewers, grilled vegetables, garlic sauce.",
        price: 19,
        image: img("1555939594-58d7cb561ad1", 800),
        tags: ["spicy"],
      },
      {
        name: "Glazed Beef Ribs",
        description: "Twelve-hour ribs, honey-date glaze, roasted tomato salad.",
        price: 20,
        image: img("1544025162-d76694265947", 800),
      },
      {
        name: "Spiced Meatballs",
        description: "Hand-rolled beef kofta on rocket with tahini and pomegranate.",
        price: 12,
        image: img("1529042410759-befb1204b468", 800),
      },
      {
        name: "Baasto Excellence",
        description: "Our house spaghetti with slow-cooked beef ragù and Somali spices.",
        price: 11,
        image: img("1484980972926-edee96e0960d", 800),
      },
    ],
  },
  {
    id: "burgers",
    title: "Burgers & Pizza",
    subtitle: "Stone-baked and flame-grilled",
    items: [
      {
        name: "The Excellence Burger",
        description: "Double beef, aged cheddar, caramelised onion, house sauce, brioche.",
        price: 12,
        image: img("1568901346375-23c9450c58cd", 800),
        tags: ["signature"],
      },
      {
        name: "Crispy Chicken Burger",
        description: "Buttermilk chicken, slaw, pickles and chilli-honey mayo.",
        price: 10,
        image: img("1550547660-d9450f859349", 800),
        tags: ["spicy"],
      },
      {
        name: "Margherita",
        description: "San Marzano tomato, fior di latte, basil, olive oil.",
        price: 10,
        image: img("1513104890138-7c749659a591", 800),
        tags: ["vegetarian"],
      },
      {
        name: "Beef Suqaar Pizza",
        description: "Spiced beef suqaar, peppers, red onion, mozzarella.",
        price: 13,
        image: img("1565299624946-b28f40a0ae38", 800),
        tags: ["new"],
      },
    ],
  },
  {
    id: "salads",
    title: "Salads & Bowls",
    subtitle: "Light, fresh, generous",
    items: [
      {
        name: "Garden Harvest Bowl",
        description: "Avocado, chickpeas, roasted squash, cherry tomato, tahini dressing.",
        price: 9,
        image: img("1512621776951-a57141f2eefd", 800),
        tags: ["vegetarian"],
      },
      {
        name: "Salmon Poke Bowl",
        description: "Seared salmon, rice, edamame, corn, pickled cabbage, sesame.",
        price: 14,
        image: img("1546069901-ba9599a7e63c", 800),
      },
      {
        name: "Excellence Green Salad",
        description: "Mixed leaves, roasted seeds, red onion, citrus vinaigrette.",
        price: 7,
        image: img("1540189549336-e6e99c3679fe", 800),
        tags: ["vegetarian"],
      },
      {
        name: "Egg & Avocado Salad",
        description: "Soft eggs, avocado, spinach, toasted bread and herbs.",
        price: 8,
        image: img("1482049016688-2d3e1b311543", 800),
      },
    ],
  },
  {
    id: "coffee",
    title: "Coffee & Tea",
    subtitle: "Ethiopian highland beans, roasted for us",
    items: [
      {
        name: "Shaah Excellence",
        description: "Spiced Somali tea with cardamom, cinnamon and clove.",
        price: 1.5,
        image: img("1497515114629-f71d768fd07c", 800),
        tags: ["signature"],
      },
      {
        name: "Cappuccino",
        description: "Double espresso, silky milk, a fine layer of foam.",
        price: 3.5,
        image: img("1509042239860-f550ce710b93", 800),
      },
      {
        name: "Spanish Latte",
        description: "Espresso, condensed milk and steamed milk.",
        price: 4,
        image: img("1495474472287-4d71bcdd2085", 800),
      },
      {
        name: "Iced Caramel Latte",
        description: "Espresso over ice with house caramel and cold milk.",
        price: 4.5,
        image: img("1461023058943-07fcbe16d735", 800),
      },
      {
        name: "Pour Over",
        description: "Single-origin, hand-brewed to order. Ask for today's bean.",
        price: 4,
        image: img("1442512595331-e89e73853f31", 800),
      },
      {
        name: "Espresso",
        description: "Short, rich and fragrant.",
        price: 2.5,
        image: img("1497935586351-b67a49e012bf", 800),
      },
    ],
  },
  {
    id: "drinks",
    title: "Juices & Shakes",
    subtitle: "Pressed fresh every morning",
    items: [
      {
        name: "Fresh Orange",
        description: "Hand-squeezed, nothing added.",
        price: 3.5,
        image: img("1600271886742-f049cd451bba", 800),
      },
      {
        name: "Mango & Passion Cooler",
        description: "Mango, passion fruit, lime and mint over crushed ice.",
        price: 4.5,
        image: img("1544145945-f90425340c7e", 800),
        tags: ["new"],
      },
      {
        name: "Oreo Milkshake",
        description: "Vanilla ice cream, cookies, chocolate drizzle.",
        price: 5,
        image: img("1572490122747-3968b75cc699", 800),
      },
      {
        name: "Lime Iced Tea",
        description: "Black tea brewed cold with lime and a touch of honey.",
        price: 3,
        image: img("1556679343-c7306c1976bc", 800),
      },
    ],
  },
  {
    id: "desserts",
    title: "Desserts",
    subtitle: "Made in-house daily",
    items: [
      {
        name: "Triple Chocolate Cake",
        description: "Dark sponge, ganache, chocolate shards.",
        price: 5,
        image: img("1578985545062-69928b1d9587", 800),
        tags: ["signature"],
      },
      {
        name: "Raspberry Cream Slice",
        description: "Vanilla sponge, fresh cream and raspberries.",
        price: 5,
        image: img("1565958011703-44f9829ba187", 800),
      },
      {
        name: "Strawberry Panna Cotta",
        description: "Vanilla bean cream with macerated strawberries.",
        price: 4.5,
        image: img("1488477181946-6428a0291777", 800),
      },
      {
        name: "Caramel Affogato",
        description: "Vanilla gelato, hot espresso, salted caramel, wafer.",
        price: 4.5,
        image: img("1551024506-0bccd828d307", 800),
      },
      {
        name: "Chocolate Parfait",
        description: "Layers of mousse, cookie crumb and whipped cream.",
        price: 5,
        image: img("1563805042-7684c019e1cb", 800),
      },
    ],
  },
];

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
