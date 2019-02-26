import { queryTabs, toggleVideoPlayback } from './util';

chrome.commands.onCommand.addListener((command) => {
  const regex = /^toggle-video-([1-9]{1})$/;
  const regexResult = command.match(regex);

  if (regexResult.length < 2) {
    return;
  }

  const commandIndex = regexResult[1];

  if (Number.isNaN(commandIndex)) {
    return;
  }

  const tabIndex = parseInt(commandIndex) - 1;

  queryTabs((tabs) => {
    if (tabs && tabs.length > tabIndex) {
      toggleVideoPlayback(tabs[tabIndex].id);
    }
  });
});

