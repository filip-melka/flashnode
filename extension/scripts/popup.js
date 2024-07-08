import { fetchMarkdown } from "./hashnode.js"

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "getURL" }, (res) => {
        main(res.url)
    })
})

const closeBtn = document.getElementById("btn-close")
closeBtn.addEventListener("click", () => window.close())

async function main(url) {
    const host = new URL(url).host
    const slug = url.substring(url.lastIndexOf("/") + 1)
    const { title, markdown } = await fetchMarkdown(slug, host)
    console.log(title)
}

function showError() {}
