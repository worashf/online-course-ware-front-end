import React,{useState,useEffect} from 'react';
import { Table,Modal,Button,Input,Select} from 'antd';
import { useDispatch,useSelector } from 'react-redux';
import {EditOutlined,DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { addCourse,listCourses,deleteCourse,updateCourse } from '../redux/actions/courseAction';

const {TextArea} =Input;
const {Option} = Select;
const  new_button ={
     "background": "#1b418c",
    "color": "#fff",
    "height": "50px",
    "marginBottom": "20px",
    "borderRadius": "5px",
    "fontSize": "20px",
    "paddingBottom": "20px",
    "border": "1px solid #6e6859 ",
    "marginLeft": "300px",
  
}

const CourseGrid = () => {
 
    const [isAdd, setIsAdd] = useState(false);
    const [isEdit,setIsEdit] =useState(false);
    const [course, setCourse]  =useState(null);
    
   
   const categories = useSelector(state =>state.categories)
   const courses  = useSelector((state => state.courses))
   
    const dispatch = useDispatch();




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
                    <Button  onClick={() =>{ handleEdit(record)}} icon={< EditOutlined/>}   style={{ color: "blue", marginLeft: 10, fontSize: 18 }}/>
                      <Button onClick={() =>{handleDelete(record)}} icon={<DeleteOutlined />}  style={{ color: "red", marginLeft: 10, fontSize: 18 }} />
                    </>
                )
            }

        }
    ]
 useEffect(()=>{
     dispatch(listCourses());
 },[dispatch])

    const handleAdd =() =>{
        setIsAdd(true);
    }
    const resetAdd =() =>{
        setIsAdd(false);
        setCourse(null);
    }
    const handleEdit =(category)=>{

    }
    const handleDelete=(course) =>{
        Modal.confirm({
            title: "Are you sure to delete this course",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
                dispatch(deleteCourse(course));

            }
        })
    }

    const renderAddCourse =() =>{
        return (
        
 <>
            <Modal
              title= "Create Course"
              visible={isAdd}
              okText="Save"
              onCancel={resetAdd}
              onOk={() => {
                  dispatch(addCourse(course));
                 
                  resetAdd();
               }}
            >
     <label style={{ fontWeight: 400, color: "blue", marginBottom: 10,display:"block" }}>
               Select Course Category
                
              </label>
              <Select 
               onChange={value => {
                  setCourse(pre =>{
                    return { ...pre, categoryId: value };
                    ;
                  })
              }}
              name="category"
              placeholder="Please select course category"
                    >
                   { categories&& 
                       Array.isArray(categories) &&
                       categories.map(category=>{
                          return <Option style ={{ marginBottom: 10,}} value ={category.categoryId}>{category.categoryName}</Option>
                       })}
                       </Select>



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


    return(
        <>

          <Button onClick={handleAdd} icon={<PlusCircleOutlined  style={{ color: "#fff" }} />} size="large"  style={new_button}> New Course </Button>
               
            
             <Table
                dataSource={courses}
                columns={CourseColumns}
                bordered="true"
            >

            </Table>
            {isAdd && renderAddCourse()}
            {
                console.log(categories)
            }

       </>
    )
}
 

export default  CourseGrid;

