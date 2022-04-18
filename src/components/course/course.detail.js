
import React,{useState,useEffect} from 'react';

import { useParams } from 'react-router-dom';
import { Card,Collapse,Typography,  } from 'antd';
import {VideoCameraOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';
import "./courseDetail.css";
import axios from 'axios';



const {Panel} = Collapse;
const { Title } = Typography;
const CourseDetail = () =>  {
 const [course, setCourse] = useState();
 const [topics,setTopics] =useState([]);
 const [materials, setMaterials] =useState([]);
 const [videos, setVideos] =useState([]);

 const {courseId} = useParams();
 console.log("courseI",courseId);

 const findCourse = async() =>{
  const response = await axios.get(`http://localhost:8080/api/courses-id/${courseId}`);
  if(response.data.courseId){
    setCourse(response.data)
    setTopics(response.data.topics)
    console.log(response.data)
    console.log("topics",response.data.topics)
  }
};
// const findTopics = async() =>{
//   const response = await axios.get(`http://localhost:8080/api/topics/${courseId}`);
//   if(response.data.topicId){
//     setTopics(response.data)
//     console.log(response.data)
//   }
// };
 useEffect(()=>{

  findCourse();
  // findTopics();
},[]);
 

  

 return(
     <>
     <div className='course-title'>
      <h2><span style={{color:"blue",marginRight:10}}> Course Name</span>{course?.courseName}</h2>
      <h1> Course Objective</h1>
     </div>
     <div className='course-objective'>
  {course?.objective}
     </div>
     {
       course?.topics.map(topic =>(
        
<div className='table-content'>
      <Card title={topic.topicName}  >

      <Collapse accordion>
     {topic.materials.map(material=>(
 <Panel header={material.materialName} key={material.materialId}>
   {material.videos.map(video=>(
     <Link to ={`/video-detail/${courseId}/${video.videoId}`} className='video-link'> 
     <VideoCameraOutlined style={{color:"blue",marginRight:10}}/>
     <h5> 
     {video.videoTitle}</h5>
     </Link>
    

   ))}
 
</Panel>
     ))}
   
     

   </Collapse>
          
      </Card>

     </div>
       ))
     }
     
     <div className='course-requirement' >
        {course?.requirements}
     </div>
     <div className='description'>
  {course?.description}
     </div>
     <div className='comment'>

     </div>
     
     </>
 )
}
 

export default CourseDetail;

