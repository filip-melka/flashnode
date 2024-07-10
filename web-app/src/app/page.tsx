"use client"

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { data } from "@/lib/dummy-data"
import { SiHashnode } from "react-icons/si"
import { FiMoreVertical } from "react-icons/fi"
import { Flashcards } from "@/components/flashcards"

export default function Home() {
    const article = data[0]
    return (
        <main className="sm:ml-sidebar -z-50 p-16 min-h-screen">
            <div className="flex items-center justify-between mb-12">
                <h2 className="text-xl font-semibold">{article.title}</h2>
                <div className="flex items-center gap-4">
                    <a href={article.url} target="_blank">
                        <SiHashnode className="text-2xl" />
                    </a>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                className="rounded-full p-0 h-8 w-8"
                            >
                                <FiMoreVertical className="text-2xl" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-1 w-fit">
                            <Button variant="destructive" className="px-6">
                                Delete Set
                            </Button>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <Flashcards flashcards={article.flashcards} />
        </main>
    )
}
