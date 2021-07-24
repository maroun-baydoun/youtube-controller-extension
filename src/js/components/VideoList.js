import { queryTabs, toggleVideoPlayback } from "../util";

class VideoList extends HTMLElement {
  connectedCallback() {
    this.removedVideoCount = 0;

    queryTabs((tabs) => {
      this.tabs = tabs;

      if (!tabs) {
        return;
      }

      this.addEventListener("videoRemoved", () => {
        this.removedVideoCount++;

        if (this.removedVideoCount === this.tabs.length) {
          window.close();
        }

      });

      if (!tabs.length) {
        this.innerHTML = `<div class="notice">${chrome.i18n.getMessage(
          "noVideos"
        )}</div>`;
      } else if (tabs.length === 1) {
        toggleVideoPlayback(tabs[0].id);
        window.close();
      } else {
        this.innerHTML = tabs
          .map((tab) => {
            return `<video-card 
            tab-id="${tab.id}" 
            tab-title="${tab.title}" 
            tab-url="${tab.url}"
          >
          </video-card>`;
          })
          .join("");
      }
    });
  }
}

window.customElements.define("video-list", VideoList);
