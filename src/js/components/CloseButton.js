import { removeTab } from "../util";

class CloseButton extends HTMLElement {
  constructor() {
    super();

    const template = document.querySelector("#close-button-template");

    this.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const button = this.querySelector("button");

    button.setAttribute("title", chrome.i18n.getMessage("closeVideo"));

    button.addEventListener("click", () => {
      const tabId = Number.parseInt(this.getAttribute("tab-id"), 10);

      removeTab(tabId, () => {
        this.dispatchEvent(new CustomEvent("videoRemoved"));
      });
    });
  }
}

window.customElements.define("close-button", CloseButton);
