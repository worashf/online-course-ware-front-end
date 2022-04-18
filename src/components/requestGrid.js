import React,{useState,useEffect} from 'react';
import { Table,Modal,Button,Input,Select} from 'antd';
import { listRequests } from '../redux/actions/requestAction';
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios';
/**
* @author
* @function RequestGrid
**/

const token = localStorage.getItem("token")
 const RequestGrid = (props) => {

const [isUser,setIsUser] =useState(false);
const [isCourse,setIsCourse]= useState(false)
 const [requestUser, setRequestUser] =useState(null)
 const [course,setCourse] =useState(null);
const requests = useSelector(state => state.requests);
 const dispatch = useDispatch();
 const unApprovedRequest = requests.filter(request=>request.requestStatus ===null? request:null)

 


  useEffect(()=>{
   dispatch(listRequests());
  },[dispatch])


  const handleShowUser =async(request)=>{
      const {requestId} = request;
      console.log(request)
      const response = await axios.get(`http://localhost:8080/api/user/requests/${requestId}`,
      { headers: {"Authorization" : `Bearer ${token}`} });
      console.log(response.data)
      setRequestUser(response.data)
      setIsUser(true)
  }
  const resetUserInfo =()=>{
    setIsUser(false)
}
  const handleShowCourse =async(request)=>{
    const {requestId} = request;
    
    const response = await axios.get(`http://localhost:8080/api/course/requests/${requestId}`,
    { headers: {"Authorization" : `Bearer ${token}`} });
    console.log(response.data)
     setCourse(response.data)
     setIsCourse(true)
}
const resetCourseInfo =()=>{
   setIsCourse(false)
}

const handleApprove =async(request) =>{
    const {requestId} = request;
   
    const response = await axios.get(`http://localhost:8080/api/course/requests/${requestId}`,
    { headers: {"Authorization" : `Bearer ${token}`} });
     const{courseId}  = response.data;
     const res = await axios.get(`http://localhost:8080/api/user/requests/${requestId}`,
     { headers: {"Authorization" : `Bearer ${token}`} });
     const{userId} = res.data;
     const params = new URLSearchParams();

      alert(courseId)
      alert(userId)
   
    params.append("courseId",courseId);
    params.append("userId",userId);
     const respo = await axios.post(`http://localhost:8080/api/requests/approve/${requestId}`,
    params, { headers: {"Authorization" : `Bearer ${token}`},
     'Content-Type': 'application/x-www-form-urlencoded' });
 console.log(respo.data)

}
    const  requestColumns = [
        {
            key: 1,
            title: "Request Id",
            dataIndex: "requestId",
            width:"8%"

        },
        {
            key: 2,
            title: "Request Name",
            dataIndex: "requestName",
            width:"20%"

        },
        {
            key: 3,
            title: "Actions",
            render: (record) => {
                return (
                    <>
                    <Button  onClick={()=>handleShowUser (record)}   style={{ color: "blue", marginLeft: 10, fontSize: 18 }}> Show User </Button>
                    <Button  onClick={()=>handleShowCourse (record)}   style={{ color: "blue", marginLeft: 10, fontSize: 18 }}> Show Course </Button>
                    <Button  onClick={ ()=>{handleApprove(record)}}style={{ color: "green", marginLeft: 10, fontSize: 18 }} > Approve</Button>
                    <Button  style={{ color: "red", marginLeft: 10, fontSize: 18 }} > Decline</Button>
                    </>
                )
            }

        }
    ]
    const renderUserIfo =()=>{
        return (
        
            <>
                       <Modal
                         title= "Teacher Info"
                         visible={isUser}
                         okText="Ok"
                         onCancel={resetUserInfo}
                         onOk={() => {
                            resetUserInfo()
                          }}
                       >
             
           
           
             <label style={{ fontWeight: 400, color: "blue", marginBottom: 10,display:"block"}}>
                          
                          First  Name
                        </label>
              
                        <Input placeholder='Enter Course Name'
                          style={{ marginTop: 10,padding: 10}}
                          value={requestUser.firstName}
                            disabled 
                        />
                           <label style={{ fontWeight: 400, color: "blue", marginBottom: 10,display:"block"}}>
                          
                          Last  Name
                        </label>
              
                        <Input placeholder='Enter Course Name'
                          style={{ marginTop: 10,padding: 10}}
                          value={requestUser.lastName}
                            disabled 
                        />
                         <label style={{ fontWeight: 400, color: "blue", marginBottom: 10,display:"block"}}>
                          
                           User  Name
                         </label>
               
                         <Input placeholder='Enter Course Name'
                           style={{ marginTop: 10,padding: 10}}
                           value={requestUser.userName}
                             disabled 
                         />
                        
                      
                     
                        
           
                       
                        
                        
                        
                    </Modal>
             
                     </>
           
                       
                   )
               }
           
            
               const renderCourseIfo =()=>{
                return (
                
                    <>
                               <Modal
                                 title= "Course Info"
                                 visible={isCourse}
                                 okText="Ok"
                                 onCancel={resetCourseInfo}
                                 onOk={() => {
                                   resetCourseInfo()
                                  }}
                               >
                     
                     <label style={{ fontWeight: 400, color: "blue", marginBottom: 10,display:"block"}}>
                                  
                                  Course  Id
                                </label>
                      
                                <Input placeholder='Enter Course Name'
                                  style={{ marginTop: 10,padding: 10}}
                                  value={course.courseId}
                                    disabled 
                                />
                             
                   
                     <label style={{ fontWeight: 400, color: "blue", marginBottom: 10,display:"block"}}>
                                  
                                  Course  Name
                                </label>
                      
                                <Input placeholder='Enter Course Name'
                                  style={{ marginTop: 10,padding: 10}}
                                  value={course.courseName}
                                    disabled 
                                />
                             
                          
                                
                              
                             
                                
                   
                               
                                
                                
                                
                            </Modal>
                     
                             </>
                   
                               
                           )
                       }
                   
                    

  return(
    <>
    <Table
                dataSource={unApprovedRequest }
                columns={requestColumns}
                bordered="true"
            >

            </Table>
            {isUser && renderUserIfo()}
            {isCourse && renderCourseIfo()}
    </>
   )

 }
 export default RequestGrid;