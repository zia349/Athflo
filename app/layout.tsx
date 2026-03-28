import type { Metadata } from "next";
import { Geist, Geist_Mono, Teko } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const athfloDisplay = Teko({
  variable: "--font-athflo-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Athflo MoodCheck | Wellness Check-In For College Teams",
  description:
    "Athflo MoodCheck helps college teams run 30-second pre-practice wellness check-ins so coaches can better understand team morale and athlete readiness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${athfloDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
