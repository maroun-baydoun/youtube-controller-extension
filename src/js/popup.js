import '../css/style.css';
import './zepto.min.js';

import { queryTabs, toggleVideoPlayBack, getVideo, toggleVideoMute, toggleTab } from './util';

$(document).ready(function () {

    queryTabs(onQueryTabs);

    function onQueryTabs(tabs) {

        var notice = $("#notice");

        notice.text(chrome.i18n.getMessage("noVideos"));

        if (tabs.length === 0) {
            noTabsReturned(notice);
        } else if (tabs.length === 1) {
            oneTabReturned(tabs[0]);
        } else {
            notice.remove();
            multipleTabsReturned(tabs);
        }
    }

    function noTabsReturned(notice) {
        notice.removeClass("hidden");
    }

    function oneTabReturned(tab) {
        window.close();
        toggleVideoPlayBack(tab.id);
    }

    function multipleTabsReturned(tabs) {
        var videoList = $("#video-list");
        var processedTabsCount = 0;

        videoList.on("click", "span.title", videoTitleSpanClicked);
        videoList.on("click", "a.play-back-control", videoPlayBackControlClicked);
        videoList.on("click", "a.mute-control", videoMuteControlClicked);

        tabs.forEach(function (tab) {
            var videoListItem = $("<li></li>");
            var videoTitleSpan = $("<span class='title'></span>");
            var playBackControl = $("<a class='fa play-back-control control'></a>");
            var muteControl = $("<a class='fa mute-control control'></a>");
            var controls = $("<div class='controls-container'></div>");
            var tabId = tab.id;
            var tabTitle = processTabTitle(tab.title);

            playBackControl.data("tabId", tabId);
            muteControl.data("tabId", tabId);
            controls.append(playBackControl, muteControl);
            videoTitleSpan.text(tabTitle);
            videoTitleSpan.attr("title", chrome.i18n.getMessage("clickToGoToVideo"));
            videoTitleSpan.data("tabId", tabId);
            videoListItem.append(videoTitleSpan, controls);
            videoList.append(videoListItem);
            videoList.data("tabId", tabId);

            getVideo(tabId, function (video) {

                var playBackClass = (video.paused === true) ? "fa-play" : "fa-pause";
                var mutedClass = getMutedClass(video.muted, video.volume);

                playBackControl.addClass(playBackClass);
                muteControl.addClass(mutedClass);

                processedTabsCount++;

                if (processedTabsCount == tabs.length) {
                    setTimeout(function () {
                        videoList.removeClass("hidden");
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

    function getMutedClass(muted, volume) {
        if (muted === true || volume == 0) {
            return "fa-volume-off";
        }

        if (volume < 0.5) {
            return "fa-volume-down";
        }

        return "fa-volume-up";
    }

    function videoPlayBackControlClicked(event) {
        event.stopPropagation();
        var self = $(this);
        var tabId = parseInt(self.data("tabId"));
        toggleVideoPlayBack(tabId, function (paused) {
            var classToAdd = paused ? "fa-play" : "fa-pause";
            var classToRemove = classToAdd === "fa-pause" ? "fa-play" : "fa-pause";

            self.addClass(classToAdd);
            self.removeClass(classToRemove);

        });
    }

    function videoMuteControlClicked(event) {
        event.stopPropagation();
        var self = $(this);
        var tabId = parseInt(self.data("tabId"));
        toggleVideoMute(tabId, function (muted) {
            var classToAdd = muted ? "fa-volume-off" : "fa-volume-up";
            var classToRemove = classToAdd === "fa-volume-off" ? "fa-volume-up" : "fa-volume-off";

            self.addClass(classToAdd);
            self.removeClass(classToRemove);

        });
    }

    function videoTitleSpanClicked() {
        var tabId = parseInt($(this).data("tabId"));
        toggleTab(tabId, true);
    }
});
