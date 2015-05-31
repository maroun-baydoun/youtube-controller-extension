window.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({
        url: "https://www.youtube.com/watch*"
    }, function (tabs) {

        var videoList = document.getElementById('video-list'),
            youtubeTitleEnding = "- YouTube",
            youtubeTitleEndingLength = youtubeTitleEnding.length;

        tabs.forEach(function (tab) {
            var videoListItem = document.createElement("li"),
                videoListItemText = document.createElement("span"),
                videoControl = document.createElement("button"),
                tabId = tab.id,
                tabTitle = tab.title;


            if (tabTitle.substring( tabTitle.length - youtubeTitleEndingLength, tabTitle.length ) === youtubeTitleEnding) {
                tabTitle = tabTitle.substring(0, tabTitle.length - youtubeTitleEndingLength).trim();
            }

            videoControl.classList.add("videoControlButton");
            videoControl.appendChild(document.createTextNode("Play/Pause"));
            videoControl.addEventListener("click",videoControlClicked);
            videoListItemText.appendChild(document.createTextNode(tabTitle));
            videoListItemText.addEventListener("click",videoNameClicked);
            videoListItem.appendChild(videoListItemText);
            videoListItem.appendChild(videoControl);
            videoListItem.dataset.tabId = tabId;
            videoList.appendChild(videoListItem);
        });

    });

});

function videoControlClicked() {
   var tabId = parseInt(this.parentNode.dataset.tabId);
   chrome.tabs.executeScript(tabId, {
                code: 'var playButton = document.querySelectorAll(".ytp-button-play")[0];'+
                      'var pauseButton =   document.querySelectorAll(".ytp-button-pause")[0];'+
                      'if(playButton){playButton.click();}else if(pauseButton){pauseButton.click();}'
            }, function(a){console.log(a);});
}

function videoNameClicked() {
  var tabId = parseInt(this.parentNode.dataset.tabId);
  chrome.tabs.update(tabId, {selected: true});
}
