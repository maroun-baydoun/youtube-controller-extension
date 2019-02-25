import { queryTabs, toggleVideoPlayback } from './util';

chrome.commands.onCommand.addListener((command) => {
    const regex = /^toggle-video-[1-9]{1}$/;
    if (regex.test(command)) {
        let index = command.slice(-1);
        index = parseInt(index) - 1;
        queryTabs((tabs) => {
            if (tabs && tabs.length > index) {
                toggleVideoPlayback(tabs[index].id);
            }
        });
    }
});

