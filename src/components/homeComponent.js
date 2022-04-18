import React,{useEffect} from 'react'
import { Card,Row,Col} from 'antd';
import { listCourses } from '../redux/actions/courseAction';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

const card_css= {
 "width":"300px",
 "marginLeft":"20px",
 "border":"2px solid #f5ecd7",
 "marginTop":"10px"
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
      
      cover={ course.thumbnail && <img src ={`http://localhost:8080/api/courses/image/${course.courseId}`} alt =""/>}
    > 
        <Meta title={course.courseName}  />
    
    
    </Card>
    </Link>
      </Col>
    
    </Row>
    )
})


}




  return(
<>  
<h1> image</h1>


{

fetchdata()

 }
</>
  )
}
 export default HomeComponent;