import React, { useCallback } from "react";

import Analytics from "../analytics";

const Footer = () => {
  
  const onHomeClick = useCallback(() => {
    Analytics.event({
      category: "externalLink",
      action: "home:footer",
    });
  }, []);

  const onTwitterClick = useCallback(() => {
    Analytics.event({
      category: "externalLink",
      action: "twitter:footer",
    });
  }, []);

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
          onClick={onHomeClick}
        >
          <i className="fa fa-home" aria-hidden />
        </a>
        <a
          href="https://twitter.com/maroun_baydoun"
          rel="external noopener noreferrer"
          target="_blank"
          onClick={onTwitterClick}
        >
          <i className="fa fa-twitter" aria-hidden />
        </a>
      </section>
    </footer>
  );
};

export default Footer;
