window.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({
        url: "https://www.youtube.com/watch*"
    }, function (tabs) {
          
        var videList = document.getElementById('video-list');
        tabs.forEach(function (tab) {
            var videoListItem = document.createElement("li"),
                videoControl = document.createElement("button");
            
            videoControl.classList.add("videoControlButton");
            videoControl.dataset.tabId = tab.id;
            videoControl.appendChild(document.createTextNode("Play/Pause"));
            videoControl.addEventListener("click",videoControlClicked);
            
            videoListItem.appendChild(document.createTextNode(tab.title));
            
            videoListItem.appendChild(videoControl);
            videList.appendChild(videoListItem);
        });

    });

});

function videoControlClicked() {
   chrome.tabs.executeScript(parseInt(this.dataset.tabId), {
                code: 'var playButton = document.querySelectorAll(".ytp-button-play")[0];'+
                      'var pauseButton =   document.querySelectorAll(".ytp-button-pause")[0];'+
                      'if(playButton){playButton.click();}else if(pauseButton){pauseButton.click();}'
            }, function(a){console.log(a);});  
}