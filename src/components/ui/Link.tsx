import { Button } from "@mui/material";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

const CustomLink: FC<BtnTypes> = ({ children, link }) => {
  return (
    <Link to={link} style={styles.link}>
      <Button fullWidth={true}> {children}</Button>
    </Link>
  );
};

type BtnTypes = {
  children: ReactNode;
  link: string;
};
const styles = {
  link: {
    textDecoration: "none",
  },
};

export default CustomLink;
