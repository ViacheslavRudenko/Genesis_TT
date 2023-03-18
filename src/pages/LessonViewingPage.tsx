import { Box, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourse } from "../api/courses";
import CourseDetails from "../components/application/Courses/CourseDetail";
import LessonsList from "../components/application/Lesson/LessonsList";
import CustomAlert from "../components/ui/Alert";
import LoadingSpinner from "../components/ui/Spiner";
import VideoPlayer from "../components/application/VideoPlayer/VideoPlayer";
import { CourseTypes, LessonTypes } from "../types/course";

const LessonViewingPage: FC = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseTypes>();
  const [err, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lessonVideoData, setLessonVideoData] = useState<LessonTypes>();

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
  }, [id]);

  const setLessonForVideo = (lesson: LessonTypes | undefined): void => {
    lesson && setLessonVideoData(lesson);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Box paddingY={3}>
      {course && (
        <>
          <CourseDetails course={course} />
          {lessonVideoData && (
            <Box paddingY={4}>
              <Typography textAlign="center" fontWeight="bold">
                The video of the lesson {lessonVideoData.order} is playing
              </Typography>
              <VideoPlayer
                videoSourceUrl={lessonVideoData.link}
                lessonId={lessonVideoData.id}
              />
            </Box>
          )}
          <LessonsList
            lessons={course.lessons}
            setLessonForVideo={setLessonForVideo}
          />
        </>
      )}
      {err && <CustomAlert text={err} />}
    </Box>
  );
};

export default LessonViewingPage;
