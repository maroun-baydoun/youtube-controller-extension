class Footer extends HTMLElement {
  connectedCallback() {
    const version = chrome.runtime.getManifest().version;

    this.appendChild(
      document.getElementById("footer-template").content.cloneNode(true)
    );

    const versionContainer = document.querySelector(".version-container");
    versionContainer.innerHTML = version;
  }
}

window.customElements.define("popup-footer", Footer);
