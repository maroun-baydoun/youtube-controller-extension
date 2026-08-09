import { queryTabs, toggleVideoPlayback } from "../util.js";

chrome.commands.onCommand.addListener((command) => {
  const regex = /^toggle-video-([1-9]{1})$/;
  const regexResult = command.match(regex);

  if (!regexResult || regexResult.length < 2) {
    return;
  }

  const commandIndex = regexResult[1];
  const tabIndex = parseInt(commandIndex, 10) - 1;

  if (Number.isNaN(tabIndex)) {
    return;
  }

  queryTabs((tabs) => {
    if (tabs && tabs.length > tabIndex) {
      toggleVideoPlayback(tabs[tabIndex].id);
    }
  });
});
