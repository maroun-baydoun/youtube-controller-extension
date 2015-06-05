(function() {
  chrome.tabs.query({
    url: "https://www.youtube.com/watch*"
  }, function(tabs) {

    var notice = document.getElementById('notice'),
      body = document.querySelector('body');

    if (tabs.length === 1) {

      var tabId = tabs[0].id;
      controlVideo(tabId, function(paused) {

        window.close();

      });

    } else if (tabs.length > 0) {

      body.removeChild(notice);

      var videoList = document.getElementById('video-list'),
        youtubeTitleEnding = "- YouTube",
        youtubeTitleEndingLength = youtubeTitleEnding.length,
        processedTabsCount = 0;


      tabs.forEach(function(tab) {
        var videoListItem = document.createElement("li"),
          videoListItemText = document.createElement("span"),
          videoControl = document.createElement("a"),
          videoControlText = "",
          tabId = tab.id,
          tabTitle = tab.title;


        if (tabTitle.substring(tabTitle.length - youtubeTitleEndingLength, tabTitle.length) === youtubeTitleEnding) {
          tabTitle = tabTitle.substring(0, tabTitle.length - youtubeTitleEndingLength).trim();
        }

        chrome.tabs.executeScript(tabId, {
          code: 'var video = document.querySelector("video");' +
            'video.paused;'
        }, function(result) {

          videoControlClass = (result[0] === true) ? "fa-play" : "fa-pause";

          videoControl.classList.add("fa");
          videoControl.classList.add(videoControlClass);
          videoControl.addEventListener("click", videoControlClicked);
          videoListItemText.textContent = tabTitle;
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

    } else {

      notice.classList.remove("hidden");
    }

  });

  function controlVideo(tabId, callback) {
    chrome.tabs.executeScript(tabId, {
      code: 'var video = document.querySelector("video");' +
        'if (video.paused){video.play();} else {video.pause();}' +
        'video.paused;'
    }, function(result) {
      if (callback) {
        callback(result[0]);
      }
    });
  }

  function videoControlClicked(event) {
    event.stopPropagation();
    var tabId = parseInt(this.parentNode.dataset.tabId);
    controlVideo(tabId, function(paused) {
      var videoListItem = document.querySelector("li[data-tab-id=\"" + tabId + "\"]"),
        videoControl = videoListItem.querySelector("a");

      videoControlClassToAdd = paused ? "fa-play" : "fa-pause";
      videoControlClassToRemove = videoControlClassToAdd === "fa-pause" ? "fa-play" : "fa-pause";

      videoControl.classList.add(videoControlClassToAdd);
      videoControl.classList.remove(videoControlClassToRemove);

    });
  }

  function videoItemClicked(event) {
    var tabId = parseInt(this.parentNode.dataset.tabId);
    chrome.tabs.update(tabId, {
      selected: true
    });
  }
})();
