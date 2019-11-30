import React, {
  Fragment, useCallback, useEffect, useState,
} from "react";
import ReactDOM from "react-dom";

import VideoList from "./components/VideoList";
import Footer from "./components/Footer";
import { useGa } from "./hooks";

import * as Util from "./util";

import "font-awesome/css/font-awesome.min.css";
import "../style/style.scss";

const Popup = () => {
  const { initialise, pageview, event } = useGa();
  const [tabs, setTabs] = useState(null);
  const [videos, setVideos] = useState({});

  useEffect(() => {
    initialise();
    pageview("popup.html");
  }, [initialise, pageview]);

  useEffect(() => {
    Util.queryTabs(tabsResult => setTabs(tabsResult));
  }, [pageview]);

  useEffect(() => {
    if (tabs === null) {
      return;
    }

    if (tabs.length === 0) {
      event({
        category: "popup",
        action: "noVideosFound",
      });
      return;
    }

    if (tabs.length === 1) {
      event({
        category: "video",
        action: "playbackToggle:browserAction",
      });
      window.close();
      Util.toggleVideoPlayback(tabs[0].id);
    }

    tabs.forEach(tab => Util.getVideo(tab.id, (video) => {
      setVideos(stateVideos => ({ ...stateVideos, [tab.id]: video }));
    }));
  }, [tabs, event]);

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

  if (tabs === null) {
    return null;
  }

  return (
    <Fragment>
      <main>
        <VideoList
          tabs={tabs}
          videos={videos}
          toggleVideoPlayback={toggleVideoPlayback}
          toggleVideoMuted={toggleVideoMuted}
          toggleTab={Util.toggleTab}
        />
      </main>
      <Footer />
    </Fragment>
  );
};

ReactDOM.render(<Popup />, document.getElementById("popup"));
