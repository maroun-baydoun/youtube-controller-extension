import { h, app } from "hyperapp"
import { queryTabs, getVideo, toggleVideoPlayback, toggleVideoMuted, toggleTab, processTabTitle, playbackClass, mutedClass } from "./util";

import "../css/style.css";

const state = {
  tabs: [],
  videos: {},
};

const actions = {
  queryTabs: () =>  (state, actions) => {
    queryTabs(tabs => {
      if(tabs.length === 1) {
        window.close();
        toggleVideoPlayback(tabs[0].id);
      }
      actions.setTabs(tabs);
      tabs.forEach(tab => actions.getVideo(tab.id));
    });
  },
  setTabs: tabs => state => ({...state, tabs }),
  getVideo: (tabId) =>  (state, actions) => {
    getVideo(tabId, (video) => {
      actions.addVideo({tabId, video});
    });
  },
  addVideo: ({tabId, video}) => state => ({...state, videos: {...state.videos, [tabId]: video} }),
  toggleVideoPlayback: tabId => (state, actions) => {
    toggleVideoPlayback(tabId, (paused) => {
      actions.setVideoPaused({tabId, paused});
    })
  },
  setVideoPaused : ({tabId, paused}) => state => ({...state, videos: {...state.videos, [tabId]: {
    ...state.videos[tabId],
    paused,
  }}}),
  toggleVideoMuted: tabId => (state, actions) => {
    toggleVideoMuted(tabId, (muted) => {
      actions.setVideoMuted({tabId, muted});
    })
  },
  setVideoMuted : ({tabId, muted}) => state => ({...state, videos: {...state.videos, [tabId]: {
    ...state.videos[tabId],
    muted,
  }}}),
  toggleTab: tabId => () => {
    toggleTab(tabId)
  }
}

const view = ({tabs, videos}, actions) => (
  <div>
    {tabs.length === 0 
      && 
      <div id="notice">
        {chrome.i18n.getMessage("noVideos")}
      </div>
    }
    {tabs.length === 1
      && null
    }
    {tabs.length > 1
      && 
      <ul id="video-list">
        {
          tabs.map(tab => (
            <VideoListItem 
              tab={tab} 
              video={videos[tab.id]} 
              onPlaybackToggle={actions.toggleVideoPlayback}
              onMutedToggle={actions.toggleVideoMuted}
              onTabToggle={actions.toggleTab}
            />
          ))
        }
      </ul>
    }
  </div>
);


const VideoListItem = ({tab, video, onPlaybackToggle, onMutedToggle, onTabToggle}) => (
    <li key={tab.id} title={video}>
      <span
        className="title"
        onclick={() => onTabToggle(tab.id)}
      >
        {processTabTitle(tab.title)}
      </span>
      <div className="controls-container">
        <a 
          className={["fa play-back-control control", playbackClass(video)].join(" ")} 
          onclick={() => onPlaybackToggle(tab.id)}
        >
        </a>
        <a 
          className={["fa mute-control control", mutedClass(video ? video.muted : false, video ?video.volume: 0)].join(" ")}
          onclick={() => onMutedToggle(tab.id)}
          ></a>
      </div>
    </li>
);

const main = app(state, actions, view, document.body);

main.queryTabs();
