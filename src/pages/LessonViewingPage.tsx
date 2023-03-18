import { Box } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCourse } from "../api/courses";
import CourseDetails from "../components/application/Courses/CourseDetail";
import LessonsList from "../components/application/Lesson/LessonsList";
import CustomAlert from "../components/ui/Alert";
import Btn from "../components/ui/Btn";
import LoadingSpinner from "../components/ui/Spiner";
import VideoPlayer from "../components/ui/VideoPlayer";
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
  }, []);

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
            <VideoPlayer videoSourceUrl={lessonVideoData.link} />
          )}
          <LessonsList
            lessons={course.lessons}
            setLessonForVideo={setLessonForVideo}
          />
        </>
      )}
      <Box pb={5}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Btn> Go back to courses list</Btn>
        </Link>
      </Box>
      {err && <CustomAlert text={err} />}
    </Box>
  );
};

export default LessonViewingPage;
