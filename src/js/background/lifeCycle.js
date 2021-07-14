chrome.runtime.onInstalled.addListener((details) => {
  // const currentVersion = chrome.runtime.getManifest().version;
  // const previousVersion = details.previousVersion;
  const reason = details.reason;

  switch (reason) {
    case "install":
      break;
    case "update":
      break;
  }
});
