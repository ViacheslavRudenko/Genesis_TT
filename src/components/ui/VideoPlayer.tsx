import { Box } from "@mui/material";
import Hls from "hls.js";
import { FC, useEffect, useRef } from "react";
import Btn from "./Btn";

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

  return <video ref={videoRef} controls></video>;
};

type VideoPlayerTypes = {
  videoSourceUrl: string;
};

export default VideoPlayer;
