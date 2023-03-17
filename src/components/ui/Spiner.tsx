import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { FC } from "react";

const LoadingSpinner: FC = () => {
  return (
    <Stack sx={style}>
      <CircularProgress color="primary" size={50} />
    </Stack>
  );
};

const style = {
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255, 255, 255, 0.8)",
};

export default LoadingSpinner;
