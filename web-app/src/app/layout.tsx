import type { Metadata } from "next"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

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
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ThemeToggle />
                    {children}
                    <Sidebar />
                </ThemeProvider>
            </body>
        </html>
    )
}
