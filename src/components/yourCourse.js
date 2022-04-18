import React,{useState,useEffect} from 'react';
import axios  from 'axios';
import { Table,Modal,Button, Upload,message,
    Input,Select} from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import {EditOutlined,UploadOutlined,
    DownCircleOutlined,FolderAddOutlined ,
    UpCircleOutlined,DeleteOutlined,DownOutlined } from "@ant-design/icons"
import { addTopic,listTopics,updateTopic,deleteTopics } from '../redux/actions/topicAction';
import { updateCourse } from '../redux/actions/courseAction';

const {TextArea} =Input;
const {Option} = Select;
const  search_div ={
    "background": "#1b418c",
    "color": "#fff",
    
    "marginBottom": "10px",
    "borderRadius": "5px",
    "fontSize": "20px",
 
    "border": "1px solid #6e6859 ",
    "marginLeft": "200px",
  
}
const select_box={
  "width":"80%",
  "padding":"10px",
  "marginBottom": "20px",
}

 const token = localStorage.getItem("token")
const YourCourse= () => {
  const [courses,setCourses] = useState([]);
 const [course, setCourse] =useState(null);
  const [isEdit,setIsEdit] =useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [isTopic ,setIsTopic] =  useState(false);
  const [showTopic, setShowTopic]  = useState(false);
  const [isEditTopic,setIsEditTopic] =useState(false);
  const[topic,setTopic] =useState(null);
 const [topics, setTopics] =useState([])
  const [ courseId ,setCourseId] = useState("");
  const [isAddMaterial,setIsAddMAterial] = useState(false);
  const [isShowMaterial,setIsShowMaterial] =useState(false);
  const [materials,setMaterials] = useState([]);
  const [material,setMaterial] =useState(null);
  const [topicId,setTopicId] =useState("");
  const [isMaterialEdit,setIsMaterialEdit] = useState(false);
  const [videoTitle,setVideoTitle] =useState("");
  const [isVideoUpload,setIsVideoUpload] =useState(false);
  const [materialId,setMaterialId] =useState("")

   const currentUser=useSelector(state=> state.users.currentUser)
 
   const {userName} =currentUser
   const{role} =currentUser
   
    const dispatch = useDispatch();


useEffect(()=>{
    handleSelectApproved()
},[])


 
   
    const handleSelectApproved =async()=>{
       
         if(role === "Teacher"){
            const response = await axios.get(`http://localhost:8080/api/your/courses/${userName}`,
            { headers: {"Authorization" : `Bearer ${token}`} });
        setCourses(response.data)
         }
         if(role === "Student"){
            const response = await axios.get(`http://localhost:8080/api/courses/student/${userName}`,
            { headers: {"Authorization" : `Bearer ${token}`} });
        setCourses(response.data)
         }
  

      }
const HandleIsEdit =(course)=>{
          setIsEdit(true)
          setCourse(course)
      }

const resetEdit =()=>{
    setIsEdit(false)
}
const resetUpload =()=>{
    setIsUpload(false);
}
const handleIsUpload =(course)=>{
    setIsUpload(true);
    const {courseId} =course
    setCourseId(courseId);
}
const handeIsTopic =(course)=>{
    const {courseId} =course;
    setCourseId(courseId);
    setIsTopic(true);

}
const resetTopic =()=>{
    setIsTopic(false)
}

const handleShowTopic =async(course)=>{
    const {courseId} =course
 setShowTopic(true)
 setIsShowMaterial(false)
 const response = await axios.get(`http://localhost:8080/api/topics/${courseId}`,
 { headers: {"Authorization" : `Bearer ${token}`} });
  setTopics(response.data)
}
const handleHideTopic =()=>{
    setShowTopic(false)
    setTopics(null)
}
const handleEditTopic =(topic) =>{
   setIsEditTopic(true)
   setTopic(topic)
}
const resetEditTopic =()=>{
    setIsEditTopic(false);
    setIsTopic(null)
}
const handleDeleteTopic =(topic) =>{
    Modal.confirm({
        title: "Are you sure to delete this topic",
        okText: "Yes",
        okType: "danger",
        onOk: () => {
            dispatch(deleteTopics(topic));

        }
    })
}
const handleAddMaterial =(topic)=>{
    const {topicId} =topic
    setTopicId(topicId);
    setIsAddMAterial(true);

}
const resetAddMaterial =()=>{
    setIsAddMAterial(false);
    setMaterial(null);
    setTopicId("")
}

const handleCreateMaterial =async() =>{
     console.log(material)
     const response = await axios.post(`http://localhost:8080/api/materials/${topicId}`, material,
    { headers: {"Authorization" : `Bearer ${token}`} });
     if(response.data.topicId !==null){
         message.success("material created succesfully",1)
     }
     else{
         message.error("Material not Created",1)
     }
     resetAddMaterial();
   


}
const handleShowMaterial =async(topic)=>{
    const {topicId} =topic
    setTopicId(topicId)
    setShowTopic(false)
   setIsShowMaterial(true)
 const response = await axios.get(`http://localhost:8080/api/materials/${topicId}`,
 { headers: {"Authorization" : `Bearer ${token}`} });
  setMaterials(response.data)
}
const handleMaterialEdit =(material) =>{
    setIsMaterialEdit(true);
    setMaterial(material);

}
const resetEditMaterial =()=>{
    setIsMaterialEdit(false);
    setMaterial(null);
}

const handleUpdateMaterial =async() =>{
    console.log(material)
    const {materialId} =material;
    const response = await axios.put(`http://localhost:8080/api/materials/${materialId}`, material,
   { headers: {"Authorization" : `Bearer ${token}`} });
    if(response.data.topicId !==null){
        message.success("material updated succesfully",1)
    }
    else{
        message.error("Material not updated",1)
    }
    resetEditMaterial();
   
}

const handleDeleteMaterial =(material) =>{
    const {materialId} =material
    Modal.confirm({
        title: "Are you sure to delete this material",
        okText: "Yes",
        okType: "danger",
        onOk: async() => {
            const response = await axios.delete(`http://localhost:8080/api/materials/${materialId}`);
          if(response.data.deleted===true){
             message.success("Material deleted succesfully",1)
          }
          else{
            message.error("Material not deleted succesfully",1)
          }
        }
    })
}
const handleVideoUpload =(material)=>{
    setIsVideoUpload(true);
    const {materialId} =material
    setMaterialId(materialId)
}
const resetVideoUpload =() =>{
    setIsVideoUpload(false);
    setMaterialId("");
}
    const CourseColumns = [
      {
          key: 1,
          title: "Course Id",
          dataIndex: "courseId",

      },
      {
          key: 2,
          title: "Course Name",
          dataIndex: "courseName",

      },
      {
          key: 3,
          title: "Actions",
          render: (record) => {
              return (
                  <>
                {role ==="Teacher"?
(  <>
    <Button onClick={()=>{HandleIsEdit(record)}}  icon={< EditOutlined/>}   style={{ color: "blue", marginLeft: 10, fontSize: 15 }}>Edit </Button>
    <Button onClick={()=>{handleIsUpload(record)}}  icon={< UploadOutlined />}   style={{ color: "blue", marginLeft: 10, fontSize: 15 }}>Upload  </Button>
    <Button  onClick={()=>{handeIsTopic(record)}} icon={< EditOutlined/>}   style={{ color: "blue", marginLeft: 10, fontSize: 15 }}>Create Topic </Button>
    <Button  onClick={()=>{handleShowTopic(record)}} icon={< DownCircleOutlined />}   style={{ color: "blue", marginLeft: 10, fontSize: 15}}>Show Topic </Button>
    <Button  onClick={()=>{handleHideTopic(record)}} icon={<UpCircleOutlined />}   style={{ color: "blue", marginLeft: 10, fontSize: 15}}>Show Hide </Button>
</>
): <>  <Button  icon={<UpCircleOutlined />}   style={{ color: "blue", marginLeft: 10, fontSize: 15}}>Show</Button> </>
                 
            }
                  </>
              )
          }

      }
  ]

  const TopicColumns = [
    {
        key: 1,
        title: "Topic Id",
        dataIndex: "topicId",

    },
    {
        key: 2,
        title: "Topic Title",
        dataIndex: "topicName",

    },
    {
        key: 3,
        title: "Actions",
        render: (record) => {
            return (
                <>
                <Button onClick={()=>{handleEditTopic (record)}}  icon={< EditOutlined/>}   style={{ color: "blue", marginLeft: 10, fontSize: 18 }}>Edit </Button>
                <Button  onClick={()=>{handleDeleteTopic(record)}} icon={< DeleteOutlined style={{color:"red"}}/>}   style={{ color: "blue", marginLeft: 10, fontSize: 18 }}>Delete </Button>
                
                <Button onClick={()=>{handleAddMaterial(record)}}  icon={<FolderAddOutlined />}   style={{ color: "blue", marginLeft: 10, fontSize: 18 }}>Create Material  </Button>
                <Button  onClick={()=>{handleShowMaterial(record)}} icon={< DownOutlined style={{color:"red"}}/>}   style={{ color: "blue", marginLeft: 10, fontSize: 18 }}>Show Material </Button>
              </>
            )
        }

    }
]

const MaterialColumns = [
    {
        key: 1,
        title: "Material Id",
        dataIndex: "materialId",

    },
    {
        key: 2,
        title: "Material Title",
        dataIndex: "materialName",

    },
    {
        key: 3,
        title: "Actions",
        render: (record) => {
            return (
                <>
                <Button onClick={()=>{handleMaterialEdit(record)}}  icon={< EditOutlined/>}   style={{ color: "blue", marginLeft: 10, fontSize: 18 }}>Edit </Button>
                <Button  onClick={()=>{handleDeleteMaterial(record)}} icon={< DeleteOutlined style={{color:"red"}}/>}   style={{ color: "blue", marginLeft: 10, fontSize: 18 }}>Delete </Button>
                
                <Button onClick={()=>{handleVideoUpload(record)}}  icon={<FolderAddOutlined />}   style={{ color: "blue", marginLeft: 10, fontSize: 18 }}>Upload Video  </Button>
                <Button  onClick={()=>{handleShowMaterial(record)}} icon={< DownOutlined style={{color:"red"}}/>}   style={{ color: "blue", marginLeft: 10, fontSize: 18 }}>Upload Document </Button>
              </>
            )
        }

    }
]
   
    const uploadImage = async (options) => {
        const { onSuccess, onError, file, onProgress } = options;
  
          console.log(file)
        const fmData = new FormData();
        const config = {
          headers: { "content-type": "multipart/form-data","Authorization" : `Bearer ${token}` },
 
        };
        fmData.append("file", file);
        try {
            const response = await axios.post(`http://localhost:8080/api/course/upload/${courseId}`,
            fmData,
            config
          );
    
          onSuccess("Ok");
      message.success(response.data)
        } catch (err) {
            const error = new Error("Some error");
            onError({ err });
     
        }
      };

      const uploadVideo = async (options) => {
        const { onSuccess, onError, file, onProgress } = options;
  
          console.log(file)
        const fmData = new FormData();
        const config = {
          headers: { "content-type": "multipart/form-data","Authorization" : `Bearer ${token}` },
 
        };
        fmData.append("file", file);
        fmData.append("videoTitle",videoTitle);
        try {
            const response = await axios.post(`http://localhost:8080/api/materials/videos/${materialId}`,
            fmData,
            config
          );
    
          onSuccess("Ok");
      message.success(response.data)
        } catch (err) {
            const error = new Error("Some error");
            onError({ err });
     
        }
      };
  const renderEditCourse =() =>{
    return (
    
<>
        <Modal
          title= "Edit Course Info"
          visible={isEdit}
          okText="Update"
          onCancel={resetEdit}
          onOk={() => {
           dispatch(updateCourse(course))
           message.success("Update successfully",1);
              resetEdit()
       
           }}
        >




          <label style={{ fontWeight: 400, color: "blue", marginBottom: 10,display:"block"}}>
           
            Course Name
          </label>

          <Input placeholder='Enter Course Name'
            style={{ marginTop: 10,padding: 10}}
            value={course?.courseName}
            allowClear
            onChange={(e) => {
              setCourse((pre) => {
               return { ...pre, courseName: e.target.value };
              });
            }}
          />
           <label style={{ fontWeight: 400, color: "blue", marginBottom: 10,display:"block"}}>
           
           Course Description
         </label>
          <TextArea  rows={4} placeholder ="Enter course description"
           value={course?.description}
           onChange ={(e)=>{
               setCourse((pre)=>{
                  return {...pre,description:e.target.value}
               })
           }}
          />
            <label style={{ fontWeight: 400, color: "blue", marginBottom: 10,display:"block"}}>
           
           Course Objective
         </label>
          <TextArea  rows={4} placeholder="Enter course objective"
           value={course?.objective}
           onChange ={(e)=>{
               setCourse((pre)=>{
                  return {...pre,objective:e.target.value}
               })
           }}
          />
            <label style={{ fontWeight: 400, color: "blue", marginBottom: 10,display:"block"}}>
           
           Course Requirement
         </label>
          <TextArea  rows={4} placeholder ="Enter course Requirement"
           value={course?.requirements}
           onChange ={(e)=>{
               setCourse((pre)=>{
                  return {...pre,requirements:e.target.value}
               })
           }}
          />
         

         
         
         
     </Modal>

      </>

        
    )
}

 const renderUpload =() =>{
     return(
         <>
         <Modal
          title= "Upload Course Thumbnail"
          visible={isUpload}
          onCancel={resetUpload}
         okButtonProps={{ style: { display: 'none' } }}
        >


<Upload 
    name='file'
    customRequest={uploadImage}
    listType ='picture'
    maxCount={1}
 

>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
        </Modal>
         </>
     )
 }
 const renderAddTopic =() =>{
     return(
         <>
           <Modal
          title= "Add Topic"
          visible={isTopic}
          onCancel={resetTopic}
          onOk={() => {
            dispatch(addTopic(courseId,topic))
            message.success("Saved successfully",2);
              resetTopic()
        
            }}
        >

    <label style={{ fontWeight: 400, color: "blue", marginBottom: 10,display:"block"}}>
           
           Topic Title
         </label>

     <Input placeholder='Enter Topic Title ' style={{padding:10}}
       value={topic?.topicName}
       onChange ={(e)=>{
           setTopic((pre)=>{
              return {...pre,topicName:e.target.value}
           })
       }}
     />
    

        </Modal>
         </>
     )
 }

 const renderEditTopic =() =>{

    return(
        <>
          <Modal
         title= "Edit Topic"
         visible={isEditTopic}
         onCancel={resetEditTopic}
         onOk={() => {
           dispatch(updateTopic(topic))
           message.success("update successfully",1);
             resetEditTopic();
       
           }}
       >

   <label style={{ fontWeight: 400, color: "blue", marginBottom: 10,display:"block"}}>
          
          Topic Title
        </label>

    <Input placeholder='Enter Topic Title ' style={{padding:10}}
      value={topic?.topicName}
      onChange ={(e)=>{
          setTopic((pre)=>{
             return {...pre,topicName:e.target.value}
          })
      }}
    />
   

       </Modal>
        </>
    )

 }
const renderAddMaterial =()=>{
    return(
        <>
          <Modal
         title= "Create Material"
         visible={isAddMaterial}
         onCancel={resetAddMaterial}
         onOk={() => {
        handleCreateMaterial();
       
           }}
       >

   <label style={{ fontWeight: 400, color: "blue", marginBottom: 10,display:"block"}}>
          
          Material Title
        </label>

    <Input placeholder='Enter Material Title ' style={{padding:10}}
      value={material?.materialName}
      onChange ={(e)=>{
          setMaterial((pre)=>{
             return {...pre,materialName:e.target.value}
          })
      }}
    />
   

       </Modal>
        </>
    )
} 

const renderEditMaterial =()=>{
    return(
        <>
          <Modal
         title= "Edit Material"
         visible={isMaterialEdit}
         onCancel={resetEditMaterial}
         onOk={() => {
        handleUpdateMaterial();
       
           }}
       >

   <label style={{ fontWeight: 400, color: "blue", marginBottom: 10,display:"block"}}>
          
          Material Title
        </label>

    <Input placeholder='Enter Material Title ' style={{padding:10}}
      value={material?.materialName}
      onChange ={(e)=>{
          setMaterial((pre)=>{
             return {...pre,materialName:e.target.value}
          })
      }}
    />
   

       </Modal>
        </>
    )
} 
const renderVideoUpload =() =>{
    return(
        <>
        <Modal
         title= "Upload Video Material"
         visible={isVideoUpload}
         onCancel={resetVideoUpload}
        okButtonProps={{ style: { display: 'none' } }}
       >
 <Input placeholder='Enter Video Title' value={videoTitle} 
  onChange ={((e)=> setVideoTitle(e.target.value))} style ={{marginBottom:20}}
/>

<Upload 
   name='file'
   customRequest={uploadVideo}
   listType ='picture'
   maxCount={1}


>
   <Button icon={<UploadOutlined />}>Click to Upload</Button>
 </Upload>
       </Modal>
        </>
    )
}
     return(
        <>
   

 <Table style={{marginTop:50}}
                dataSource={courses}
                columns={CourseColumns}
                bordered="true"
            >

  </Table>  
         
         {isEdit && renderEditCourse()}
         {isUpload && renderUpload()}
         {isTopic && renderAddTopic()}
        {showTopic && 
         ( <>
          <h1 style={{textAlign:"center",fontFamily:"cursive",fontWeight:600}}> Topics Of This Course </h1>
        <Table style={{marginTop:50}}
                dataSource={topics}
                columns={TopicColumns}
                bordered="true"
            >

  </Table> 
  </> )}
  {isShowMaterial && 
         ( <>
          <h1 style={{textAlign:"center",fontFamily:"cursive",fontWeight:600}}> Materials Of The Topic </h1>
        <Table style={{marginTop:50}}
                dataSource={materials}
                columns={MaterialColumns}
                bordered="true"
            >

  </Table> 
  </> )}
  {isEditTopic && renderEditTopic()}
  {isAddMaterial && renderAddMaterial()}
  {isMaterialEdit && renderEditMaterial()}
  {isVideoUpload && renderVideoUpload()}

       </>
    )
}
 

export default  YourCourse;

