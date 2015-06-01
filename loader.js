window.addEventListener('DOMContentLoaded', function() {
  chrome.tabs.query({
    url: "https://www.youtube.com/watch*"
  }, function(tabs) {

    var videoList = document.getElementById('video-list'),
      notice = document.getElementById('notice'),
      youtubeTitleEnding = "- YouTube",
      youtubeTitleEndingLength = youtubeTitleEnding.length;

    if (tabs.length > 0) {
      notice.classList.add("hidden");
      videoList.classList.remove("hidden");
    }

    tabs.forEach(function(tab) {
      var videoListItem = document.createElement("li"),
        videoListItemText = document.createElement("span"),
        videoControl = document.createElement("button"),
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

        videoControlText = (result[0] === true) ? "Play" : "Pause";

        videoControl.classList.add("videoControlButton");
        videoControl.textContent = videoControlText;
        videoControl.addEventListener("click", videoControlClicked);
        videoListItemText.appendChild(document.createTextNode(tabTitle));
        videoListItemText.addEventListener("click", videoNameClicked);
        videoListItem.appendChild(videoListItemText);
        videoListItem.appendChild(videoControl);
        videoListItem.dataset.tabId = tabId;
        videoList.appendChild(videoListItem);
      });

    });

  });

});

function videoControlClicked() {
  var tabId = parseInt(this.parentNode.dataset.tabId);
  chrome.tabs.executeScript(tabId, {
    code: 'var video = document.querySelector("video");' +
      'if (video.paused){video.play();} else {video.pause();}'+
      'video.paused;'
  }, function(result) {
      var paused = (result[0] === true),
          videoListItem = document.querySelector("li[data-tab-id=\""+tabId+"\"]"),
          videoControl  = videoListItem.querySelector("button");

      videoControl.textContent = paused?"Play":"Pause";
  });
}

function videoNameClicked() {
  var tabId = parseInt(this.parentNode.dataset.tabId);
  chrome.tabs.update(tabId, {
    selected: true
  });
}
