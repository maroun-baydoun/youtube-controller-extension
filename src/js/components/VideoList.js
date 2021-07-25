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
        const notice = document.createElement("div");
        notice.classList.add("notice");
        notice.appendChild(
          document.createTextNode(chrome.i18n.getMessage("noVideos"))
        );

        this.appendChild(notice);
      } else if (tabs.length === 1) {
        toggleVideoPlayback(tabs[0].id);
        window.close();
      } else {
        const videoCards = tabs.map((tab) => {
          const videoCard = document.createElement("video-card");
          videoCard.setAttribute("tab-id", tab.id);
          videoCard.setAttribute("tab-title", tab.title);
          videoCard.setAttribute("tab-url", tab.url);

          return videoCard;
        });

        videoCards.forEach((videoCard) => this.appendChild(videoCard));
      }
    });
  }
}

window.customElements.define("video-list", VideoList);
