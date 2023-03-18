import { Alert, Collapse, IconButton } from "@mui/material";
import { FC, useState } from "react";

const CustomAlert: FC<AlertTypes> = ({ text, type = "error" }) => {
  const [open, setOpen] = useState(true);

  return (
    <Collapse in={open}>
      <Alert
        severity={type}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
            X
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {text}
      </Alert>
    </Collapse>
  );
};

type AlertTypes = {
  text: string;
  type?: "error" | "warning" | "info" | "success";
};

export default CustomAlert;
