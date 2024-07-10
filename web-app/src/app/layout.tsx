import type { Metadata } from "next"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"

export const metadata: Metadata = {
    title: "Flashnode",
    description: "AI-generated flashcards based on any Hashnode article",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body>
                {children}
                <Sidebar />
            </body>
        </html>
    )
}
