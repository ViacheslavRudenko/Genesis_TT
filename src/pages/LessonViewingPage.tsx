import { Box, Typography } from "@mui/material";
import { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourse } from "../api/courses";
import CourseDetails from "../components/application/Courses/CourseDetail";
import LessonsList from "../components/application/Lesson/LessonsList";
import LoadingSpinner from "../components/ui/Spiner";
import VideoPlayer from "../components/application/VideoPlayer/VideoPlayer";
import { CourseTypes } from "../types/course";
import Context from "../context";

const LessonViewingPage: FC = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseTypes>();
  const { addErr } = useContext(Context);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isPlayerOpen, playerData } = useContext(Context);

  useEffect(() => {
    getCourse(id)
      .then((data: CourseTypes): void => {
        setCourse(data);
      })
      .catch((err: string): void => {
        addErr({ text: err });
      })
      .finally((): void => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box paddingY={3}>
      {course && (
        <>
          <CourseDetails course={course} />
          {playerData && (
            <Box paddingY={4}>
              <Typography textAlign="center" fontWeight="bold">
                The video of the lesson {playerData.order} is playing
              </Typography>
              {!isPlayerOpen && (
                <VideoPlayer
                  videoSourceUrl={playerData.link}
                  lessonId={playerData.id}
                />
              )}
            </Box>
          )}
          <LessonsList lessons={course.lessons} />
        </>
      )}
    </Box>
  );
};

export default LessonViewingPage;
