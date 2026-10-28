import type { Metadata } from "next";
import "./globals.css";
import GlobalContact from "@/components/GlobalContact";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const DESCRIPTION =
  "Jainil Chauhan is a senior frontend engineer who builds fast, accessible e-commerce experiences. Explore his work, projects, photography and Raspberry Pi tinkering.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jainil Chauhan — Senior Frontend Engineer",
    template: `%s — ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Jainil Chauhan — Senior Frontend Engineer",
    description: DESCRIPTION,
    url: "/",
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jainil Chauhan — Senior Frontend Engineer",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <GlobalContact />
      </body>
    </html>
  );
}
