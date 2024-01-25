import React, { useEffect } from "react"
import { Metadata } from "next"
import "styles/globals.css"
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://localhost:8000"
import type { AppProps } from "next/app"
import RootLayout from "app/layout" // Import RootLayout
import { RainbowWrapper } from "app/components/RainbowWrapper" // Import RainbowWrapper

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <RainbowWrapper>
          <main className="relative">{props.children}</main>
        </RainbowWrapper>
      </body>
    </html>
  )
}
