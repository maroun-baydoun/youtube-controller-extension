import React, { useCallback } from "react";
import { useGa } from "../hooks";

import {
  mutedClass,
  playbackClass,
  processTabTitle,
} from "../util";

const VideoCard = ({
  tab, video, onTabToggle, onPlaybackToggle, onMutedToggle,
}) => {
  const { event } = useGa();

  const onTabToggleCallback = useCallback((e) => {
    e.preventDefault();
    onTabToggle(tab.id);
    event({
      category: "tab",
      action: "toggle",
    });
  }, [tab.id, onTabToggle, event]);

  const onPlaybackToggleCallback = useCallback(() => {
    onPlaybackToggle(tab.id);
    event({
      category: "video",
      action: "playbackToggle:button",
    });
  }, [tab.id, onPlaybackToggle, event]);

  const onMutedToggleCallback = useCallback(() => {
    onMutedToggle(tab.id);
    event({
      category: "video",
      action: "mutedToggle:button",
    });
  }, [tab.id, onMutedToggle, event]);

  return (
    <article
      key={tab.id}
      className="video-card"
    >
      <section className="video-card__header">
        <a
          href={tab.url}
          title={chrome.i18n.getMessage("clickToGoToVideo")}
          onClick={onTabToggleCallback}
        >
          {processTabTitle(tab.title)}
        </a>
      </section>
      {video && (
        <section className="video-card__actions">
          <button
            type="button"
            title={chrome.i18n.getMessage(video.paused ? "play" : "pause")}
            onClick={onPlaybackToggleCallback}
          >
            <i className={["fa", playbackClass(video)].join(" ")} />
          </button>
          <button
            type="button"
            title={chrome.i18n.getMessage(video.muted ? "Unmute" : "Mute")}
            onClick={onMutedToggleCallback}
          >
            <i
              className={["fa", mutedClass(video ? video.muted : false, video ? video.volume : 0)].join(" ")}
            />
          </button>
        </section>
      )}
    </article>
  );
};

export default VideoCard;
