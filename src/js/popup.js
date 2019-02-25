import { h, app } from "hyperapp"
import { 
  queryTabs, 
  getVideo, 
  toggleVideoPlayback, 
  toggleVideoMuted, 
  toggleTab, 
  processTabTitle, 
  playbackClass, 
  mutedClass,
 } from "./util";

import "../style/style.scss";

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
  <main>
    {tabs.length === 0 
      && 
      <div className="notice">
        {chrome.i18n.getMessage("noVideos")}
      </div>
    }
    {tabs.length === 1
      && null
    }
    {tabs.length > 1
      && 
      <div>
        {
          tabs.map(tab => (
            <VideoListItem 
              key={tab.id}
              tab={tab} 
              video={videos[tab.id]} 
              onPlaybackToggle={actions.toggleVideoPlayback}
              onMutedToggle={actions.toggleVideoMuted}
              onTabToggle={actions.toggleTab}
            />
          ))
        }
      </div>
    }
  </main>
);


const VideoListItem = ({tab, video, onPlaybackToggle, onMutedToggle, onTabToggle}) => (
    <article 
      key={tab.id} 
      className="video-card" 
    >
      <section className="video-card__header">
        <a
          href={tab.url}
          title={chrome.i18n.getMessage("clickToGoToVideo")}
          onclick={() => onTabToggle(tab.id)}
        >
          {processTabTitle(tab.title)}
        </a>
      </section>
      <section className="video-card__actions">
        <button 
          type="button"
          onclick={() => onPlaybackToggle(tab.id)}
        >
          <i className={["fa", playbackClass(video)].join(" ")}></i>
        </button>
        <button
          type="button"
          onclick={() => onMutedToggle(tab.id)}
          >
            <i className={["fa", mutedClass(video ? video.muted : false, video ?video.volume: 0)].join(" ")}></i>
          </button>
      </section>
    </article>
);

const main = app(state, actions, view, document.body);

main.queryTabs();
