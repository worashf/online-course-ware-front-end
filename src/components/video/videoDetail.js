
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
     <div className='table-content'>
       <h2 style={{textAlign:"center",fontWeight:"700",fontSize:"20px", marginTop:"10px"}}> Course Topics</h2>
     {
       course?.topics.map(topic =>(
        

      <Card title={topic.topicName}  headStyle ={{fontWeight:"700",fontSize:"20px"}} >

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

   
       ))
     }
       </div>

   
 </div>
 </Col>
 <Col span={16}>
 <div className='video' >
     <ReactPlayer url ={`http://localhost:8080/api/videos/video/${videoId}`}  
     width="98%" height="60vh"  className="react-player" controls>

     </ReactPlayer>
 </div>
 </Col>

 </Row>
 </div>
 )
}
 

export default VideoDetail;

