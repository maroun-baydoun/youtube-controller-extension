(() => {
  const video = document.querySelector("video");
  if (!video) {
    return false;
  }
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
  return video.paused;
})();
