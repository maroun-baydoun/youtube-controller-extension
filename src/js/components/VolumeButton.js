import { toggleVideoMuted } from "../util";

class VolumeButton extends HTMLElement {
  connectedCallback() {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    const template = document.querySelector("#volume-button-template");

    this.appendChild(template.content.cloneNode(true));

    const button = this.querySelector("button");

    button.addEventListener("click", () => {
      const tabId = Number.parseInt(this.getAttribute("tab-id"), 10);

      toggleVideoMuted(tabId, (muted) => {
        this.updateIcon(muted);
        this.updateButton(muted);
      });
    });
  }

  attributeChangedCallback(name, _oldValue, newValue) {
    if (name !== "muted") {
      return;
    }

    const isMuted = newValue === "true";

    this.updateIcon(isMuted);
    this.updateButton(isMuted);
  }

  updateIcon(isMuted) {
    const volumeUpIcon = this.querySelector(".icon.volume-up");
    const volumeOffIcon = this.querySelector(".icon.volume-off");

    if (isMuted) {
      volumeUpIcon.classList.remove("visible");
      volumeOffIcon.classList.add("visible");
    } else {
      volumeUpIcon.classList.add("visible");
      volumeOffIcon.classList.remove("visible");
    }
  }

  updateButton(isMuted) {
    const button = this.querySelector("button");

    button.setAttribute(
      "title",
      chrome.i18n.getMessage(isMuted ? "unmute" : "mute"),
    );
  }

  static get observedAttributes() {
    return ["muted"];
  }
}

window.customElements.define("volume-button", VolumeButton);
