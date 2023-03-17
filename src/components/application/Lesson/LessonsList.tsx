import { Grid } from "@mui/material";
import { FC, useState } from "react";
import { LessonTypes } from "../../../types/course";
import LessonsItem from "./LessonItem";

const LessonsList: FC<LessonsListTypes> = ({ lessons }) => {
  const [openLesson, setOpenLesson] = useState<number>(1);

  const changeOpenLesson = (lesson: number): void => {
    setOpenLesson(lesson);
  };

  return (
    <Grid>
      {lessons.map((lesson: LessonTypes) => (
        <LessonsItem
          lesson={lesson}
          isLessonOpen={openLesson === lesson.order}
          key={lesson.id}
          changeLesson={changeOpenLesson}
        />
      ))}
    </Grid>
  );
};

type LessonsListTypes = {
  lessons: LessonTypes[];
};

export default LessonsList;
