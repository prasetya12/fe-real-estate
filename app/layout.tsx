import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Provider from "./provider"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Real Estate Explorer",
  description: "Find your dream property with our real estate platform",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <Provider>
        <body className={`${inter.className} bg-white`}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </body>
      </Provider>

    </html>
  )
}
