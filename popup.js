(function(Util, chrome) {
    "use strict";

    Util.queryTabs(onQueryTabs);

    function onQueryTabs(tabs) {

        var notice = document.getElementById("notice");
        var body = document.querySelector("body");

        notice.innerHTML = chrome.i18n.getMessage("noVideos");

        if (tabs.length === 0) {
            noTabsReturned(notice);
        } else if (tabs.length === 1) {
            oneTabReturned(tabs[0]);
        } else {
            body.removeChild(notice);
            multipleTabsReturned(tabs);
        }
    }

    function noTabsReturned(notice) {
        notice.classList.remove("hidden");
    }

    function oneTabReturned(tab) {
        Util.toggleVideo(tab.id, function(paused) {
            window.close();
        });
    }

    function multipleTabsReturned(tabs, videoList) {
        var videoList = document.getElementById("video-list");
        var processedTabsCount = 0;

        tabs.forEach(function(tab) {
            var videoListItem = document.createElement("li");
            var videoListItemText = document.createElement("span");
            var videoControl = document.createElement("a");
            var tabId = tab.id;
            var tabTitle = processTabTitle(tab.title);

            Util.videoPaused(tabId, function(paused) {

                var videoControlClass = (paused === true) ? "fa-play" : "fa-pause";

                videoControl.classList.add("fa");
                videoControl.classList.add(videoControlClass);
                videoControl.addEventListener("click", videoControlClicked);
                videoListItemText.textContent = tabTitle;
                videoListItemText.title = chrome.i18n.getMessage("clickToGoToVideo");
                videoListItemText.addEventListener("click", videoItemClicked);
                videoListItem.appendChild(videoListItemText);
                videoListItem.appendChild(videoControl);
                videoListItem.dataset.tabId = tabId;
                videoList.appendChild(videoListItem);

                processedTabsCount++;

                if (processedTabsCount == tabs.length) {
                    setTimeout(function() {
                        videoList.classList.remove("hidden");
                    }, 300);
                }
            });

        });
    }

    function processTabTitle(title) {
        var youtubeTitleEnding = "- YouTube";
        if (title.substring(title.length - youtubeTitleEnding.length, title.length) === youtubeTitleEnding) {
            return title.substring(0, title.length - youtubeTitleEnding.length).trim();
        }
        return title;
    }

    function videoControlClicked(event) {
        event.stopPropagation();
        var tabId = parseInt(this.parentNode.dataset.tabId);
        Util.toggleVideo(tabId, function(paused) {
            var videoListItem = document.querySelector("li[data-tab-id=\"" + tabId + "\"]");
            var videoControl = videoListItem.querySelector("a");
            var videoControlClassToAdd = paused ? "fa-play" : "fa-pause";
            var videoControlClassToRemove = videoControlClassToAdd === "fa-pause" ? "fa-play" : "fa-pause";

            videoControl.classList.add(videoControlClassToAdd);
            videoControl.classList.remove(videoControlClassToRemove);

        });
    }

    function videoItemClicked(event) {
        var tabId = parseInt(this.parentNode.dataset.tabId);
        Util.toggleTab(tabId, true);
    }
})(Util, chrome);
