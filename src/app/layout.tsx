import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Сарыарқа Инжиниринг | Инженерные решения",
    template: "%s | Сарыарқа Инжиниринг",
  },
  description:
    "Сарыарқа Инжиниринг — ведущая инженерная компания Казахстана. Проектирование, электромонтаж, автоматизация и техническое обслуживание промышленных объектов.",
  keywords: [
    "инжиниринг",
    "проектирование",
    "электромонтаж",
    "автоматизация",
    "Казахстан",
    "Сарыарқа",
    "инженерные системы",
  ],
  authors: [{ name: "Сарыарқа Инжиниринг" }],
  creator: "Сарыарқа Инжиниринг",
  openGraph: {
    type: "website",
    locale: "ru_KZ",
    url: "https://saryarka-engineering.kz",
    siteName: "Сарыарқа Инжиниринг",
    title: "Сарыарқа Инжиниринг | Инженерные решения",
    description:
      "Ведущая инженерная компания Казахстана. Профессиональные решения для промышленных и гражданских объектов.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
