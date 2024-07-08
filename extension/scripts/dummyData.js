import { Flashcard, FlashcardSet } from "./classes.js"

export async function fetchFlashcards(markdown, url, title) {
    const res = await fetch(
        "https://opentdb.com/api.php?amount=4&type=multiple"
    )
    const { results } = await res.json()
    const flashcards = []

    results.forEach((q) => {
        flashcards.push(
            new Flashcard({ front: q.question, back: q.correct_answer })
        )
    })

    return new FlashcardSet({ flashcards, url, title })
}
