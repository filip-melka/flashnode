import { FlashcardSet } from "./classes.js"

export async function fetchFlashcards(markdown, url, title) {
    const res = await fetch("http://localhost:3000/api/openai", {
        method: "POST",
        body: JSON.stringify({ markdown, title }),
    })
    const { flashcards } = await res.json()

    return new FlashcardSet({ flashcards, url, title })
}
