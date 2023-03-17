import { Button } from "@mui/material";
import { FC, ReactNode } from "react";

const Btn: FC<BtnTypes> = ({ children, click, disabled = false }) => {
  return (
    <Button onClick={click} disabled={disabled} fullWidth={true}>
      {children}
    </Button>
  );
};

type BtnTypes = {
  children: ReactNode;
  click: () => void;
  disabled?: boolean;
};

export default Btn;
