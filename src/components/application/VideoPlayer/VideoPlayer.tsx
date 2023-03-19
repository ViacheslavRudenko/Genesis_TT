import { Box, CircularProgress } from "@mui/material";
import Hls from "hls.js";
import { FC, useContext, useEffect, useRef, useState } from "react";
import Context from "../../../context";

const VideoPlayer: FC<VideoPlayerTypes> = ({ videoSourceUrl, lessonId }) => {
  const { addErr } = useContext(Context);
  const [loaded, setLoaded] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

  useEffect(() => {
    const savedTime = localStorage.getItem(`lesson-${lessonId}-time`);
    const startTime = savedTime ? parseInt(savedTime, 10) : 0;

    if (videoRef.current && Hls.isSupported()) {
      const video = videoRef.current;
      const hls = new Hls({ startPosition: lessonId ? startTime : 0 });
      hls.loadSource(videoSourceUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.addEventListener("canplaythrough", () => {
          video.play();
          setLoaded(true);
        });
      });
      hls.on(Hls.Events.ERROR, (name, data) => {
        addErr(`${name}: ${data.type}`);
      });
    } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = videoSourceUrl;
    }
  }, [videoSourceUrl, lessonId]);

  const handleTimeUpdate = (): void => {
    const video = videoRef.current;
    if (video && lessonId) {
      const currentTime = Math.floor(video.currentTime);
      localStorage.setItem(`lesson-${lessonId}-time`, `${currentTime}`);
    }
  };
  const handleFullScreen = (): void => {
    lessonId && setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      <Box
        sx={isFullScreen ? styles.smallVideoBox : styles.fullVideoBox}
        component="video"
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        controls
        muted
        style={{ display: loaded ? "block" : "none" }}
        onClick={handleFullScreen}
      ></Box>
      {!loaded && (
        <Box sx={styles.loadingBox}>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};

type VideoPlayerTypes = {
  videoSourceUrl: string;
  lessonId?: string;
};

const styles = {
  smallVideoBox: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    zIndex: 1,
    width: "300px",
    height: "auto",
    cursor: "zoom-in",
  },
  fullVideoBox: {
    width: "100%",
    cursor: "zoom-out",
  },
  loadingBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
};

export default VideoPlayer;
