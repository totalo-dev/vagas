import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";
import ConditionalFooter from "@/components/ConditionalFooter";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vagas - Oportunidades em Tecnologia",
  description: "Portal de divulgação de oportunidades em tecnologia com curadoria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <LenisProvider>
          <Navbar />
          <main className="main-content">
            {children}
          </main>
          <ConditionalFooter />
        </LenisProvider>
      </body>
    </html>
  );
}
