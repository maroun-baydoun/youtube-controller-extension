import { h, app } from 'hyperapp';
import {
  queryTabs,
  getVideo,
  toggleVideoPlayback,
  toggleVideoMuted,
  toggleTab,
  processTabTitle,
  playbackClass,
  mutedClass,
} from './util';

import '../style/style.scss';

const state = {
  tabs: [],
  videos: {},
};

const actions = {
  queryTabs: () => (_, appActions) => {
    queryTabs((tabs) => {
      if (tabs.length === 1) {
        window.close();
        toggleVideoPlayback(tabs[0].id);
      }
      appActions.setTabs(tabs);
      tabs.forEach(tab => appActions.getVideo(tab.id));
    });
  },
  setTabs: tabs => appState => ({ ...appState, tabs }),
  getVideo: tabId => (_, appActions) => {
    getVideo(tabId, (video) => {
      appActions.addVideo({ tabId, video });
    });
  },
  addVideo: ({ tabId, video }) => appState => ({
    ...appState,
    videos: {
      ...appState.videos,
      [tabId]: video,
    },
  }),
  toggleVideoPlayback: tabId => (_, appActions) => {
    toggleVideoPlayback(tabId, (paused) => {
      appActions.setVideoPaused({ tabId, paused });
    });
  },
  setVideoPaused: ({ tabId, paused }) => appState => ({
    ...appState,
    videos: {
      ...appState.videos,
      [tabId]: {
        ...appState.videos[tabId],
        paused,
      },
    },
  }),
  toggleVideoMuted: tabId => (_, appActions) => {
    toggleVideoMuted(tabId, (muted) => {
      appActions.setVideoMuted({ tabId, muted });
    });
  },
  setVideoMuted: ({ tabId, muted }) => appState => ({
    ...appState,
    videos: {
      ...appState.videos,
      [tabId]: {
        ...appState.videos[tabId],
        muted,
      },
    },
  }),
  toggleTab: tabId => () => {
    toggleTab(tabId);
  },
};

const view = ({ tabs, videos }, appActions) => (
  <main>
    {tabs.length === 0
      && (
      <div className="notice">
        {chrome.i18n.getMessage('noVideos')}
      </div>
      )
    }
    {tabs.length === 1
      && null
    }
    {tabs.length > 1
      && (
      <div>
        {
          tabs.map(tab => (
            <VideoListItem
              key={tab.id}
              tab={tab}
              video={videos[tab.id]}
              onPlaybackToggle={appActions.toggleVideoPlayback}
              onMutedToggle={appActions.toggleVideoMuted}
              onTabToggle={appActions.toggleTab}
            />
          ))
        }
      </div>
      )
    }
  </main>
);


const VideoListItem = ({
  tab, video, onPlaybackToggle, onMutedToggle, onTabToggle,
}) => (
  <article
    key={tab.id}
    className="video-card"
  >
    <section className="video-card__header">
      <a
        href={tab.url}
        title={chrome.i18n.getMessage('clickToGoToVideo')}
        onclick={() => onTabToggle(tab.id)}
      >
        {processTabTitle(tab.title)}
      </a>
    </section>
    {video && (
    <section className="video-card__actions">
      <button
        type="button"
        title={chrome.i18n.getMessage(video.paused ? 'play' : 'pause')}
        onclick={() => onPlaybackToggle(tab.id)}
      >
        <i className={['fa', playbackClass(video)].join(' ')} />
      </button>
      <button
        type="button"
        title={chrome.i18n.getMessage(video.muted ? 'Unmute' : 'Mute')}
        onclick={() => onMutedToggle(tab.id)}
      >
        <i className={['fa', mutedClass(video ? video.muted : false, video ? video.volume : 0)].join(' ')} />
      </button>
    </section>
    )}
  </article>
);

const main = app(state, actions, view, document.body);

main.queryTabs();
