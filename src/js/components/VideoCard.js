import React from "react";

import {
  mutedClass,
  playbackClass,
  processTabTitle,
} from "../util";

const VideoCard = ({
  tab, video, onTabToggle, onPlaybackToggle, onMutedToggle,
}) => (
  <article
    key={tab.id}
    className="video-card"
  >
    <section className="video-card__header">
      <a
        href={tab.url}
        title={chrome.i18n.getMessage("clickToGoToVideo")}
        onClick={() => onTabToggle(tab.id)}
      >
        {processTabTitle(tab.title)}
      </a>
    </section>
    {video && (
      <section className="video-card__actions">
        <button
          type="button"
          title={chrome.i18n.getMessage(video.paused ? "play" : "pause")}
          onClick={() => onPlaybackToggle(tab.id)}
        >
          <i className={["fa", playbackClass(video)].join(" ")} />
        </button>
        <button
          type="button"
          title={chrome.i18n.getMessage(video.muted ? "Unmute" : "Mute")}
          onClick={() => onMutedToggle(tab.id)}
        >
          <i
            className={["fa", mutedClass(video ? video.muted : false, video ? video.volume : 0)].join(" ")}
          />
        </button>
      </section>
    )}
  </article>
);

export default VideoCard;
