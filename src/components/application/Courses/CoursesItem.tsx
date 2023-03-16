import { Container, Rating, Typography } from "@mui/material";
import { FC, memo } from "react";
import { CourseTypes } from "../../../types/course";
import Poster from "../../ui/Poster";

const CoursesItem: FC<CoursesItemTypes> = ({ course }) => {
  console.log(course);

  return (
    <Container sx={{ maxWidth: "550px", margin: "0" }}>
      <Poster img={course.previewImageLink + "/cover.webp"} />
      <Typography component="h6">{course.title}</Typography>
      <Typography>Lesson count: {course.lessonsCount}</Typography>
      <Typography>Skills: {course.meta.skills}</Typography>

      <Rating name="half-rating" defaultValue={course.rating} precision={0.5} />
    </Container>
  );
};

type CoursesItemTypes = {
  course: CourseTypes;
};

export default memo(CoursesItem);
