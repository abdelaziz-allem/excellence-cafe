import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat, Playfair_Display } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Excellence Café — Café & Restaurant in Hargeisa",
    template: "%s · Excellence Café",
  },
  description:
    "Excellence Café, Jig-jiga Yar, Hargeisa. Classic breakfasts, grills, specialty coffee and desserts. Open all week 7:30 AM – 12:00 AM.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${montserrat.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
