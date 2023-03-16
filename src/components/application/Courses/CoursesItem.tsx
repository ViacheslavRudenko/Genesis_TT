import { Box, Grid, Rating, Typography } from "@mui/material";
import { FC, memo } from "react";
import { CourseTypes } from "../../../types/course";
import List from "../../ui/List";
import Poster from "../../ui/Poster";

const CoursesItem: FC<CoursesItemTypes> = ({ course }) => {
  const {
    previewImageLink,
    title,
    lessonsCount,
    meta: { skills },
    rating,
  } = course;

  return (
    <Grid item xs={12} md={6} sx={styles.container} component="li" p={0}>
      <Poster img={previewImageLink + "/cover.webp"} />
      <Box paddingY={2}>
        <Typography component="h6" fontWeight="bold" sx={styles.title}>
          {title}
        </Typography>
        <Typography>
          <Typography fontWeight="bold" component="span">
            Number of lessons:
          </Typography>
          {lessonsCount}
        </Typography>
        {skills && <List title="Skills" array={skills} />}
        <Rating defaultValue={rating} precision={0.5} />
      </Box>
    </Grid>
  );
};

type CoursesItemTypes = {
  course: CourseTypes;
};

const styles = {
  title: { textAlign: "center", paddingBottom: "10px" },
  container: {
    listStyleType: "none",
  },
};

export default memo(CoursesItem);
