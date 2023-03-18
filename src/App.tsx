import { Container } from "@mui/material";
import { FC, useState } from "react";

import Routing from "./components/application/Routing";
import Context from "./context";

const App: FC = () => {
  const [err, setErr] = useState<string[]>([]);

  const addErr = (error: string): void => {
    setErr([error, ...err]);
  };

  return (
    <Context.Provider value={{ addErr }}>
      <Container maxWidth="lg" sx={styles.appContainer}>
        <Routing />
      </Container>
    </Context.Provider>
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
