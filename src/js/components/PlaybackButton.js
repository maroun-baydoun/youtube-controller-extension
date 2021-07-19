import { toggleVideoPlayback } from "../util";

class PlaybackButton extends HTMLElement {
  constructor() {
    super();

    const template = document.querySelector("#playback-button-template");

    this.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const button = this.querySelector("button");

    button.addEventListener("click", () => {
      const tabId = Number.parseInt(this.getAttribute("tab-id"), 10);

      toggleVideoPlayback(tabId, (paused) => this.updateIcon(paused));
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name !== "paused") {
      return;
    }

    const isPaused = newValue === "true";

    this.updateIcon(isPaused);
  }

  updateIcon(isPaused) {
    const playIcon = this.querySelector(".icon.play");
    const pauseIcon = this.querySelector(".icon.pause");

    if (!isPaused) {
      playIcon.classList.remove("visible");
      pauseIcon.classList.add("visible");
    } else {
      playIcon.classList.add("visible");
      pauseIcon.classList.remove("visible");
    }
  }

  static get observedAttributes() {
    return ["paused"];
  }
}

window.customElements.define("playback-button", PlaybackButton);
