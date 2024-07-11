import { Button } from "./ui/button"
import { HiMenuAlt4 } from "react-icons/hi"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet"
import { useFlashcards } from "@/lib/flashcardsContext"
import { Badge } from "./ui/badge"
import Image from "next/image"
import { Separator } from "./ui/separator"
import { SiHashnode, SiOpenai } from "react-icons/si"

export function SidebarMobile() {
    const { sets, setCurrentSet } = useFlashcards()

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="fixed top-3 left-3">
                    <HiMenuAlt4 />
                </Button>
            </SheetTrigger>
            <SheetContent side={"left"}>
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
                            <SheetClose className="w-full">
                                <Button
                                    variant="ghost"
                                    className="w-full flex items-center justify-between gap-2"
                                    onClick={() => setCurrentSet(set)}
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
                    <div className="flex flex-col items-center gap-2 mt-6 mb-4 sm:mb-0">
                        <span className="text-xs opacity-70">
                            Made possible by
                        </span>
                        <div className="bg-black/5 flex items-center justify-center text-2xl gap-4 p-2 rounded-full">
                            <SiHashnode className="text-primary" />
                            <SiOpenai />
                        </div>
                    </div>
                </div>{" "}
            </SheetContent>
        </Sheet>
    )
}
