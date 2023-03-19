import { Box, CircularProgress, Typography } from "@mui/material";
import Hls from "hls.js";
import {
  FC,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Context from "../../../context";

const VideoPlayer: FC<VideoPlayerTypes> = ({ videoSourceUrl, lessonId }) => {
  const { addErr } = useContext(Context);
  const [loaded, setLoaded] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [videoSpeed, setVideoSpeed] = useState<number>(1);

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

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      videoRef.current.playbackRate = videoSpeed;
    }
  }, [videoSpeed]);

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

  const handleKeyDown = (event: KeyboardEvent<HTMLVideoElement>) => {
    const speedIncrement: number = 0.25;
    const minSpeed: number = 0.5;
    const maxSpeed: number = 2;
    const { shiftKey, keyCode } = event;

    if (keyCode === 65 && shiftKey) {
      const newSpeed: number = Math.min(videoSpeed + speedIncrement, maxSpeed);
      setVideoSpeed(newSpeed);
    }
    if (keyCode === 83 && shiftKey) {
      const newSpeed: number = Math.max(videoSpeed - speedIncrement, minSpeed);
      setVideoSpeed(newSpeed);
    }
  };

  return (
    <Box>
      <Box
        onKeyDown={handleKeyDown}
        sx={isFullScreen ? styles.smallVideoBox : styles.fullVideoBox}
        component="video"
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
        controls
        muted
        style={{ display: loaded ? "block" : "none" }}
        onClick={handleFullScreen}
      />
      <Box display="flex" justifyContent="space-between">
        <Typography>
          To change speed limit press "Shift + key A(up)/S(down)"
        </Typography>
        <Typography>Speed: x{videoSpeed}</Typography>
      </Box>

      {!loaded && (
        <Box sx={styles.loadingBox}>
          <CircularProgress />
        </Box>
      )}
    </Box>
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
