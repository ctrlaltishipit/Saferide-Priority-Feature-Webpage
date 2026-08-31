import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "SafeRide Priority · Uber feature concept",
  description:
    "A safety planning layer for the Uber rider app: contextual guidance, live trip sharing with trusted contacts, safer pickup and drop points, and a vetted driver match for late-night rides. Independent portfolio concept, not affiliated with Uber.",
  keywords: [
    "SafeRide Priority",
    "ride hailing safety",
    "late night cab safety",
    "product design case study",
    "Uber feature concept",
  ],
  openGraph: {
    title: "SafeRide Priority: The late-night ride, planned safer.",
    description:
      "A product design case study on women's safety in ride hailing. Walk the 7-step interactive prototype.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
