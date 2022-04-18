
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input,Button,Select,message ,Modal} from 'antd';
import { useSelector, useDispatch} from 'react-redux';
import { listRoles } from '../redux/actions/roleAction';
import PageContainer from '../components/pageContaner';
const form_div = {
    "background": "#6e6859 ",
    "padding": "20px 20px",
    "widht": "50%",
    "height":"90vh"
}

const UserType =[
    "Admin","Teacher","Author","Student"
]
const {Option} = Select;
const Signup =() =>{

 const [student,setStudent] = useState(null);
 const [isUserAdd , setIsUserAdd] =useState(false);
 const [user,setUser] = useState(null);
 const [studentId,setStudentId] = useState("");

const dispatch = useDispatch();

 const navigate = useNavigate();

useEffect(()=>{
  dispatch(listRoles())
},[])

 const handleRegisterStudent = async() =>{
  
    
    const response = await axios.post(`http://localhost:8080/api/students/`, student);
    console.log(response.data)
    if(response.data.studentId){
      message.success("Student saved successfuly",1);
      setStudentId(response.data.studentId)
       setIsUserAdd(true);
      
    }
    if(response.Error){
        alert("err")
    }
    
 }

const resetAddUser =()=>{
  setIsUserAdd(false);
  setUser(null);
}
const handleAddStudentUser =async() =>{


  const response = await axios.post(`/api/users/${studentId}`, user);
  if(response.data.userId){
    message.success("user saved successfuly",1);
    setIsUserAdd(false);
    navigate("/")

  }
  if(response.Error){
    alert("err")
  }
}


 const renderAddUser =() =>{
  return (
  
<>
      <Modal
        title= "Create account"
        visible={isUserAdd}
        okText="Save"
        onCancel={resetAddUser}
        onOk={() => {
           handleAddStudentUser();
           
         }}
      >
        <label style={{ fontWeight: 400, color: "blue", marginBottom: 10}}>
         
          User Name
        </label>

        <Input placeholder='Enter User Name'
          style={{ marginTop: 10,padding: 10}}
          value={user?.userName}
          allowClear
          onChange={(e) => {
            setUser((pre) => {
             return { ...pre, userName: e.target.value };
            });
          }}
        />
       
       <label style={{ fontWeight: 400, color: "blue", marginBottom: 10}}>
         
         Password
       </label>

       <Input placeholder='Enter User Name'
         style={{ marginTop: 10,padding: 10}}
         value={user?.password}
         allowClear
         onChange={(e) => {
           setUser((pre) => {
            return { ...pre, password: e.target.value };
           });
         }}
       />
       
       
   </Modal>

    </>

      
  )
}



return (
    <PageContainer>
    <Form style={form_div}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        autdoComplete="off"
    >


              
        <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please enter your first name' }]}
        >
            <Input  placeholder='Enter first name' value={student?.firstName}  onChange={(e) => {
                  setStudent((pre) => {
                   return { ...pre, firstName: e.target.value };
                  });
                }} />
        </Form.Item>

        <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please enter your Last name' }]}
        >
            <Input placeholder='Enter your last name'value={student?.lastName}  onChange={(e) => {
                  setStudent((pre) => {
                   return { ...pre, lastName: e.target.value };
                  });
                }} />
        </Form.Item>
        <Form.Item
            label="Student Code"
            name="studentCode"
            rules={[{ required: true, message: 'Please enter your student code' }]}
        >
            <Input placeholder='Enter your student code'value={student?.studentCode}  onChange={(e) => {
                  setStudent((pre) => {
                   return { ...pre, studentCode: e.target.value };
                  });
                }} />
        </Form.Item>
      
     
        <Form.Item 
        name='email' 
        label="Email" 
        
        rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}>
        <Input  placeholder='Enter your Email'value={student?.email}  onChange={(e) => {
                  setStudent((pre) => {
                   return { ...pre, email: e.target.value };
                  });
                }} />
      </Form.Item>
   
      <Form.Item 
        name='phone' 
        label="phone" 
        
        rules={[ {
              required: true,
              message: 'Please input your Phone!',
            },
          ]}>
        <Input  placeholder='Enter your phone'value={student?.phone}  onChange={(e) => {
                  setStudent((pre) => {
                   return { ...pre, phone: e.target.value };
                  });
                }} />
      </Form.Item>

      <Form.Item 
        name='educationLevel' 
        label="Education Level" 
        
        rules={[ {
              required: true,
              message: 'Please input your education level!',
            },
          ]}>
        <Input  placeholder='Enter your education level'value={student?.educationLevel}  onChange={(e) => {
                  setStudent((pre) => {
                   return { ...pre, educationLevel: e.target.value };
                  });
                }} />
      </Form.Item>
                
        <Form.Item wrapperCol={{ offset: 16, span: 10 }}>
            <Button type="primary" htmlType="submit" onClick={handleRegisterStudent}>
                Submit
            </Button>
        </Form.Item>


    </Form>
    {isUserAdd && renderAddUser()}
</PageContainer>
)

}
export default Signup;


