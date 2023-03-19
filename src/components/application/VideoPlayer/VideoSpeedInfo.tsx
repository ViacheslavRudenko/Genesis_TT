import { Box, Typography } from "@mui/material";
import { FC } from "react";

const VideoSpeedInfo: FC<VideoSpeedInfoTypes> = ({ videoSpeed }) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography>
        To change speed limit press "Shift + key A(up)/S(down)"
      </Typography>
      <Typography>Speed: x{videoSpeed}</Typography>
    </Box>
  );
};
type VideoSpeedInfoTypes = {
  videoSpeed: number;
};
export default VideoSpeedInfo;
