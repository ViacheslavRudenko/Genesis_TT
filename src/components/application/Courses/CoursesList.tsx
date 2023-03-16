import { Grid, Stack } from "@mui/material";
import { FC } from "react";
import { CourseTypes } from "../../../types/course";
import CoursesItem from "./CoursesItem";

const CoursesList: FC<CoursesListTypes> = ({ courses }) => {
  return (
    <Grid container spacing={3} component="ul" justifyContent="center" p={0}>
      {courses.map((course: CourseTypes) => (
        <CoursesItem course={course} key={course.id} />
      ))}
    </Grid>
  );
};

type CoursesListTypes = {
  courses: CourseTypes[];
};

export default CoursesList;
