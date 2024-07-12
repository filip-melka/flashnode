"use client"

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { SiHashnode } from "react-icons/si"
import { FiMoreVertical } from "react-icons/fi"
import { Flashcards } from "@/components/flashcards"
import { useEffect, useState } from "react"
import { FlashcardsSet, useFlashcards } from "@/lib/flashcardsContext"
import Image from "next/image"
import { PopoverClose } from "@radix-ui/react-popover"

export default function Home() {
    const { addSets, currentSet, setCurrentSet, removeSet } = useFlashcards()
    const [isFetching, setIsFetching] = useState(true)

    function init() {
        if (
            typeof window !== "undefined" &&
            window.chrome &&
            window.chrome.runtime
        ) {
            window.chrome.runtime.sendMessage(
                process.env.NEXT_PUBLIC_EXTENSION_ID as string,
                { action: "getAllSets" },
                (newSets: FlashcardsSet[]) => {
                    addSets(newSets)

                    if (currentSet === null && newSets.length > 0) {
                        setCurrentSet(newSets[0])
                    }

                    setIsFetching(false)
                }
            )
        }
    }

    function getNewFlashcards() {
        if (document.visibilityState === "visible") {
            if (
                typeof window !== "undefined" &&
                window.chrome &&
                window.chrome.runtime
            ) {
                window.chrome.runtime.sendMessage(
                    process.env.NEXT_PUBLIC_EXTENSION_ID as string,
                    { action: "getNewSets" },
                    (newSets: FlashcardsSet[]) => {
                        addSets(newSets)

                        if (currentSet === null && newSets.length > 0) {
                            setCurrentSet(newSets[0])
                        }
                    }
                )
            }
        }
    }

    function removeCurrentSet() {
        const set = currentSet
        if (set) {
            removeSet(set)
        }
        window.chrome.runtime.sendMessage(
            process.env.NEXT_PUBLIC_EXTENSION_ID as string,
            { action: "removeSet", url: set?.url }
        )
    }

    useEffect(() => {
        init()

        document.addEventListener("visibilitychange", getNewFlashcards)

        return () =>
            document.removeEventListener("visibilitychange", getNewFlashcards)
    }, [])

    return (
        <>
            {isFetching ? (
                <main className="p-16 min-h-screen flex items-center justify-center">
                    <Image
                        src="loader.svg"
                        width={60}
                        height={60}
                        alt="Loader"
                        className="animate-spin"
                    />
                </main>
            ) : (
                <>
                    {!currentSet ? (
                        <main className="p-16 min-h-screen flex flex-col gap-8 items-center justify-center">
                            <p className="text-xl">
                                Looks like you don't have any flashcards yet 🤷‍♂️
                            </p>
                            <a href="https://hashnode.com/" target="_blank">
                                <Button
                                    variant="default"
                                    className="flex items-center gap-6 text-md"
                                >
                                    <span>Go to Hashnode</span>
                                    <SiHashnode />
                                </Button>
                            </a>
                        </main>
                    ) : (
                        <main className="sm:ml-sidebar -z-50 p-16 min-h-screen">
                            <div className="flex items-center gap-3 md:gap-5 justify-between mb-12 max-w-[750px] mx-auto">
                                <h2 className="text-lg sm:text-md lg:text-xl font-semibold">
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
                                            <PopoverClose>
                                                <Button
                                                    variant="destructive"
                                                    className="px-6"
                                                    onClick={removeCurrentSet}
                                                >
                                                    Delete Set
                                                </Button>
                                            </PopoverClose>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <Flashcards />
                        </main>
                    )}
                </>
            )}
        </>
    )
}
