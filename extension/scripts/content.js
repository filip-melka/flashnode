window.addEventListener("focus", function () {
    checkPage()
})

const main = document.querySelector("main")
if (main) {
    main.style = "transition: filter 1s linear"
    main.style.overflowX = "hidden"
}

function blurPage() {
    if (main) {
        main.style.filter = "blur(3px)"
        main.addEventListener("click", unblurPage)
    }
}

function unblurPage() {
    if (main) {
        main.style.filter = "blur(0)"
        main.removeEventListener("click", unblurPage)
    }
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
