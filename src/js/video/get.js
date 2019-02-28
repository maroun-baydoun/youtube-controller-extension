(() => {
  const video = document.querySelector('video');
  const result = { paused: video.paused, volume: video.volume, muted: video.muted };
  return result;
})();
