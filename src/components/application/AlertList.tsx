import { Grid } from "@mui/material";
import { FC } from "react";
import CustomAlert from "../ui/Alert";

const AlertList: FC<AlertListTypes> = ({ err }) => {
  return (
    <Grid
      container
      position="fixed"
      zIndex={3}
      width="fit-content"
      right={10}
      top={10}
      direction="column"
    >
      {err &&
        err.map((el: string) => (
          <Grid item key={Math.random()}>
            <CustomAlert text={el} />
          </Grid>
        ))}
    </Grid>
  );
};

type AlertListTypes = {
  err: string[];
};

export default AlertList;
