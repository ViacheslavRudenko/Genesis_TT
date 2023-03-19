import { Grid, Box, Typography } from "@mui/material";
import { FC, memo } from "react";
import { LessonTypes } from "../../../types/course";
import Poster from "../../ui/Poster";
import { convertMinutesToHours } from "./functions";

const LessonsItem: FC<LessonsItemTypes> = ({
  lesson,
  isLessonOpen,
  changeLesson,
}) => {
  const { title, duration, status, previewImageLink, order, link } = lesson;
  const imgSourceUrl: string = `${previewImageLink}/lesson-${order}.webp`;

  return (
    <Grid
      item
      component="li"
      xs={12}
      md={6}
      sx={styles.container}
      onClick={() => status === "unlocked" && changeLesson(lesson.order)}
    >
      <Box
        position="relative"
        sx={
          status === "locked" || isLessonOpen
            ? styles.deprecatedBox
            : styles.undeprecatedBox
        }
      >
        <Box height="auto">
          <Poster img={imgSourceUrl} />
        </Box>
        <Grid container spacing={2} pt={1}>
          {/* Lesson number */}
          <Grid item xs={3}>
            <Typography fontWeight="bold">Lesson № {lesson.order}</Typography>
          </Grid>

          {/* Title */}
          <Grid item xs={9}>
            <Typography textAlign="end"> {title}</Typography>
          </Grid>

          {/* Duration */}
          <Grid item xs={12}>
            <Typography textAlign="center">
              Duration: {convertMinutesToHours(duration)}
            </Typography>
          </Grid>
        </Grid>
        <Box sx={isLessonOpen ? styles.alertBox : styles.hideAlertBox}>
          <Typography sx={styles.playingBox}>Playing...</Typography>
        </Box>
      </Box>
    </Grid>
  );
};

type LessonsItemTypes = {
  lesson: LessonTypes;
  isLessonOpen: boolean;
  changeLesson: (lesson: number) => void;
};

const styles = {
  container: {
    listStyleType: "none",
  },
  deprecatedBox: {
    opacity: 0.5,
    cursor: "unset",
  },
  undeprecatedBox: {
    cursor: "pointer",
  },
  alertBox: {
    position: "absolute",
    top: 0,
    bottom: 80,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  hideAlertBox: {
    display: "none",
  },
  playingBox: {
    background: "white",
    padding: 2,
    width: "100%",
    textAlign: "center",
  },
};

export default memo(LessonsItem);
