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
                <Sidebar />
                <main className="sm:ml-sidebar bg-blue-300 px-4 py-12 sm:p-8 md:p-16">
                    {children}
                </main>
            </body>
        </html>
    )
}
