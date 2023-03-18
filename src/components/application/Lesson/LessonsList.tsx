import { Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { LessonTypes } from "../../../types/course";
import LessonsItem from "./LessonItem";

const LessonsList: FC<LessonsListTypes> = ({ lessons, setLessonForVideo }) => {
  const [openLesson, setOpenLesson] = useState<number>(1);

  useEffect(() => {
    const openLesonData = lessons.find((item) => item.order === openLesson);
    setLessonForVideo(openLesonData);
  }, [openLesson]);

  const changeOpenLesson = (lesson: number): void => {
    setOpenLesson(lesson);
  };

  const newLessArr = lessons.sort((a, b) => a.order - b.order);

  return (
    <Grid container spacing={3} component="ul" justifyContent="center" p={0}>
      {newLessArr.map((lesson: LessonTypes) => (
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
  setLessonForVideo: (lesson: LessonTypes | undefined) => void;
};

export default LessonsList;
