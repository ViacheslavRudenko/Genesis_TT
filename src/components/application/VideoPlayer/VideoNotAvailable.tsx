import { Box, Typography } from "@mui/material";
import { FC } from "react";

const VideoNotAvailable: FC = () => {
  return (
    <Box paddingY={5}>
      <Typography textAlign="center">This video is not available</Typography>
    </Box>
  );
};

export default VideoNotAvailable;
