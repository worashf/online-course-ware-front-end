import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input,Button,Select } from 'antd';
import { useSelector ,useDispatch} from 'react-redux';
import PageContainer from '../components/pageContaner';
import { listRoles } from '../redux/actions/roleAction';
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
const token = localStorage.getItem("token")
const AdminSignup =() =>{

 const [user,setUser] = useState(null)
const roles = useSelector(state =>state.roles)
const dispatch = useDispatch();

 const navigate = useNavigate();

 useEffect(()=>{
     dispatch(listRoles())
 },[])

 const handleRegisterUser = async() =>{
  const {roleId} =user;
    alert(roleId)
    const response = await axios.post(`http://localhost:8080/api/users/save/${roleId}`, user, {headers: {"Authorization" : `Bearer ${token}`}});
    console.log(response.data)
    if(response.data){
        navigate("/")
    }
    if(response.Error){
        alert("err")
    }
    
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
            label="User Type"
            name="usertype"
            rules={[{ required: true, message: 'Please select User type' }]}
        >
            
            <Select 
               onChange={value => {
                  setUser(pre =>{
                    console.log(value)
                    return { ...pre, roleId: value };
                    
                  })
              }}
              name="user type"
              placeholder="Please select user type"
                    >
                   { roles&& 
                       Array.isArray(roles) &&
                    roles.map(role=>{
                 
                          return <Option style ={{ marginBottom: 10,}} value ={role.roleId}>{role.roleName}</Option>
                       })}
                       </Select>
            </Form.Item>
              
        <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please enter your first name' }]}
        >
            <Input  placeholder='Enter first name' value={user?.firstName}  onChange={(e) => {
                  setUser((pre) => {
                   return { ...pre, firstName: e.target.value };
                  });
                }} />
        </Form.Item>

        <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: 'Please enter your Last name' }]}
        >
            <Input placeholder='Enter your last name'value={user?.lastName}  onChange={(e) => {
                  setUser((pre) => {
                   return { ...pre, lastName: e.target.value };
                  });
                }} />
        </Form.Item>

        <Form.Item
            label="User Name"
            name="userName"
            rules={[{ required: true, message: 'Please enter your user name' }]}
        >
            <Input placeholder='Enter your user name' value={user?.userName}  onChange={(e) => {
                  setUser((pre) => {
                   return { ...pre, userName: e.target.value };
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
        <Input  placeholder='Enter your Email'value={user?.email}  onChange={(e) => {
                  setUser((pre) => {
                   return { ...pre, email: e.target.value };
                  });
                }} />
      </Form.Item>
      <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password' }]}
                   hasFeedback>
                    <Input.Password  placeholder='Enter your password' value={user?.password}  onChange={(e) => {
                  setUser((pre) => {
                   return { ...pre, password: e.target.value };
                  });
                }} />
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name="confirm"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                          required: true,
                          message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
              
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                          },
                        }),
                      ]}
                    >
                    <Input.Password  placeholder='Enter your password' value={user?.confirmPassword}  onChange={(e) => {
                  setUser((pre) => {
                   return { ...pre, confirmPassword: e.target.value };
                  });
                }} />
                </Form.Item>
        <Form.Item wrapperCol={{ offset: 16, span: 10 }}>
            <Button type="primary" htmlType="submit" onClick={handleRegisterUser}>
                Submit
            </Button>
        </Form.Item>


    </Form>
</PageContainer>
)

}
export default AdminSignup;