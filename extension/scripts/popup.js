import { fetchFlashcards } from "./dummyData.js"
import { fetchMarkdown } from "./hashnode.js"

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getURL" }, (res) => {
        main(res.url)
    })
})

const closeBtn = document.getElementById("btn-close")
closeBtn.addEventListener("click", () => window.close())

const tabs = {
    loader: document.getElementById("loader-tab"),
    error: document.getElementById("error-tab"),
}
let activeTab = tabs.loader

async function main(url) {
    try {
        const host = new URL(url).host
        const slug = url.substring(url.lastIndexOf("/") + 1)

        // fetch title & markdown
        const { title, markdown } = await fetchMarkdown(slug, host)

        // fetch flashcards
        const flashcardsSet = await fetchFlashcards(markdown, url, title)
    } catch (error) {
        console.log(error)
        showError()
    }
}

function showError() {
    changeTab(tabs.error)
}

function changeTab(newTab) {
    activeTab.classList.add("hidden")
    activeTab = newTab
    activeTab.classList.remove("hidden")
}
