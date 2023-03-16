import { Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { getCourses } from "../../api/courses";
import CoursesList from "../../components/application/Courses/CoursesList";
import CustomAlert from "../../components/ui/Alert";
import LoadingSpinner from "../../components/ui/Spiner";
import { CourseTypes } from "../../types/course";

const CoursesPage: FC = () => {
  const [courses, setCourses] = useState<CourseTypes[]>();
  const [err, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getCourses()
      .then((data) => {
        setCourses(data);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  useEffect(() => {
    if (!!courses || !!err) {
      setIsLoading(false);
    }
  }, [courses, err]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Typography variant="h3">Courses list</Typography>
      {courses && <CoursesList courses={courses} />}
      {err && <CustomAlert text={err} />}
    </Box>
  );
};

export default CoursesPage;
