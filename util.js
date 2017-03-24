"use strict";
var Util = (function(chrome) {
    return {
        queryTabs: function(callback) {
            chrome.tabs.query({
                url: "*://*.youtube.com/watch*"
            }, function(tabs) {
                if (callback) {
                    callback(tabs);
                }
            });
        },
        toggleVideo: function(tabId, callback) {
            chrome.tabs.executeScript(tabId, {
                code: 'var video = document.querySelector("video");' +
                    'if (video.paused){video.play();} else {video.pause();}' +
                    'video.paused;'
            }, function(result) {
                if (callback) {
                    callback(result[0]);
                }
            });
        },
        toggleTab: function(tabId, selected) {
            chrome.tabs.update(tabId, {
                selected: selected
            });
        },
        getVideo: function(tabId, callback) {
            chrome.tabs.executeScript(tabId, {
                code: 'var video = document.querySelector("video");' +
                    'var result = {"paused":video.paused, "volume":video.volume, "muted": video.muted};' +
                    'result;'
            }, function(result) {
                var video = undefined;
                if (result && result.length > 0) {
                    video = result[0];
                }
                if (callback) {
                    callback(video);
                }
            });
        }

    }
})(chrome)
