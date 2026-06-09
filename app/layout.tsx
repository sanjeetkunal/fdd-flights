import type { Metadata } from "next";
import { Geist_Mono, Manrope, Sora } from "next/font/google";
import { CommonHeader } from "./components/common-header";
import "./globals.css";
import { CommonFooter } from "./components/common-footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkyBlock B2B | Fixed Departure Login",
  description: "B2B login for fixed departures, group fares, series blocks, and agency operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CommonHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <CommonFooter />
      </body>
    </html>
  );
}
