window.addEventListener("focus", function () {
    checkPage()
})

const body = document.querySelector("body")
const overlay = document.createElement("div")
overlay.style =
    "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; transition: all 1s ease-out; z-index: 999;"

function blurPage() {
    body.appendChild(overlay)
    setTimeout(() => {
        overlay.style.backdropFilter = "blur(3px)"
        overlay.addEventListener("click", unblurPage)
    }, 200)
}

function unblurPage() {
    overlay.style.backdropFilter = "blur(0)"
    setTimeout(() => {
        overlay.remove()
    }, 1000)
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
            url: window.location.href.split("?")[0],
        })
    } else if (request.action === "unblur") {
        unblurPage()
        sendResponse()
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
