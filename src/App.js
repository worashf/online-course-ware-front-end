import React from 'react';
import AdminCategory from './pages/adminCategory';
import AdminCourse from './pages/adminCourse';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signUp';
import  {  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom"
import 'antd/dist/antd.css'


function App() {
  return (
    <div >
       <Router>
        <Routes>
          <Route path="/" element={<Home/>}>
         
          </Route>
          <Route path="/category" element={<AdminCategory/>}>
         
         </Route>
          <Route path="/course" element={<AdminCourse/>}>
         
         </Route>
         <Route path="/login" element={<Login/>}>
         
         </Route>
         <Route path="/signup" element={<Signup/>}>
         
         </Route>
       
        </Routes>
        </Router>
    </div>
  );
}

export default App;
