export class Flashcard {
    constructor({ front, back }) {
        this.front = front
        this.back = back
    }
}

export class FlashcardSet {
    constructor({ url, title, flashcards }) {
        this.url = url
        this.flashcards = flashcards
        this.nextFlashcardIndex = 0
    }

    next() {
        const nextFlashcard =
            this.nextFlashcardIndex >= this.flashcards.length
                ? null
                : this.flashcards[this.nextFlashcardIndex]
        this.nextFlashcardIndex++
        return nextFlashcard
    }
}
