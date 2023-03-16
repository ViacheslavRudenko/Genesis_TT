import { Box, Rating, Typography } from "@mui/material";
import { FC, memo } from "react";
import { CourseTypes } from "../../../types/course";
import Poster from "../../ui/Poster";

const CoursesItem: FC<CoursesItemTypes> = ({ course }) => {
  return (
    <Box sx={styles.container} component="li">
      <Poster img={course.previewImageLink + "/cover.webp"} />
      <Typography component="h6">{course.title}</Typography>
      <Typography>Lesson count: {course.lessonsCount}</Typography>
      <Typography>Skills: {course.meta.skills}</Typography>
      <Rating defaultValue={course.rating} precision={0.5} />
    </Box>
  );
};

type CoursesItemTypes = {
  course: CourseTypes;
};

const styles = {
  container: {
    margin: "0",
    maxWidth: "560px",
    width: "100%",
    listStyleType: "none",
  },
};

export default memo(CoursesItem);
