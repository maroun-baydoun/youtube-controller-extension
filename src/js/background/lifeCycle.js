import Analytics from "../analytics";

Analytics.initialise();

chrome.runtime.onInstalled.addListener((details) => {
  const currentVersion = chrome.runtime.getManifest().version;
  const previousVersion = details.previousVersion;
  const reason = details.reason;

  switch (reason) {
    case "install":
      Analytics.event({
        category: "extension",
        action: "install",
        label: currentVersion,
      });
      break;
    case "update":
      if (previousVersion && previousVersion !== currentVersion) {
        Analytics.event({
          category: "extension",
          action: "update",
          label: currentVersion,
        });
      }
      break;
  }
});