import { useFlashcards } from "@/lib/flashcardsContext"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import Image from "next/image"
import { Separator } from "./ui/separator"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip"
import { SidebarFooter } from "./sidebar-footer"

export function SidebarDesktop() {
    const { sets, currentSet, setCurrentSet } = useFlashcards()

    return (
        <aside className="w-sidebar fixed left-0 top-0 h-screen border-r">
            <div className="h-screen w-full p-8 flex flex-col">
                <div className="flex items-center gap-2">
                    <Image src="logo.svg" width={30} height={30} alt="Logo" />
                    <h1 className="font-bold text-lg">Flashnode</h1>
                </div>
                <Separator className="mt-4 mb-7" />
                <span className="text-sm opacity-70 mb-1">Articles</span>
                <div className="max-h-full flex-1 overflow-y-auto hide-scrollbar">
                    <TooltipProvider>
                        {sets.map((set) => (
                            <Tooltip key={set.url}>
                                <TooltipTrigger className="w-full mt-2" asChild>
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
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    <p>{set.title}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                    </TooltipProvider>
                </div>
                <SidebarFooter />
            </div>
        </aside>
    )
}
