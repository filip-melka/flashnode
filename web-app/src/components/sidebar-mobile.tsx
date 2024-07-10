import { SidebarContent } from "./sidebar-content"
import { Button } from "./ui/button"
import { HiMenuAlt4 } from "react-icons/hi"
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
                <Button variant="ghost" className="fixed top-3 left-3">
                    <HiMenuAlt4 />
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"}>
                <SidebarContent />
            </SheetContent>
        </Sheet>
    )
}
