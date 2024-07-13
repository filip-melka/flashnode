import { useEffect, useState } from "react"
import { Button } from "./ui/button"
import { AspectRatio } from "./ui/aspect-ratio"
import { GrNext, GrPrevious } from "react-icons/gr"
import { useFlashcards } from "@/lib/flashcardsContext"

export function Flashcards() {
    const { currentSet } = useFlashcards()
    const [index, setIndex] = useState(0)
    const [isFront, setIsFront] = useState(true)

    function flip() {
        setIsFront((current) => !current)
    }

    function changeIndex(val: -1 | 1) {
        setIsFront(true)
        setIndex((current) => current + val)
    }

    useEffect(() => {
        setIndex(0)
        setIsFront(true)
    }, [currentSet])

    return (
        <div className="flex static flex-col items-center gap-8">
            <div className="w-full lg:w-[80%] max-w-[500px]">
                <AspectRatio ratio={8 / 5}>
                    <div
                        onClick={flip}
                        className="cursor-pointer relative bg-card shadow rounded h-full w-full flex flex-col gap-2 text-center items-center justify-center p-8 overflow-y-auto hide-scrollbar"
                    >
                        <span className="absolute top-3 left-3 opacity-50 text-sm">
                            {isFront ? "front" : "back"}
                        </span>
                        {currentSet!.flashcards[index][
                            isFront ? "front" : "back"
                        ]
                            .split("\n")
                            .map((line) => (
                                <p>{line}</p>
                            ))}
                    </div>
                </AspectRatio>
            </div>
            <div className="flex items-center justify-center gap-8">
                <Button
                    variant="ghost"
                    onClick={() => changeIndex(-1)}
                    disabled={index <= 0}
                >
                    <GrPrevious />
                </Button>
                <p>
                    <span className="text-2xl pr-1">{index + 1}</span>
                    <span>/ {currentSet!.flashcards.length}</span>
                </p>
                <Button
                    variant="ghost"
                    onClick={() => changeIndex(1)}
                    disabled={index >= currentSet!.flashcards.length - 1}
                >
                    <GrNext />
                </Button>
            </div>
        </div>
    )
}
