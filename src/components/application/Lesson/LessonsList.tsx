import { Grid } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import Context from "../../../context";
import { LessonTypes } from "../../../types/course";
import LessonsItem from "./LessonItem";

const LessonsList: FC<LessonsListTypes> = ({ lessons }) => {
  const [openLesson, setOpenLesson] = useState<number>(1);
  const { setPlayerData } = useContext(Context);

  useEffect(() => {
    const openLesonData = lessons.find((item) => item.order === openLesson);
    setPlayerData(openLesonData);
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
};

export default LessonsList;
