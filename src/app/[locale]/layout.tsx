import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import AnalyticsTracker from "@/components/ui/AnalyticsTracker";

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

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}>) {
  const {locale} = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <AnalyticsTracker />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
