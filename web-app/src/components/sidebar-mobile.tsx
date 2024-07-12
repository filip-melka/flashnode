import { Button } from "./ui/button"
import { HiMenuAlt4 } from "react-icons/hi"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "./ui/sheet"
import { useFlashcards } from "@/lib/flashcardsContext"
import { Badge } from "./ui/badge"
import Image from "next/image"
import { Separator } from "./ui/separator"
import { SidebarFooter } from "./sidebar-footer"

export function SidebarMobile() {
    const { sets, currentSet, setCurrentSet } = useFlashcards()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="fixed top-3 left-3">
                    <HiMenuAlt4 />
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"}>
                <SheetTitle hidden>Flashnode</SheetTitle>
                <div className="h-screen w-full p-8 flex flex-col">
                    <div className="flex items-center gap-2">
                        <Image
                            src="logo.svg"
                            width={30}
                            height={30}
                            alt="Logo"
                        />
                        <h1 className="font-bold text-lg">Flashnode</h1>
                    </div>
                    <Separator className="mt-4 mb-7" />
                    <span className="text-sm opacity-70 mb-1">Articles</span>
                    <div className="max-h-full flex-1 overflow-y-auto hide-scrollbar">
                        {sets.map((set) => (
                            <SheetClose
                                key={set.url}
                                className="w-full"
                                asChild
                            >
                                <Button
                                    variant="ghost"
                                    className="w-full flex items-center justify-between gap-2 disabled:opacity-100 disabled:bg-accent"
                                    onClick={() => setCurrentSet(set)}
                                    disabled={currentSet?.url === set.url}
                                >
                                    <span className="text-ellipsis overflow-hidden">
                                        {set.title}
                                    </span>
                                    <Badge variant="secondary">
                                        {set.flashcards.length}
                                    </Badge>
                                </Button>
                            </SheetClose>
                        ))}
                    </div>
                    <SidebarFooter />
                </div>
            </SheetContent>
        </Sheet>
    )
}
