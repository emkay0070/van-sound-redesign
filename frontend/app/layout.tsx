import type { Metadata } from "next";
import { Bebas_Neue, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ConceptBanner from "@/components/ui/ConceptBanner";

// Display font — Bebas Neue: bold, cinematic, editorial 
const display = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
});

// Body — Inter: clean, highly legible
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Labels/UI — Space Grotesk: modern, technical
const label = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-label",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VAN SOUND EVENTS — Premium Event Production, Uganda",
  description:
    "Sound, lighting, staging and entertainment production in Kampala, Uganda. We build the energy behind the moment.",
  keywords: ["event production", "sound system", "lighting", "staging", "Uganda", "Kampala", "live events"],
  openGraph: {
    title: "VAN SOUND EVENTS",
    description: "We make the room come alive. Premium event production in Uganda.",
    type: "website",
  },
  icons: {
    icon: "/images/vansound%20logo.webp",
    apple: "/images/vansound%20logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${display.variable} ${sans.variable} ${label.variable} antialiased`}
      >
        <ThemeProvider>
          <SmoothScroll>{children}</SmoothScroll>
          {/* Concept review notice — intro modal + bottom-right reminder */}
          <ConceptBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
