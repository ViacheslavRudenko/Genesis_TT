import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { getCourses } from "../../api/courses";

const CoursesPage = () => {
  useEffect(() => {
    getCourses();
  }, []);
  return (
    <Box>
      <Typography variant="h3">Courses list</Typography>
    </Box>
  );
};

export default CoursesPage;
