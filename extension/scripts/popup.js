import { FlashcardSet } from "./classes.js"
import { fetchFlashcards } from "./openai.js"
import { fetchMarkdown } from "./hashnode.js"
import {
    removeFlashcards,
    retrieveFlashcards,
    saveFlashcards,
} from "./utils.js"

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getURL" }, (res) => {
        main(res.url)
    })
})

const closeBtn = document.getElementById("btn-close")
closeBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: "unblur" }, () => {
            window.close()
        })
    })
})

const progressBar = document.getElementById("bar")
const flashcard = document.getElementById("flashcard")
const flashcardContent = document.getElementById("flashcard-content")
const nextBtn = document.getElementById("btn-next")
const saveContainer = document.getElementById("save-container")
const saveToggle = document.getElementById("save-btn")
const saveStatus = document.getElementById("save-status")
const summaryMsg = document.getElementById("summary-message")

const tabs = {
    loader: document.getElementById("loader-tab"),
    flashcards: document.getElementById("flashcards-tab"),
    summary: document.getElementById("summary-tab"),
    error: document.getElementById("error-tab"),
}
let activeTab = tabs.loader
let currentSide = "front"
let flashcardsSet
let currentFlashcard

async function main(url) {
    try {
        // check whether flashcards for this article are already saved
        const saved = await retrieveFlashcards(url)
        if (saved) {
            flashcardsSet = new FlashcardSet({
                url,
                title: saved.title,
                flashcards: saved.flashcards,
            })

            // disable 'save' toggle
            saveContainer.innerHTML = `<span id="save-status">Saved</span>`
        } else {
            const host = new URL(url).host
            const slug = url.substring(url.lastIndexOf("/") + 1)

            // fetch title & markdown
            const { title, markdown } = await fetchMarkdown(slug, host)

            // fetch flashcards
            flashcardsSet = await fetchFlashcards(markdown, url, title)

            // save the flashcards
            saveFlashcards(flashcardsSet)
        }

        displayFlashcards()
    } catch (error) {
        console.log(error)
        showError()
    }
}

function displayFlashcards() {
    saveContainer.classList.remove("hidden")
    nextFlashcard()
    changeTab(tabs.flashcards)
}

function nextFlashcard() {
    nextBtn.classList.add("placeholder")
    currentFlashcard = flashcardsSet.next()
    if (currentFlashcard) {
        progressBar.style.width = `${Math.floor(
            (flashcardsSet.getFlashcardNo() / flashcardsSet.flashcards.length) *
                100
        )}%`
        currentSide = "front"
        flashcardContent.innerHTML = currentFlashcard[currentSide]
        flashcard.className = "appear"
    } else {
        changeTab(tabs.summary)
    }
}

flashcard.addEventListener("click", () => {
    nextBtn.classList.remove("placeholder")
    currentSide = currentSide === "front" ? "back" : "front"
    flashcardContent.innerText = currentFlashcard[currentSide]
})
flashcard.addEventListener("animationend", () => {
    flashcard.classList.remove("appear")
})
saveToggle.addEventListener("click", () => {
    if (saveToggle.classList.contains("off")) {
        saveStatus.innerText = "Save"
        saveToggle.classList.remove("off")
        summaryMsg.innerHTML = "<p>Your Flashcards have been saved</p>"
        // save flashcards
        saveFlashcards(flashcardsSet)
    } else {
        saveStatus.innerText = "Don't save"
        saveToggle.classList.add("off")
        summaryMsg.innerHTML = `<img src="images/warning-icon.svg" alt="Warning" /><p>Your Flashcards are not saved</p>`
        // remove flashcards from storage
        removeFlashcards(flashcardsSet.url)
    }
})

nextBtn.addEventListener("click", nextFlashcard)

function showError() {
    changeTab(tabs.error)
}

function changeTab(newTab) {
    activeTab.classList.add("hidden")
    activeTab = newTab
    activeTab.classList.remove("hidden")
}
