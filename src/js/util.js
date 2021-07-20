export const queryTabs = (callback) => {
  chrome.tabs.query(
    {
      url: "*://*.youtube.com/watch*",
    },
    (tabs) => {
      callback(tabs);
    }
  );
};

export const getVideo = (tabId, callback) => {
  chrome.tabs.executeScript(
    tabId,
    {
      file: "/video/get.js",
    },
    (result) => {
      if (result && result.length > 0) {
        callback(result[0]);
      }
    }
  );
};

export const toggleVideoPlayback = (tabId, callback) => {
  chrome.tabs.executeScript(
    tabId,
    {
      file: "/video/togglePlayback.js",
    },
    (result) => {
      if (callback && result && result.length > 0) {
        callback(result[0]);
      }
    }
  );
};

export const toggleVideoMuted = (tabId, callback) => {
  chrome.tabs.executeScript(
    tabId,
    {
      file: "/video/toggleMuted.js",
    },
    (result) => {
      if (result && result.length > 0) {
        callback(result[0]);
      }
    }
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
