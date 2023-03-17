import { FC, ReactElement } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import CoursesPage from "../../pages/CoursesPage";
import LessonViewingPage from "../../pages/LessonViewingPage";

const Routing: FC = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/courses" />}></Route>
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:id" element={<LessonViewingPage />} />
    </Routes>
  );
};

export default Routing;
