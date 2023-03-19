import { Grid } from "@mui/material";
import { FC } from "react";
import { ErrorForAlertTypes } from "../../types/context";
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
      direction="column-reverse"
    >
      {err &&
        err.map((el: ErrorForAlertTypes) => (
          <Grid item key={Math.random()}>
            <CustomAlert text={el.text} type={el.type} />
          </Grid>
        ))}
    </Grid>
  );
};

type AlertListTypes = {
  err: ErrorForAlertTypes[];
};

export default AlertList;
