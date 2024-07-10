import { SidebarContent } from "./sidebar-content"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet"

export function SidebarMobile() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <button className="fixed top-3 left-3">open</button>
            </SheetTrigger>
            <SheetContent side={"left"} className="h-screen">
                <SidebarContent />
            </SheetContent>
        </Sheet>
    )
}
