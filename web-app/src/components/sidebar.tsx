"use client"

import { useMediaQuery } from "usehooks-ts"
import { SidebarDesktop } from "./sidebar-desktop"
import { SidebarMobile } from "./sidebar-mobile"
import { useFlashcards } from "@/lib/flashcardsContext"

export function Sidebar() {
    const isDesktop = useMediaQuery("(min-width: 800px)", {
        initializeWithValue: false,
    })
    const { currentSet } = useFlashcards()

    if (!currentSet) return <></>

    if (isDesktop) return <SidebarDesktop />

    return <SidebarMobile />
}
