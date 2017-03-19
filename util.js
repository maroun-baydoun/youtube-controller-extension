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
                code: 'var video = document.getElementsByTagName("video")[0];' +
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
        videoPaused: function(tabId, callback) {
            chrome.tabs.executeScript(tabId, {
                code: 'var video = document.getElementsByTagName("video")[0];' +
                    'video.paused;'
            }, function(result) {
                var paused = true;
                if (result && result.length > 0) {
                    paused = result[0];
                }
                if (callback) {
                    callback(paused);
                }
            });
        }

    }
})(chrome)
