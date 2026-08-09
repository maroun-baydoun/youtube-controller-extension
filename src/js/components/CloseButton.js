import { removeTab } from "../util";

class CloseButton extends HTMLElement {
  connectedCallback() {
    if (this.initialized) {
      return;
    }

    this.initialized = true;

    const template = document.querySelector("#close-button-template");

    this.appendChild(template.content.cloneNode(true));

    const button = this.querySelector("button");

    button.setAttribute("title", chrome.i18n.getMessage("closeVideo"));

    button.addEventListener("click", () => {
      const tabId = Number.parseInt(this.getAttribute("tab-id"), 10);

      removeTab(tabId, () => {
        this.dispatchEvent(new CustomEvent("videoRemoved", { bubbles: true }));
      });
    });
  }
}

window.customElements.define("close-button", CloseButton);
