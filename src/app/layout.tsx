import type { Metadata } from "next";
import {
  Cinzel,
  Inter,
  Playfair_Display,
  Source_Serif_4,
} from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const sourceSerif4 = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pragya — Read. Reflect. Retain.",
  description:
    "A calm, scholarly digital library for reading, reflection, and personal knowledge retention.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} ${cinzel.variable} ${sourceSerif4.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#101827] text-[#F5F0E6] selection:bg-[#D4AF37]/25 selection:text-[#F5F0E6]">
        {children}
      </body>
    </html>
  );
}
