import { Container } from "@mui/material";
import { FC } from "react";
import Routing from "./components/application/Routing";

const App: FC = () => {
  return (
    <Container maxWidth="lg" sx={styles.appContainer}>
      <Routing />
    </Container>
  );
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
