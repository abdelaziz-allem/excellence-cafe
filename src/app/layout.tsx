import type { Metadata } from "next";
import { Fraunces, Lora, Montserrat } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  weight: ["500", "600", "700", "800"],
});
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["500", "600", "700"],
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
      className={`${fraunces.variable} ${lora.variable} ${montserrat.variable}`}
    >
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
