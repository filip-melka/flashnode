import { data } from "@/lib/dummy-data"
import Image from "next/image"
import { SiHashnode, SiOpenai } from "react-icons/si"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Tooltip, TooltipContent, TooltipProvider } from "./ui/tooltip"
import { TooltipTrigger } from "@radix-ui/react-tooltip"
import { Separator } from "./ui/separator"

export function SidebarContent() {
    return (
        <div className="h-screen w-full p-8 flex flex-col">
            <div className="flex items-center gap-2">
                <Image src="logo.svg" width={30} height={30} alt="Logo" />
                <h1 className="font-bold text-lg">Flashnode</h1>
            </div>
            <Separator className="mt-4 mb-7" />
            <span className="text-sm opacity-70 mb-1">Articles</span>
            <div className="max-h-full flex-1 overflow-y-auto hide-scrollbar">
                {data.map((article) => (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="w-full mt-2">
                                <Button
                                    variant="ghost"
                                    className="w-full flex items-center justify-between gap-2"
                                >
                                    <span className="text-ellipsis overflow-hidden">
                                        {article.title}
                                    </span>
                                    <Badge variant="secondary">
                                        {article.flashcards.length}
                                    </Badge>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent
                                side="right"
                                className="hidden sm:block"
                            >
                                <p>{article.title}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                ))}
            </div>
            <div className="flex flex-col items-center gap-2 mt-6 mb-4 sm:mb-0">
                <span className="text-xs opacity-70">Made possible by</span>
                <div className="bg-black/5 flex items-center justify-center text-2xl gap-4 p-2 rounded-full">
                    <SiHashnode className="text-primary" />
                    <SiOpenai />
                </div>
            </div>
        </div>
    )
}
