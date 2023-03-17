import { Grid } from "@mui/material";
import { FC } from "react";
import { LessonTypes } from "../../../types/course";
import Btn from "../../ui/Btn";
import VideoPlayer from "../../ui/VideoPlayer";

const LessonsItem: FC<LessonsItemTypes> = ({
  lesson,
  isLessonOpen,
  changeLesson,
}) => {
  const { title, duration, status, previewImageLink, order } = lesson;
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        Lesson № {lesson.order}
      </Grid>
      <Grid item xs={7} sm={5}>
        {title}
      </Grid>
      <Grid item display={{ xs: "none", sm: "flex" }} md={2}>
        {duration} minutes
      </Grid>
      <Grid item xs={2}>
        <Btn
          click={() => {
            changeLesson(lesson.order);
          }}
          disabled={status === "locked" ? true : false}
        >
          {status === "locked" ? "Locked" : "Open"}
        </Btn>
        {isLessonOpen && (
          <VideoPlayer
            videoSourceUrl={`${previewImageLink}/lesson-${order}.webp`}
          />
        )}
      </Grid>
    </Grid>
  );
};

type LessonsItemTypes = {
  lesson: LessonTypes;
  isLessonOpen: boolean;
  changeLesson: (lesson: number) => void;
};

export default LessonsItem;
