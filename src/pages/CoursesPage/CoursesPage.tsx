import { Box, Container, Pagination, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { log } from "console";
import { FC, useEffect, useState } from "react";
import { getCourses } from "../../api/courses";
import CoursesList from "../../components/application/Courses/CoursesList";
import CustomAlert from "../../components/ui/Alert";
import CustomPagination from "../../components/ui/Pagintion";
import LoadingSpinner from "../../components/ui/Spiner";
import { CourseTypes } from "../../types/course";

const CoursesPage: FC = () => {
  const [courses, setCourses] = useState<CourseTypes[]>();
  const [err, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const pageOnChange = (newPage: number): void => {
    setPage(newPage);
  };

  useEffect(() => {
    setIsLoading(true);
    getCourses()
      .then((data: CourseTypes[]): void => {
        const maxLimit: number = 10;
        const startIndex: number = maxLimit * page - 10;
        data.reverse();
        setCourses(data.slice(startIndex, 10 + startIndex));
      })
      .catch((err: string): void => {
        setError(err);
      })
      .finally((): void => {
        setIsLoading(false);
      });
  }, [page]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <Typography variant="h3">Courses list</Typography>
      {courses && <CoursesList courses={courses} />}
      <CustomPagination page={page} pageOnChange={pageOnChange} />
      {err && <CustomAlert text={err} />}
    </Box>
  );
};

export default CoursesPage;
