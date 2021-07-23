import { processTabTitle, toggleTab, getVideo } from "../util";

class VideoCard extends HTMLElement {
  connectedCallback() {
    const tabId = Number.parseInt(this.getAttribute("tab-id"), 10);

    getVideo(tabId, (video) => {
      this.video = video;

      this.appendChild(
        document.getElementById("video-card-template").content.cloneNode(true)
      );

      const titleAnchor = this.querySelector(".video-card__header > a");
      const closeButton = this.querySelector("close-button");
      const playbackButton = this.querySelector("playback-button");
      const volumeButton = this.querySelector("volume-button");

      titleAnchor.innerHTML = processTabTitle(this.getAttribute("tab-title"));

      titleAnchor.setAttribute("href", this.getAttribute("tab-url"));
      titleAnchor.setAttribute(
        "title",
        chrome.i18n.getMessage("clickToGoToVideo")
      );

      titleAnchor.addEventListener("click", (e) => {
        e.preventDefault();

        toggleTab(tabId);
      });

      closeButton.setAttribute("tab-id", tabId);

      closeButton.addEventListener("videoRemoved", () => {
        this.remove();
      });

      playbackButton.setAttribute("paused", video.paused);
      playbackButton.setAttribute("tab-id", tabId);

      volumeButton.setAttribute("muted", video.muted);
      volumeButton.setAttribute("tab-id", tabId);
    });
  }
}

window.customElements.define("video-card", VideoCard);
