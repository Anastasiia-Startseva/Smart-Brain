import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Современный шрифт
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "SmartBrain — AI Notes",
  description: "Интеллектуальная система управления заметками нового поколения",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}