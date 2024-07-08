window.addEventListener("focus", function () {
    checkPage()
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getURL") {
        sendResponse({
            url: window.location.href,
        })
    }
})

function isHashnode() {
    const links = document.getElementsByTagName("link")
    for (let link of links) {
        if (link.rel === "author" && link.href.includes("hashnode")) {
            return true
        }
    }

    return null
}

function checkPage() {
    if (chrome.runtime?.id) {
        chrome.runtime.sendMessage({
            isEnabled: isHashnode(),
        })
    }
}

checkPage()
