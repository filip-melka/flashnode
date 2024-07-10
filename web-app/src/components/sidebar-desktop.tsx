import { SidebarContent } from "./sidebar-content"

export function SidebarDesktop() {
    return (
        <aside className="w-sidebar fixed left-0 top-0 h-screen border-r">
            <SidebarContent />
        </aside>
    )
}
