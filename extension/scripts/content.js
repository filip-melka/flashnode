window.addEventListener("focus", function () {
    checkPage()
})

const body = document.getElementsByTagName("body")[0]
body.style = "transition: filter 1s linear"

function blurPage() {
    body.style.filter = "blur(3px)"
    body.style.overflowX = "hidden"
    body.addEventListener("click", unblurPage)
}

function unblurPage() {
    body.style.filter = "blur(0)"
    body.removeEventListener("click", unblurPage)
}

// user opens a different tab
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState == "hidden") {
        unblurPage()
    }
})

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === "getURL") {
        // blur the page
        blurPage()

        // send back the URL
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
