import React, { useState,useEffect } from 'react';
import { Form, Input,Button } from 'antd';
import axios from 'axios';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listCategories } from '../redux/actions/categoryActions';
import PageContainer from '../components/pageContaner';
const form_div = {
    "background": "#6e6859 ",
    "padding": "20px 20px",
    "widht": "50%",
    "height":"90vh"
}
const Login = () => {
    const [data,setData] = useState(null);
    const navigate = useNavigate()
  

 const handleLoginSubmit =async(e) =>{
    e.preventDefault(); 
    const params = new URLSearchParams();

    const {userName,password} = data;
   console.log(data)
   params.append("userName",userName);
   params.append("password",password);

      const response = await axios.post("http://localhost:8080/api/login",params, { headers: {
        
      'Content-Type': 'application/x-www-form-urlencoded',
      }});

      localStorage.setItem("token",response.data.access_token)
     
      navigate("/home")

 }


    return (
        <PageContainer>
            <Form style={form_div} 
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
                initialValues={{ remember: true }}
                autoComplete="off"
            >

                <Form.Item
                    label="User name"
                    name="User name"
                    rules={[{ required: true, message: 'Please input your user name' }]}
                >
                    <Input  placeholder='Enter user name'  value={data?.userName}  
                    onChange={(e) => {
                        setData((pre) => {
                         return { ...pre, userName: e.target.value };
                        });
                      }} />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="Password"
                    rules={[{ required: true, message: 'Please input your password' }]}
                >
                    <Input.Password  placeholder='Enter your password' value={data?.password}
                 onChange={(e) => {
                    setData((pre) => {
                     return { ...pre, password: e.target.value };
                    });
                  }} />
                </Form.Item>



                <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
                    <Button type="primary" htmlType="submit" onClick={handleLoginSubmit}>
                        Submit
                    </Button>
                </Form.Item>


            </Form>
        </PageContainer>
    )

}
export default Login;