import React,{useEffect} from 'react'
import { Card,Row,Col} from 'antd';
import { listCourses } from '../redux/actions/courseAction';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const card_css= {
 "width":"80%",
  
 "border":"2px solid #818a75",
 "margin":"20px auto",
 
}

const token =localStorage.getItem("token");
const { Meta } = Card;
 const HomeComponent = () => {
   
const courses  = useSelector((state => state.courses))
 const dispatch = useDispatch()

useEffect(()=>{
 dispatch(listCourses())
},[dispatch])

 const fetchdata =()=>{
  
return courses.map(course => {
  

  const courseId = course.courseId;
  if(course.thumbnail !==null){
    const res=   axios.get(`http://localhost:8080/api/courses/image/${courseId}`,  
    { headers: {"Authorization" : `Bearer ${token}`} 
     }
     )
  console.log(res)
  }
 
    return (
     
     
        <Row key ={courseId}>
      
      <Col span={24}>
        <Link to ={`/course-detail/${courseId}`}>
      <Card style ={card_css}
      hoverable
      title={`Course Name: ${course.courseName}`}
      cover={ course.thumbnail && <img src ={`http://localhost:8080/api/courses/image/${course.courseId}`} alt ="course thumbnail" style={{height:"300px",width:"100%"}}/>}
    > 
     
     <h2> Course Description</h2>
     <p> {course.description}</p>
    </Card>
    </Link>
      </Col>
    
    </Row>
  
  
    )
})


}




  return(
<>  
<h2 style={{fontSize:"20px", textAlign:"center",fontWeight:"700"}}> Top Courses</h2>


{

fetchdata()

 }
</>
  )
}
 export default HomeComponent;