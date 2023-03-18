import { Box, CircularProgress } from "@mui/material";
import Hls from "hls.js";
import { FC, useEffect, useRef, useState } from "react";
import CustomAlert from "./Alert";

const VideoPlayer: FC<VideoPlayerTypes> = ({ videoSourceUrl, lessonId }) => {
  const [err, setErr] = useState<string>("");
  const [loaded, setLoaded] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const savedTime = localStorage.getItem(`lesson-${lessonId}-time`);
    const startTime = savedTime ? parseInt(savedTime, 10) : 0;

    if (videoRef.current && Hls.isSupported()) {
      const video = videoRef.current;
      const hls = new Hls({ startPosition: startTime });
      hls.loadSource(videoSourceUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.addEventListener("canplaythrough", () => {
          video.play();
          setLoaded(true);
        });
      });
      hls.on(Hls.Events.ERROR, (name, data) => {
        setErr(`${name}: ${data.type}`);
      });
    } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = videoSourceUrl;
    }
  }, [videoSourceUrl]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      const currentTime = Math.floor(video.currentTime);
      localStorage.setItem(`lesson-${lessonId}-time`, `${currentTime}`);
    }
  };

  return (
    <>
      {loaded ? (
        <Box
          sx={styles.videoBox}
          component="video"
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          controls
          muted
        ></Box>
      ) : (
        <Box sx={styles.loadingBox}>
          <CircularProgress />
        </Box>
      )}
      {err && <CustomAlert text={err} />}
    </>
  );
};

type VideoPlayerTypes = {
  videoSourceUrl: string;
  lessonId: string;
};

const styles = {
  videoBox: {
    width: "100%",
  },
  loadingBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "50vh",
  },
};

export default VideoPlayer;
