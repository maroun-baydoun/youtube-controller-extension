export const queryTabs = (callback) => {
  chrome.tabs.query(
    {
      url: "*://*.youtube.com/watch*",
    },
    (tabs) => {
      callback(tabs);
    },
  );
};

export const removeTab = (tabId, callback) => {
  chrome.tabs.remove(tabId, callback);
};

export const getVideo = (tabId, callback) => {
  chrome.scripting.executeScript(
    {
      target: { tabId },
      files: ["video/get.js"],
    },
    (result) => {
      if (result && result.length > 0) {
        callback(result[0].result);
      }
    },
  );
};

export const toggleVideoPlayback = (tabId, callback) => {
  chrome.scripting.executeScript(
    {
      target: { tabId },
      files: ["video/togglePlayback.js"],
    },
    (result) => {
      if (callback && result && result.length > 0) {
        callback(result[0].result);
      }
    },
  );
};

export const toggleVideoMuted = (tabId, callback) => {
  chrome.scripting.executeScript(
    {
      target: { tabId },
      files: ["video/toggleMuted.js"],
    },
    (result) => {
      if (result && result.length > 0) {
        callback(result[0].result);
      }
    },
  );
};

export const toggleTab = (tabId, active = true) => {
  chrome.tabs.update(tabId, {
    active,
  });
};

/**
 *
 * @param {string} title
 */
export const processTabTitle = (title) => {
  const youtubeTitleEnding = "- YouTube";
  if (
    title.substring(title.length - youtubeTitleEnding.length, title.length) ===
    youtubeTitleEnding
  ) {
    return title.substring(0, title.length - youtubeTitleEnding.length).trim();
  }
  return title;
};
