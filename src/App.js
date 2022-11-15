import React from 'react';
import AdminCategory from './pages/adminCategory';
import AdminCourse from './pages/adminCourse';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signUp';
import AdminUser from './pages/adminUsers';
import TeacherCoursePage from './pages/TeacherCourse';
import RequestPage from './pages/RequestPage';
import YourCoursePage from './pages/yourCoursePage';
import CourseDetailPage from './pages/course/courseDetailPage';
import AdminSignup from './pages/adminSignup';
import VideoPage from './pages/videoPage';
import QuestionPage from './pages/QuestionPage';
import  {  BrowserRouter as Router,
  Routes,
  Route,
 useParams 
} from "react-router-dom"
import 'antd/dist/antd.css'


function App() {
  const {courseId} = useParams();
  return (
    <div >
       <Router>
        <Routes>
          <Route path="/home" element={<Home/>}>
         
          </Route>
          <Route path="/category" element={<AdminCategory/>}>
         
         </Route>
          <Route path="/course" element={<AdminCourse/>}>
         
         </Route>
         <Route path="/user" element={<AdminUser/>}>
         
         </Route>
         <Route path="/teacher-course" element={<TeacherCoursePage/>}>
         
         </Route>
         <Route path="/" element={<Login/>}>
         
         </Route>
         <Route path="/request" element={<RequestPage/>}>
         
         </Route>
         <Route path="/your-course" element={<YourCoursePage/>}>
         
         </Route>
         <Route path="/signup" element={<Signup/>}>
         
         </Route>
       
         <Route path={`/course-detail/:courseId`} element={<CourseDetailPage/>}>
         
         </Route>
         <Route path="/admin" element={<AdminSignup/>}>
         
         </Route>
         <Route path={`/video-detail/:courseId/:videoId`} element={<VideoPage/>}>
         
         </Route>
         <Route path="/question" element={<QuestionPage/>}>
         
         </Route>
        </Routes>
        </Router>
    </div>
  );
}

export default App;
