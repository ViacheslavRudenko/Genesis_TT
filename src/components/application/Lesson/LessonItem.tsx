import { Grid, Box, Typography, CircularProgress } from "@mui/material";
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
      onClick={() => changeLesson(lesson.order)}
    >
      <Box
        position="relative"
        sx={
          status === "locked" || isLessonOpen
            ? styles.deprecatedBox
            : styles.undeprecatedBox
        }
      >
        <Poster img={imgSourceUrl} />
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
          <CircularProgress color="success" size={100} />
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
    top: 70,
    right: 150,
  },
  hideAlertBox: {
    display: "none",
  },
};

export default memo(LessonsItem);
