import { Stack } from "@mui/material";
import { FC } from "react";
import { CourseTypes } from "../../../types/course";
import CoursesItem from "./CoursesItem";

const CoursesList: FC<CoursesListTypes> = ({ courses }) => {
  return (
    <Stack
      component="ul"
      gap={3}
      direction="row"
      flexWrap="wrap"
      justifyContent={{ xs: "center", md: "space-between" }}
      padding={0}
    >
      {courses.map((course: CourseTypes) => (
        <CoursesItem course={course} key={course.id} />
      ))}
    </Stack>
  );
};

type CoursesListTypes = {
  courses: CourseTypes[];
};

export default CoursesList;
