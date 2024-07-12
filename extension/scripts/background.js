import { retrieveAllFlashcards, retrieveNewFlashcards } from "./utils.js"

chrome.runtime.onMessage.addListener((req) => {
    setIsEnabled(req.isEnabled)
})

function setIsEnabled(isEnabled) {
    /* change extension icon */
    chrome.action.setIcon({
        path: isEnabled
            ? "../images/icon-16.png"
            : "../images/icon-16-disabled.png",
    })

    /* show appropriate popup */
    chrome.tabs.query({ active: true, currentWindow: true }, function (d) {
        chrome.action.setPopup({
            tabId: d[0].id,
            popup: isEnabled ? "popup.html" : "disabled-popup.html",
        })
    })
}

// listen for messages from the web app
chrome.runtime.onMessageExternal.addListener(
    async (request, sender, sendResponse) => {
        if (request.action === "getAllSets") {
            const flashcards = await retrieveAllFlashcards()
            sendResponse(flashcards)
        } else if (request.action === "getNewSets") {
            const flashcards = await retrieveNewFlashcards()
            sendResponse(flashcards)
        }
    }
)
