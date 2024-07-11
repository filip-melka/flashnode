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
import { useEffect } from "react"
import { FlashcardsSet, useFlashcards } from "@/lib/flashcardsContext"

export default function Home() {
    const { addSets, sets, currentSet, setCurrentSet } = useFlashcards()

    function init() {
        const flashcardsSets: FlashcardsSet[] = data

        addSets(flashcardsSets)

        if (currentSet === null) {
            setCurrentSet(flashcardsSets[0])
            console.log("->", currentSet, flashcardsSets[0])
        }
    }

    function getNewFlashcards() {
        if (document.visibilityState === "visible") {
            console.log("get new flashcards")
        }
    }

    useEffect(() => {
        init()

        document.addEventListener("visibilitychange", getNewFlashcards)

        return () =>
            document.removeEventListener("visibilitychange", getNewFlashcards)
    }, [])

    return (
        <>
            {!currentSet ? (
                <main className="p-16">loading</main>
            ) : (
                <main className="sm:ml-sidebar -z-50 p-16 min-h-screen">
                    <div className="flex items-center justify-between mb-12 max-w-[750px] mx-auto">
                        <h2 className="text-xl font-semibold">
                            {currentSet.title}
                        </h2>
                        <div className="flex items-center gap-2">
                            <a href={currentSet.url} target="_blank">
                                <Button variant="link" className="p-1">
                                    <SiHashnode className="text-2xl" />
                                </Button>
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
                                    <Button
                                        variant="destructive"
                                        className="px-6"
                                    >
                                        Delete Set
                                    </Button>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <Flashcards />
                </main>
            )}
        </>
    )
}
