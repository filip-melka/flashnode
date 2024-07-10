"use client"

import { createContext, useContext, useState } from "react"

type Flashcard = {
    front: string
    back: string
}

interface FlashcardsSet {
    url: string
    title: string
    flashcards: Flashcard[]
}

interface FlashcardsContextInterface {
    sets: FlashcardsSet[]
    currentSet: FlashcardsSet | null
    addSets: (sets: FlashcardsSet[]) => void
    removeSet: (set: FlashcardsSet) => void
}

const FlashcardsContext = createContext<FlashcardsContextInterface | undefined>(
    undefined
)

export const FlashcardsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [sets, setSets] = useState<FlashcardsSet[]>([])
    const [currentSet, setCurrentSet] = useState<FlashcardsSet | null>(null)

    function addSets(sets: FlashcardsSet[]) {}
    function removeSet(set: FlashcardsSet) {}

    return (
        <FlashcardsContext.Provider
            value={{ sets, currentSet, addSets, removeSet }}
        >
            {children}
        </FlashcardsContext.Provider>
    )
}

export const useFlashcards = () => {
    const context = useContext(FlashcardsContext)

    return context
}
