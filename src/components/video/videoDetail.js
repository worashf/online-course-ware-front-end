
import React,{useState,useEffect} from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { Card,Collapse,Typography, Row,Col} from 'antd';
import {VideoCameraOutlined } from "@ant-design/icons"
import { Link } from 'react-router-dom';
import './video.css'
import axios from 'axios';



const {Panel} = Collapse;
const VideoDetail = () =>  {
    const {courseId,videoId} =useParams();
    const [course, setCourse] = useState();
    const findCourse = async() =>{
        const response = await axios.get(`http://localhost:8080/api/courses-id/${courseId}`);
        if(response.data.courseId){
          setCourse(response.data)
         
        }
      };

useEffect(()=>{
 findCourse();
},[])

return(
 <div className='course-video'>
         <h2><span style={{color:"blue",marginRight:10}}> Course Name</span> {course?.courseName}</h2>
    
<Row>
 <Col span={8}>
 <div className='course-material'>
 
      <Card title="video"  >

      <Collapse accordion>
  
 <Panel header="" key="1">
  
     <Link to ="" className='video-link'> 
     <VideoCameraOutlined style={{color:"blue",marginRight:10}}/>
     <h5> video </h5>
     </Link>
    

   
 
</Panel>
 
   
     

   </Collapse>
          
      </Card>

   
 </div>
 </Col>
 <Col span={16}>
 <div className='video' >
     <ReactPlayer url ={`http://localhost:8080/api/videos/video/${videoId}`}  
     width="98%"  playing className="react-player" controls>

     </ReactPlayer>
 </div>
 </Col>

 </Row>
 </div>
 )
}
 

export default VideoDetail;

