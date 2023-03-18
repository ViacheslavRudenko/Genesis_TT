import { Alert, Box, Collapse, IconButton } from "@mui/material";
import { FC, useEffect, useState } from "react";

const CustomAlert: FC<AlertTypes> = ({ text, type = "error" }) => {
  const [open, setOpen] = useState(true);

  // useEffect(() => {
  //   open && autoClose();
  // }, [open]);

  const autoClose = (): void => {
    setInterval(() => {
      setOpen(false);
    }, 5000);
  };

  return (
    <Box position="fixed" zIndex={3} right={15} bottom={0}>
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
    </Box>
  );
};

type AlertTypes = {
  text: string;
  type?: "error" | "warning" | "info" | "success";
};

export default CustomAlert;
