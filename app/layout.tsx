import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import { Providers } from "@/components/providers";
import { getLocale, getMessages } from "next-intl/server";
import { auth } from "@/app/_lib/auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Habitual",
  description: "Build better habits, one day at a time",
};

export const viewport = {
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [locale, messages, session] = await Promise.all([
    getLocale(),
    getMessages(),
    auth(),
  ]);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} antialiased`}
      >
        <Providers locale={locale} messages={messages} session={session}>{children}</Providers>
      </body>
    </html>
  );
}
