import { Box } from "@mui/material";
import Hls from "hls.js";
import { FC, useEffect, useRef, useState } from "react";
import CustomAlert from "./Alert";

const VideoPlayer: FC<VideoPlayerTypes> = ({ videoSourceUrl }) => {
  const [err, setErr] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      const video = videoRef.current;
      const hls = new Hls();
      hls.loadSource(videoSourceUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.addEventListener("canplaythrough", () => {
          video.play();
        });
      });
      hls.on(Hls.Events.ERROR, (name, data) => {
        setErr(`${name}: ${data.type}`);
      });
    } else if (videoRef.current?.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = videoSourceUrl;
    }
  }, [videoSourceUrl]);

  return (
    <Box sx={styles.box}>
      <Box
        sx={styles.videoBox}
        component="video"
        ref={videoRef}
        controls
        muted
      ></Box>
      {err && <CustomAlert text={err} />}
    </Box>
  );
};

type VideoPlayerTypes = {
  videoSourceUrl: string;
};

const styles = {
  box: {
    display: "flex",
    justifyContent: "center",
    paddingY: 4,
  },
  videoBox: {
    width: "100%",
  },
};

export default VideoPlayer;
