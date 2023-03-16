import { Container } from "@mui/material";
import { FC } from "react";

const App: FC = () => {
  return <Container maxWidth="lg" sx={styles.appContainer}></Container>;
};

const styles = {
  appContainer: {
    display: "flex",
    justifyContent: "center",
    minHeight: "100vh",
    minWidth: "320px",
  },
};

export default App;
