import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getCourses } from "../../api/courses";
import { getToken } from "../../api/token";

const CoursesPage = () => {
  const [courses, setCourses] = useState();
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
      <Typography variant="h3">Courses list</Typography>
    </Box>
  );
};

export default CoursesPage;
