"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Flashcard = {
    front: string
    back: string
}

export interface FlashcardsSet {
    url: string
    title: string
    flashcards: Flashcard[]
}

interface FlashcardsContextInterface {
    sets: FlashcardsSet[]
    currentSet: FlashcardsSet | null
    addSets: (sets: FlashcardsSet[]) => void
    removeSet: (set: FlashcardsSet) => void
    setCurrentSet: (set: FlashcardsSet) => void
}

const FlashcardsContext = createContext<FlashcardsContextInterface>(
    {} as FlashcardsContextInterface
)

export const FlashcardsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [sets, setSets] = useState<FlashcardsSet[]>([])
    const [currentSet, setCurrentSet] = useState<FlashcardsSet | null>(null)

    function addSets(sets: FlashcardsSet[]) {
        setSets((current) => [...sets, ...current])
    }
    function removeSet(set: FlashcardsSet) {}

    return (
        <FlashcardsContext.Provider
            value={{ sets, currentSet, addSets, removeSet, setCurrentSet }}
        >
            {children}
        </FlashcardsContext.Provider>
    )
}

export const useFlashcards = () => {
    const context = useContext(FlashcardsContext)

    return context
}
