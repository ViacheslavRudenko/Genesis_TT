import { Box, Grid, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourse } from "../api/courses";
import CustomAlert from "../components/ui/Alert";
import Btn from "../components/ui/Btn";
import LoadingSpinner from "../components/ui/Spiner";
import VideoPlayer from "../components/ui/VideoPlayer";
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
      <Typography component="h6" align="center" fontWeight="bold">
        {course?.title}
      </Typography>
      <Typography>{course?.description}</Typography>
      {course?.lessons.map((lesson, index) => {
        const { title, duration, status, previewImageLink, order } = lesson;
        return (
          <Grid container spacing={2}>
            <Grid item xs={3}>
              Lesson № {index}
            </Grid>
            <Grid item xs={7} sm={5}>
              {title}
            </Grid>
            <Grid item display={{ xs: "none", sm: "flex" }} md={2}>
              {duration} minutes
            </Grid>
            <Grid item xs={2}>
              <Btn
                click={() => {}}
                disabled={status === "locked" ? true : false}
              >
                {status === "locked" ? "Locked" : "Open"}
              </Btn>

              <VideoPlayer
                videoSourceUrl={`${previewImageLink}/lesson-${order}.webp`}
              />
            </Grid>
          </Grid>
        );
      })}
      {err && <CustomAlert text={err} />}
    </Box>
  );
};

export default LessonViewingPage;
