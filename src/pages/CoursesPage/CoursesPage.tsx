import { Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { getCourses } from "../../api/courses";
import CustomAlert from "../../components/ui/Alert";
import { CourseTypes } from "../../types/course";

const CoursesPage: FC = () => {
  const [courses, setCourses] = useState<CourseTypes[]>();
  const [err, setError] = useState<string>("");
  useEffect(() => {
    getCourses()
      .then((data) => {
        setCourses(data);
        console.log(data);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  }, []);

  return (
    <Box>
      {err && <CustomAlert text={err} />}
      <Typography variant="h3">Courses list</Typography>
    </Box>
  );
};

export default CoursesPage;
