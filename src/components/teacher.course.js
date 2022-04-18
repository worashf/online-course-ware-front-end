import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Modal, Button, Input, Select, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { EditOutlined, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { listCategories } from '../redux/actions/categoryActions';
import { addCourse, listCourses, deleteCourse, updateCourse } from '../redux/actions/courseAction';

const { TextArea } = Input;
const { Option } = Select;
const search_div = {
  "background": "#1b418c",
  "color": "#fff",

  "marginBottom": "10px",
  "borderRadius": "5px",
  "fontSize": "20px",

  "border": "1px solid #6e6859 ",
  "marginLeft": "200px",

}
const select_box = {
  "width": "80%",
  "padding": "10px",
  "marginBottom": "20px",
}

const token = localStorage.getItem("token")
const TeacherCourse = () => {

  const [isAdd, setIsAdd] = useState(false)
  const [courseByCategory, setCourseByCategory] = useState([]);
  const [search, setSearch] = useState(false);
  const [request, setRequest] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [userName, setUserName] = useState("");
  const [student,setStudent] = useState(null);
  const [isEnroll,setIsEnroll] =useState(false);
  const categories = useSelector(state => state.categories);
  const currentUser = useSelector(state => state.users.currentUser);

  const courses = useSelector((state => state.courses));

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(listCategories())
    dispatch(listCourses())
  }, [])

  const handleAdd = (course) => {
    setIsAdd(true)
    const { courseId } = course
    setCourseId(courseId);
    setUserName(currentUser.userName)
  }

  const resetAdd = () => {
    setIsAdd(false);
  }

  const handleSearch = async () => {

    const response = await axios.get(`http://localhost:8080/api/courses/${categoryId}`,
      { headers: { "Authorization": `Bearer ${token}` } });
    setCourseByCategory(response.data)
    setSearch(true);

  }
  const handleRequestSubmit = async () => {


    const response = await axios.post(`http://localhost:8080/api/requests/${courseId}/${userName}`, request,
      { headers: { "Authorization": `Bearer ${token}` } });
    console.log(response.data)
    setRequest(null)

  }
  const handleAddEnroll =(course)=>{
    setIsEnroll(true);
    const {courseId} = course;
    setCourseId(courseId);
    console.log(courseId)

  }
  const resetIsEnroll =() =>{
    setIsEnroll(false);
    setCourseId("");
    setStudent(null);
  }
  const handleEnroll = async () => {
    const response = await axios.put(`http://localhost:8080/api/enroll/${courseId}`,student,
      { headers: { "Authorization": `Bearer ${token}` } });
    console.log(response.data)
    if(response.data.studentId){
      message.success("enrolled succesfully",1);
    }
    if(response.data.studentId ===null){
    message.error("not enrolled",1)
  }
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
      title: "Course Thumbnail",
      dataIndex: "thumbnail",

    },
    {
      key: 4,
      title: "Actions",
      render: (record) => {
        return (
          <>
            {currentUser.role === "Teacher" ?

              <Button onClick={() => handleAdd(record)} icon={< EditOutlined />} style={{ color: "blue", marginLeft: 10, fontSize: 18 }}>Become Teacher </Button> :


              <Button onClick={() => handleAddEnroll(record)} icon={< EditOutlined />} style={{ color: "blue", marginLeft: 10, fontSize: 18 }}>Enroll  </Button>

            }

          </>
        )
      }

    }
  ]

  const renderEnroll =() =>{
    return (
    
  <>
        <Modal
          title= "Enroll to course"
          visible={isEnroll}
          okText="Save"
          onCancel={resetIsEnroll}
          onOk={() => {
            handleEnroll();
            resetIsEnroll();
             
           }}
        >
          <label style={{ fontWeight: 400, color: "blue", marginBottom: 10}}>
           
            Student Code
          </label>
  
          <Input placeholder='Enter Student code'
            style={{ marginTop: 10,padding: 10}}
            value={student?.studentCode}
            allowClear
            onChange={(e) => {
             
              setStudent((pre) => {
              
                return { ...pre, studentCode: e.target.value };
              });
            }}
          />
         
       
     </Modal>
  
      </>
  
        
    )
  }

  const renderAddRequestModal = () => {
    return (

      <>
        <Modal
          title="Add Request"
          visible={isAdd}
          okText="Save"
          onCancel={resetAdd}
          onOk={() => {
            //  dispatch(addCourse(course));
            handleRequestSubmit();
            resetAdd();
          }}
        >

          <label style={{ fontWeight: 400, color: "blue", marginBottom: 10, display: "block" }}>
            Course Id
          </label>
          <Input value={courseId} disabled style={{ marginTop: 10, marginBottom: 10 }} />
          <label style={{ fontWeight: 400, color: "blue", marginBottom: 10, display: "block" }}>
            Your User Name
          </label>
          <Input value={userName} disabled style={{ marginTop: 10, marginBottom: 10 }} />
          <label style={{ fontWeight: 400, color: "blue", marginBottom: 10, display: "block" }}>
            Request Name
          </label>

          <Input placeholder='Enter Request Name'
            style={{ marginTop: 10, padding: 10 }}
            value={request?.requestName}
            allowClear
            onChange={(e) => {
              setRequest((pre) => {
                return { ...pre, requestName: e.target.value };
              });
            }}
          />

          <label style={{ fontWeight: 400, color: "blue", marginBottom: 10, display: "block" }}>

            Your Experiance
          </label>
          <TextArea rows={4} placeholder="Enter Your Experiance"
            value={request?.experiance}
            onChange={(e) => {
              setRequest((pre) => {
                return { ...pre, experiance: e.target.value }
              })
            }}
          />









        </Modal>

      </>


    )
  }











  return (
    <>

      <div style={search_div}  >
        <label style={{ fontWeight: 400, color: "#fff", marginLeft: 10, marginBottom: 10, marginTop: 10, display: "block" }}>
          Search By Course Category

        </label>
        <Select
          onChange={(value) => {
            setCategoryId(value)
          }}
          name="category"
          placeholder="Please select course category"
          style={select_box}
        >
          {categories &&
            Array.isArray(categories) &&
            categories.map(category => {
              return <Option style={{ marginBottom: 10, padding: 10 }} value={category.categoryId}>{category.categoryName}</Option>
            })}
        </Select>

        <Button onClick={handleSearch} icon={<PlusCircleOutlined style={{ color: "#fff" }} />} size="large" > Search </Button>

      </div>
      <Table
        dataSource={search ? courseByCategory : courses}
        columns={CourseColumns}
        bordered="true"
      >
        <img src=''  alt =""/>
      </Table>


      {isAdd && renderAddRequestModal()}
      {isEnroll && renderEnroll()}


    </>
  )
}


export default TeacherCourse;

