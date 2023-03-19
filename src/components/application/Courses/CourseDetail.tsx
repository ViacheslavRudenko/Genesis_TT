import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { CourseTypes } from "../../../types/course";

const CourseDetails: FC<CourseDetailsTypes> = ({ course }) => {
  return (
    <Box sx={styles.box} p={2}>
      <Typography component="h6" variant="h6" align="center" fontWeight="bold">
        {course.title}
      </Typography>
      <Typography align="center" paddingY={1}>
        {course.description}
      </Typography>
    </Box>
  );
};

type CourseDetailsTypes = {
  course: CourseTypes;
};

const styles = {
  box: {
    border: "1px solid grey",
    borderRadius: "20px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
    paddingY: 3,
  },
};

export default CourseDetails;
