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

chrome.runtime.onMessageExternal.addListener(
    (request, sender, sendResponse) => {
        if (request.action === "getAllSets") {
            sendResponse("all sets")
        } else if (request.action === "getNewSets") {
            sendResponse("new sets")
        }
    }
)
