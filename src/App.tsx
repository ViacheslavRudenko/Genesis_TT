import { Container } from "@mui/material";
import { FC, useEffect, useState } from "react";
import AlertList from "./components/application/AlertList";
import Routing from "./components/application/Routing";
import Context from "./context";
import { ErrorForAlertTypes } from "./types/context";

const App: FC = () => {
  const [err, setErr] = useState<ErrorForAlertTypes[]>([]);

  useEffect(() => {
    // Remove the last added err from the array
    const intervalId = setInterval(() => {
      const updatedItems = err.slice(0, -1);
      setErr(updatedItems);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [err]);

  const addErr = (error: ErrorForAlertTypes): void => {
    setErr([error, ...err]);
  };

  return (
    <Context.Provider value={{ addErr }}>
      <Container maxWidth="lg" sx={styles.appContainer}>
        <Routing />
        <AlertList err={err} />
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
