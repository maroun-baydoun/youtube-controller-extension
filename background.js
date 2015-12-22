(function(Util) {
  chrome.commands.onCommand.addListener(function(command) {
    var regex = /^toggle-video-[1-9]{1}$/;
    if (regex.test(command)) {
      var index = command.slice(-1);
      index = parseInt(index) - 1;
      Util.queryTabs(function(tabs) {
        if (tabs && tabs.length > index)
          var tab = tabs[index],
            tabId = tab.id;
        Util.toggleVideo(tabId);
      });
    }
  });

})(Util);
