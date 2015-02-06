chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.query({
        url: "https://www.youtube.com/*"
    }, function(tabs) {
        tabs.forEach(function(tab) {
            chrome.tabs.executeScript(tab.id, {
                code: 'var playButton = document.querySelectorAll(".ytp-button-play")[0];var pauseButton =   document.querySelectorAll(".ytp-button-pause")[0]; if(playButton){playButton.click();}else if(pauseButton){pauseButton.click();}'
            });

        });

    });
});