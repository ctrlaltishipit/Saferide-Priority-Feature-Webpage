import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saferidepriorityuber.vercel.app"),
  title: {
    default: "SafeRide Priority: a women's safety layer for late-night Uber rides in India",
    template: "%s · SafeRide Priority",
  },
  description:
    "A product management case study: women's safety and cab reliability for late-night rides in Hyderabad. Real evidence, four chapters (problem, solution, business model, ask), an 8-screen interactive prototype, and a pilot plan with labelled assumptions. An independent concept with no affiliation to Uber.",
  authors: [{ name: "Dixita Sreerala", url: "https://www.linkedin.com/in/deekshitha-sreerala/" }],
  creator: "Dixita Sreerala",
  keywords: [
    "women safety ride hailing India",
    "late night cab safety Hyderabad",
    "Uber safety feature concept",
    "product manager case study",
    "business case for a feature",
    "committed pickup driver cancellation",
    "trusted contact trip sharing",
    "safer drop point",
    "T-Safe Hyderabad",
    "interactive prototype PM portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "SafeRide Priority: the late-night ride, planned safer.",
    description:
      "Every night, she builds her own safety plan. A PM case study with real evidence, a business model with labelled assumptions, and an 8-screen interactive prototype.",
    type: "website",
    url: "/",
    siteName: "SafeRide Priority",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "SafeRide Priority: the late-night ride, planned safer.",
    description: "A women's safety and reliability layer for late-night cab rides in Hyderabad. Case study and interactive prototype.",
  },
  robots: { index: true, follow: true },
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
