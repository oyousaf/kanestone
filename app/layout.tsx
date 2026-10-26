import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Geist, Geist_Mono } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-bodoni",
});
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  metadataBase: new URL("https://kanestone.co.uk"),
  title: "Kanestone — Bold. British. Bespoke.",
  description:
    "Kanestone Limited is a British luxury automotive company supplying Rolls-Royce, Bentley, Aston Martin and Range Rover vehicles to businesses and industry professionals.",
  openGraph: {
    title: "Kanestone — Bold. British. Bespoke.",
    description: "A new perspective on luxury automotive solutions.",
    images: ["/media/film/poster.jpg"],
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${bodoni.variable} ${geist.variable} ${geistMono.variable}`}>
      <body className="bg-ink font-sans text-ivory">
        <SmoothScroll />
        {children}
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
