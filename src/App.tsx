import { Container } from "@mui/material";
import { FC, useEffect, useState } from "react";
import AlertList from "./components/application/AlertList";
import Routing from "./components/application/Routing";
import VideoPlayer from "./components/application/VideoPlayer/VideoPlayer";
import Context from "./context";
import { ErrorForAlertTypes } from "./types/context";
import { LessonTypes } from "./types/course";

const App: FC = () => {
  const [err, setErr] = useState<ErrorForAlertTypes[]>([]);
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false);
  const [playerData, setPlayerData] = useState<LessonTypes>();

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

  const ContextValue = {
    isPlayerOpen,
    setIsPlayerOpen,
    addErr,
    setPlayerData,
    playerData,
  };

  return (
    <Context.Provider value={ContextValue}>
      <Container maxWidth="lg" sx={styles.appContainer}>
        <Routing />
        <AlertList err={err} />
        {isPlayerOpen && playerData && (
          <VideoPlayer
            videoSourceUrl={playerData.link}
            lessonId={playerData.id}
          />
        )}
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
