import { Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourse } from "../api/courses";
import LessonsList from "../components/application/Lesson/LessonsList";
import CustomAlert from "../components/ui/Alert";
import LoadingSpinner from "../components/ui/Spiner";
import { CourseTypes } from "../types/course";

const LessonViewingPage: FC = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseTypes>();
  const [err, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getCourse(id)
      .then((data: CourseTypes): void => {
        setCourse(data);
      })
      .catch((err: string): void => {
        setError(err);
      })
      .finally((): void => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box width={"100%"}>
      {course && (
        <>
          <Typography
            component="h6"
            variant="h6"
            paddingY={3}
            align="center"
            fontWeight="bold"
          >
            {course.title}
          </Typography>
          <Typography align="center" paddingY={1}>
            {course.description}
          </Typography>
          <LessonsList lessons={course.lessons} />
        </>
      )}
      {err && <CustomAlert text={err} />}
    </Box>
  );
};

export default LessonViewingPage;
