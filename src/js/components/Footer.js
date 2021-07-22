class Footer extends HTMLElement {
  connectedCallback() {
    const version = chrome.runtime.getManifest().version;

    this.appendChild(
      document.getElementById("footer-template").content.cloneNode(true)
    );

    const versionContainer = this.querySelector(".version-container");
    const homepageAnchor = this.querySelector(".homepage");

    versionContainer.innerHTML = version;
    versionContainer.setAttribute(
      "aria-label",
      chrome.i18n.getMessage("version")
    );

    homepageAnchor.setAttribute("title", chrome.i18n.getMessage("homePage"));
  }
}

window.customElements.define("popup-footer", Footer);
