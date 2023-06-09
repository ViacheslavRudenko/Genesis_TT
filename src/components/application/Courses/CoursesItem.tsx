import { Box, Grid, Rating, Stack, Typography } from "@mui/material";
import { FC, memo, useState } from "react";
import { CourseTypes } from "../../../types/course";
import CustomLink from "../../ui/Link";
import List from "../../ui/List";
import Poster from "../../ui/Poster";
import VideoPlayer from "../VideoPlayer/VideoPlayer";

const CoursesItem: FC<CoursesItemTypes> = ({ course }) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const {
    id,
    previewImageLink,
    title,
    lessonsCount,
    meta: { skills, courseVideoPreview },
    rating,
  } = course;

  return (
    <Grid item xs={12} md={6} sx={styles.container} component="li" p={0}>
      <Box
        sx={styles.movieBox}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      >
        {isHover && !!courseVideoPreview?.link ? (
          <VideoPlayer videoSourceUrl={courseVideoPreview.link} />
        ) : (
          <Poster img={previewImageLink + "/cover.webp"} />
        )}
      </Box>
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
        <CustomLink link={id}>The lesson details</CustomLink>
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
    position: "relative",
  },
  btnContainer: {
    position: "absolute",
    bottom: "0",
    width: "100%",
    textAlign: "center",
  },
  movieBox: {
    height: {
      xs: "20vh",
      sm: "50vh",
      md: "30vh",
      lg: "35vh",
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
    },
  },
};

export default memo(CoursesItem);
