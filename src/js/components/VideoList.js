import React, { Fragment } from 'react';

import VideCard from './VideoCard';

const VideoList = ({
  tabs, videos, toggleVideoPlayback, toggleVideoMuted, toggleTab,
}) => {
  if (tabs.length === 0) {
    return (
      <div className="notice">
        {chrome.i18n.getMessage('noVideos')}
      </div>
    );
  }

  if (tabs.length === 1) {
    return null;
  }

  return (
    <Fragment>
      {tabs.map(tab => (
        <VideCard
          key={tab.id}
          tab={tab}
          video={videos[tab.id]}
          onPlaybackToggle={toggleVideoPlayback}
          onMutedToggle={toggleVideoMuted}
          onTabToggle={toggleTab}
        />
      ))}
    </Fragment>
  );
};

export default VideoList;
