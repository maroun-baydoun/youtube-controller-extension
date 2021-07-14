import React from "react";

const Footer = () => {

  return (
    <footer>
      <section className="footer__version-container">
        {chrome.runtime.getManifest().version}
      </section>
      <section className="footer__links-container">
        <a
          href="http://www.maroun-baydoun.com"
          rel="external noopener noreferrer"
          target="_blank"
        >
          <i className="fa fa-home" aria-hidden />
        </a>
        <a
          href="https://twitter.com/maroun_baydoun"
          rel="external noopener noreferrer"
          target="_blank"
        >
          <i className="fa fa-twitter" aria-hidden />
        </a>
      </section>
    </footer>
  );
};

export default Footer;
