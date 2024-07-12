import type { Metadata } from "next"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { FlashcardsProvider } from "@/lib/flashcardsContext"
import { Toaster } from "@/components/ui/toaster"

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
                <FlashcardsProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <ThemeToggle />
                        {children}
                        <Sidebar />
                        <Toaster />
                    </ThemeProvider>
                </FlashcardsProvider>
            </body>
        </html>
    )
}
