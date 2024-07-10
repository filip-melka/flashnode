"use client"

import { useMediaQuery } from "usehooks-ts"
import { SidebarDesktop } from "./sidebar-desktop"
import { SidebarMobile } from "./sidebar-mobile"

export function Sidebar() {
    const isDesktop = useMediaQuery("(min-width: 640px)", {
        initializeWithValue: false,
    })

    if (isDesktop) return <SidebarDesktop />

    return <SidebarMobile />
}
