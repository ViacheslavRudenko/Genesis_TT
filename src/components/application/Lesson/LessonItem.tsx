import { Grid, Box } from "@mui/material";
import { FC, memo } from "react";
import { LessonTypes } from "../../../types/course";
import Btn from "../../ui/Btn";
import VideoPlayer from "../../ui/VideoPlayer";
import { convertMinutesToHours } from "./functions";

const LessonsItem: FC<LessonsItemTypes> = ({
  lesson,
  isLessonOpen,
  changeLesson,
}) => {
  const { title, duration, status, previewImageLink, order, link } = lesson;
  const videoSourceUrl: string = `${previewImageLink}/lesson-${order}.webp`;

  return (
    <Box component="li" sx={styles.container}>
      <Grid container spacing={2}>
        {/* Lesson number */}
        <Grid item xs={3}>
          Lesson № {lesson.order}
        </Grid>

        {/* Title */}
        <Grid item xs={7} md={5}>
          {title}
        </Grid>

        {/* Duration */}
        <Grid item display={{ xs: "none", md: "flex" }} md={2}>
          Duration: {convertMinutesToHours(duration)}
        </Grid>

        {/* Button */}
        <Grid item xs={2}>
          <Btn
            click={() => changeLesson(lesson.order)}
            disabled={status === "locked" || isLessonOpen ? true : false}
          >
            {status === "locked" ? "Locked" : isLessonOpen ? "Is open" : "Open"}
          </Btn>
        </Grid>

        {/* Video */}
      </Grid>
      {isLessonOpen && <VideoPlayer videoSourceUrl={link} />}
    </Box>
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
    padding: { xs: 1, sm: 0 },
  },
};

export default memo(LessonsItem);
