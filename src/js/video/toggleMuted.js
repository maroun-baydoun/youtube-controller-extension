(() => {
  const video = document.querySelector("video");
  video.muted = !video.muted;
  return video.muted;
})();
