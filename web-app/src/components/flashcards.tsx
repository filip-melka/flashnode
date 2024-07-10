import { useState } from "react"
import { Button } from "./ui/button"
import { AspectRatio } from "./ui/aspect-ratio"

type Flashcard = {
    front: string
    back: string
}

export function Flashcards({ flashcards }: { flashcards: Flashcard[] }) {
    const [index, setIndex] = useState(0)
    const [isFront, setIsFront] = useState(true)

    function flip() {
        setIsFront((current) => !current)
    }

    function changeIndex(val: -1 | 1) {
        setIsFront(true)
        setIndex((current) => current + val)
    }

    return (
        <div className="flex static flex-col items-center gap-8">
            <div className="bg-green-200 w-full lg:w-[80%] max-w-[500px]">
                <AspectRatio ratio={8 / 5}>
                    <div
                        onClick={flip}
                        className="cursor-pointer relative bg-white shadow rounded h-full w-full flex items-center justify-center p-8 overflow-y-auto hide-scrollbar"
                    >
                        <span className="absolute top-3 left-3 opacity-50 text-sm">
                            {isFront ? "front" : "back"}
                        </span>
                        <p>{flashcards[index][isFront ? "front" : "back"]}</p>
                    </div>
                </AspectRatio>
            </div>
            <div className="flex items-center justify-center gap-8">
                <Button onClick={() => changeIndex(-1)} disabled={index <= 0}>
                    Prev
                </Button>
                <p>
                    <span>{index + 1}</span>/3
                </p>
                <Button
                    onClick={() => changeIndex(1)}
                    disabled={index >= flashcards.length - 1}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}