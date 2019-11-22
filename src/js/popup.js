import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom";

import VideoList from "./components/VideoList";

import * as Util from "./util";

import "../style/style.scss";

const App = () => {
  const [tabs, setTabs] = useState([]);
  const [videos, setVideos] = useState({});

  useEffect(() => {
    Util.queryTabs(tabsResult => setTabs(tabsResult));
  }, []);

  useEffect(() => {
    if (tabs.length === 1) {
      window.close();
      Util.toggleVideoPlayback(tabs[0].id);
    }

    tabs.forEach(tab => Util.getVideo(tab.id, (video) => {
      setVideos(stateVideos => ({ ...stateVideos, [tab.id]: video }));
    }));
  }, [tabs]);

  const toggleVideoPlayback = useCallback((tabId) => {
    Util.toggleVideoPlayback(tabId, (paused) => {
      setVideos(stateVideos => ({ ...stateVideos, [tabId]: { ...stateVideos[tabId], paused } }));
    });
  }, []);
  const toggleVideoMuted = useCallback((tabId) => {
    Util.toggleVideoMuted(tabId, (muted) => {
      setVideos(stateVideos => ({ ...stateVideos, [tabId]: { ...stateVideos[tabId], muted } }));
    });
  }, []);

  return (
    <VideoList
      tabs={tabs}
      videos={videos}
      toggleVideoPlayback={toggleVideoPlayback}
      toggleVideoMuted={toggleVideoMuted}
      toggleTab={Util.toggleTab}
    />
  );
};

ReactDOM.render(<App />, document.querySelector("main"));
