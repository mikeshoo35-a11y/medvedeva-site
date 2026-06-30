import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    default: "Юлия Медведева — консалтинг в ВРТ/ЭКО",
    template: "%s | Юлия Медведева",
  },
  description:
    "Медико-бизнес консалтинг в области ВРТ/ЭКО и частных клиник под ключ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <SiteHeader />
        <main className="mx-auto w-full min-w-0 max-w-content flex-1 overflow-x-clip px-6 py-8 md:px-8">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
