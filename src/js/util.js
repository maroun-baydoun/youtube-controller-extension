
export const queryTabs = (callback) => {
    chrome.tabs.query({
        url: "*://*.youtube.com/watch*"
    }, function (tabs) {
        if (callback) {
            callback(tabs);
        }
    });
};

export const toggleVideoPlayBack = (tabId, callback) => {
    chrome.tabs.executeScript(tabId, {
        code: 'var video = document.querySelector("video");' +
            'if (video.paused){video.play();} else {video.pause();}' +
            'video.paused;'
    }, function (result) {
        if (callback) {
            callback(result[0]);
        }
    });
};

export const toggleVideoMute = (tabId, callback) => {
    chrome.tabs.executeScript(tabId, {
        code: 'var video = document.querySelector("video");' +
            'video.muted = !video.muted;' +
            'video.muted;'
    }, function (result) {
        if (callback) {
            callback(result[0]);
        }
    });
};

export const toggleTab = (tabId, selected) => {
    chrome.tabs.update(tabId, {
        selected: selected
    });
};

export const getVideo = (tabId, callback) => {
    chrome.tabs.executeScript(tabId, {
        code: 'var video = document.querySelector("video");' +
            'var result = {"paused":video.paused, "volume":video.volume, "muted": video.muted};' +
            'result;'
    }, function (result) {
        var video = undefined;
        if (result && result.length > 0) {
            video = result[0];
        }
        if (callback) {
            callback(video);
        }
    });
};
