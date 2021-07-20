import { queryTabs, toggleVideoPlayback } from "../util.js";

class VideoList extends HTMLElement {
  connectedCallback() {
    queryTabs((tabs) => {
      this.tabs = tabs;

      if (!tabs) {
        return;
      }

      if (!tabs.length) {
        this.innerHTML = `<div class="notice">${chrome.i18n.getMessage(
          "noVideos"
        )}</div>`;
      } else if (tabs.length === 1) {
        window.close();
        toggleVideoPlayback(tabs[0].id);
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
