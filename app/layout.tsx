import type React from "react"
import type { Metadata } from "next"
import { CartProvider } from "@/contexts/cart-context"
import "@/styles/globals.scss"

export const metadata: Metadata = {
    title: "SOOM - 카페 키오스크",
    description: "감성적이고 직관적인 카페 키오스크 시스템",
    keywords: ["카페", "키오스크", "주문", "커피", "음료"],
    authors: [{ name: "SOOM Team" }],
    viewport: "width=device-width, initial-scale=1",
    robots: "index, follow",
    openGraph: {
        title: "SOOM - 카페 키오스크",
        description: "감성적이고 직관적인 카페 키오스크 시스템",
        type: "website",
        locale: "ko_KR",
    },
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ko">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="icon" href="/favicon.ico" />
            <meta name="theme-color" content="#8B4513" />
        </head>
        <body>
        <CartProvider>{children}</CartProvider>
        </body>
        </html>
    )
}
