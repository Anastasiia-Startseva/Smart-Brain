import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin", "cyrillic"] })

export const metadata: Metadata = {
  title: "SmartBrain — AI Notes",
  description:
    "Интеллектуальное приложение для заметок с rich-text редактором, AI-чатом и быстрыми командами редактирования.",
  keywords: ["Next.js", "React", "TypeScript", "AI", "notes", "portfolio"],
  authors: [{ name: "Anastasiia Startseva" }],
  openGraph: {
    title: "SmartBrain — AI Notes",
    description: "AI-powered note-taking app built with Next.js, TipTap, and OpenAI.",
    type: "website",
    locale: "ru_RU",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
