import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeRegistry } from '../components/ThemeRegistry';
import Navbar from "../components/Navbar";
import DotsBackground from "../components/DotsBackground";
import AbstractDotsBackground from "../components/AbstractDotsBackground";
import "./globals.css";
import { isAbstractDotsBackground, isDotsBackground } from "../configs";

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
            { isAbstractDotsBackground && <AbstractDotsBackground
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
            /> }
            { isDotsBackground && <DotsBackground
              spacing={48}
              dotRadius={4}
              repulsionRadius={120}
              repulsionStrength={80}
            /> }
          </div>
          <Navbar></Navbar>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
