import { Box, Grid, Rating, Stack, Typography } from "@mui/material";
import { FC, memo } from "react";
import { CourseTypes } from "../../../types/course";
import Btn from "../../ui/Btn";
import List from "../../ui/List";
import Poster from "../../ui/Poster";

const CoursesItem: FC<CoursesItemTypes> = ({ course }) => {
  const {
    previewImageLink,
    title,
    lessonsCount,
    meta: { skills },
    rating,
    containsLockedLessons,
  } = course;
  console.log(course);

  return (
    <Grid
      item
      xs={12}
      md={6}
      sx={styles.container}
      component="li"
      p={0}
      position="relative"
    >
      <Poster img={previewImageLink + "/cover.webp"} />
      <Box paddingY={2}>
        {/* Title */}
        <Typography component="h6" fontWeight="bold" sx={styles.title}>
          {title}
        </Typography>
        {/* Rating */}
        <Stack alignItems="flex-end">
          <Rating defaultValue={rating} precision={0.5} />
        </Stack>
        {/* Number of lessons */}
        <Typography>
          <Typography fontWeight="bold" component="span">
            Number of lessons: &nbsp;
          </Typography>
          {lessonsCount}
        </Typography>
        {/* Skills */}
        {skills && <List title="Skills" array={skills} />}
      </Box>
      <Box sx={styles.btnContainer}>
        <Btn click={() => {}} disabled={containsLockedLessons}>
          The lesson{containsLockedLessons ? " is locked" : " details"}
        </Btn>
      </Box>
    </Grid>
  );
};

type CoursesItemTypes = {
  course: CourseTypes;
};

const styles = {
  title: {
    textAlign: "center",
    paddingBottom: "10px",
  },
  container: {
    listStyleType: "none",

    paddingBottom: 2,
  },
  btnContainer: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    textAlign: "center",
  },
};

export default memo(CoursesItem);
