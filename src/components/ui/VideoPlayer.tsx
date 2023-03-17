import { Box } from "@mui/material";
import Hls from "hls.js";
import { FC, useEffect, useRef } from "react";

const VideoPlayer: FC<VideoPlayerTypes> = ({ videoSourceUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let hls: Hls | undefined;

    if (videoRef.current && Hls.isSupported()) {
      const video = videoRef.current;
      hls = new Hls();
      hls.loadSource(videoSourceUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [videoSourceUrl]);

  return (
    <Box sx={styles.box}>
      <Box sx={styles.videoBox} component="video" ref={videoRef} controls></Box>
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
    mr: { xs: 0, md: 3 },
  },
  videoBox: {
    height: { xs: 150, sm: 250, md: 400 },
  },
};

export default VideoPlayer;
