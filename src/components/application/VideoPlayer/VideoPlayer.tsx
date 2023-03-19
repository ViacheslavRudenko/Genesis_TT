import { Box } from "@mui/material";
import Hls, { ErrorData, Events } from "hls.js";
import {
  FC,
  KeyboardEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Context from "../../../context";
import LoadingSpinner from "../../ui/Spiner";
import VideoSpeedInfo from "./VideoSpeedInfo";

const VideoPlayer: FC<VideoPlayerTypes> = ({ videoSourceUrl, lessonId }) => {
  const { addErr, setPlayerData, isPlayerOpen, setIsPlayerOpen } =
    useContext(Context);
  const [loaded, setLoaded] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSpeed, setVideoSpeed] = useState<number>(1);

  useEffect(() => {
    const savedTime = localStorage.getItem(`lesson-${lessonId}-time`);
    const startTime = savedTime ? parseInt(savedTime, 10) : 0;

    if (videoRef.current && Hls.isSupported()) {
      const video = videoRef.current;
      const hls = new Hls({
        startPosition: lessonId ? startTime : 0,
      });
      hls.loadSource(videoSourceUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, startVideoToPlay);
      hls.on(Hls.Events.ERROR, setVideoErr);
    } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = videoSourceUrl;
    }
  }, [videoSourceUrl, lessonId]);

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      videoRef.current.playbackRate = videoSpeed;
    }
  }, [videoSpeed]);

  //Func that starts video
  const startVideoToPlay = (): void => {
    if (videoRef.current) {
      const video = videoRef.current;
      video.addEventListener("canplaythrough", () => {
        video.play();
        setLoaded(true);
      });
    }
  };
  //Func that sets fetching err
  const setVideoErr = (event: Events.ERROR, data: ErrorData): void => {
    addErr({ text: `${event}: ${data.type}` });
  };

  //Func that saves the progress of watching videos and course lessons
  const handleTimeUpdate = (): void => {
    const video = videoRef.current;
    if (video && lessonId) {
      const currentTime = Math.floor(video.currentTime);
      localStorage.setItem(`lesson-${lessonId}-time`, `${currentTime}`);
    }
  };

  // Func that opens full screen or picture in pictire
  const handleFullScreen = (): void => {
    setIsPlayerOpen(!isPlayerOpen);
  };

  // Func that which changes the playback speed of the video
  const handleKeyDown = (event: KeyboardEvent<HTMLVideoElement>): void => {
    const speedIncrement: number = 0.25;
    const minSpeed: number = 0.5;
    const maxSpeed: number = 2;
    const { shiftKey, keyCode } = event;

    //Shift + keyA
    if (keyCode === 65 && shiftKey) {
      videoSpeed === maxSpeed &&
        addErr({ text: `The maximum video speed is set`, type: "info" });
      const newSpeed: number = Math.min(videoSpeed + speedIncrement, maxSpeed);
      setVideoSpeed(newSpeed);
    }

    //Shift + keyS
    if (keyCode === 83 && shiftKey) {
      videoSpeed === minSpeed &&
        addErr({ text: `The minimum video speed is set`, type: "info" });
      const newSpeed: number = Math.max(videoSpeed - speedIncrement, minSpeed);
      setVideoSpeed(newSpeed);
    }
  };

  return (
    <Box position="relative">
      <>
        <Box
          component="video"
          ref={videoRef}
          onKeyDown={handleKeyDown}
          sx={isPlayerOpen ? styles.smallVideoBox : styles.fullVideoBox}
          onTimeUpdate={handleTimeUpdate}
          style={{
            display: loaded ? "block" : "none",
          }}
          onClick={handleFullScreen}
          controls
          muted
        />
        {lessonId && !isPlayerOpen && (
          <VideoSpeedInfo videoSpeed={videoSpeed} />
        )}
      </>

      {!loaded && <LoadingSpinner />}
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
    height: "auto",
    cursor: "zoom-out",
  },
};

export default VideoPlayer;
