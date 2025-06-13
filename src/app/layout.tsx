import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeRegistry } from '../components/ThemeRegistry';
import DesktopNavbar from "../components/DesktopNavbar";
import MobileNavbar from "../components/MobileNavbar";
import DotsBackground from "../components/DotsBackground";
import NoiseCanvas from "../components/NoiseCanvas";
import AbstractDotsBackground from "../components/AbstractDotsBackground";
import GlowingBackground from "../components/GlowingBackground";
import "./globals.css";
import { isAbstractDotsBackground, isDotsBackground, isNoiseCanvas, isGlowingBackground } from "../configs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Jainil Chauhan Portfolio",
//   viewport: "width=device-width, initial-scale=1.0",
// };
export const metadata: Metadata = {
  title: "Jainil Chauhan Portfolio"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning className="dark" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeRegistry>
          <div className="relative">
            {isAbstractDotsBackground && <AbstractDotsBackground
              spacing={60}
              dotRadius={1}
              repulsionRadius={150}
              repulsionStrength={100}
              palette={[
                '#FF6B6B', '#6BCB77', '#4D96FF',
                '#FFE066', '#845EC2', '#00C9A7',
              ]}
              driftSpeed={0.015}
              maxSpeed={0.4}
            />}
            {isDotsBackground && <DotsBackground
              spacing={48}
              dotRadius={4}
              repulsionRadius={120}
              repulsionStrength={80}
            />}
            {isNoiseCanvas && <div className="absolute w-full h-screen">
              {/* Your other content here… */}
              <NoiseCanvas animate={true} opacity={10} />
            </div>}
            { isGlowingBackground && <div className="absolute w-full h-screen">
              <GlowingBackground />
            </div>

            }
          </div>
          <DesktopNavbar></DesktopNavbar>
          <MobileNavbar></MobileNavbar>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
