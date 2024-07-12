import { FlashcardSet } from "./classes.js"

export async function retrieveAllFlashcards() {
    const { all: urls } = await chrome.storage.local.get("all")
    if (urls && urls.length > 0) {
        const sets = await chrome.storage.local.get(urls)
        const flashcardsSets = []

        Object.keys(sets).forEach((url) => {
            const set = sets[url]
            const flashcardsSet = {
                url,
                title: set.title,
                flashcards: set.flashcards,
            }
            flashcardsSets.push(flashcardsSet)
        })

        return flashcardsSets
    } else {
        return []
    }
}

export async function retrieveFlashcards(url) {
    const set = await chrome.storage.local.get([url])
    return set[url]
}

export function saveFlashcards(flashcardsSet) {
    const url = flashcardsSet.url
    const set = {}
    set[url] = {
        title: flashcardsSet.title,
        flashcards: flashcardsSet.flashcards,
    }
    chrome.storage.local.set(set)
    addToList("all", url)
    addToList("new", url)
}

export function removeFlashcards(url) {
    chrome.storage.local.remove(url)
    removeFromList("all", url)
    removeFromList("new", url)
}

export function addToList(list, url) {
    chrome.storage.local.get(list, (res) => {
        const urls = res[list] || []
        urls.push(url)

        const obj = {}
        obj[list] = urls

        chrome.storage.local.set(obj)
    })
}

export function removeFromList(list, url) {
    chrome.storage.local.get(list, (res) => {
        const urls = res[list].filter((e) => e !== url) || []

        const obj = {}
        obj[list] = urls

        chrome.storage.local.set(obj)
    })
}
