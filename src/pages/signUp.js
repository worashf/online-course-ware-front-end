
import React from 'react';
import { Form, Input,Button } from 'antd';
import PageContainer from '../components/pageContaner';
const form_div = {
    "background": "#6e6859 ",
    "padding": "20px 20px",
    "widht": "50%",
    "height":"90vh"
}
const Signup =() =>{
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
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: 'Please enter your first name' }]}
        >
            <Input  placeholder='Enter first name' />
        </Form.Item>

        <Form.Item
            label="Last Name"
            name="LastName"
            rules={[{ required: true, message: 'Please enter your Last name' }]}
        >
            <Input placeholder='Enter your last name' />
        </Form.Item>

        <Form.Item
            label="User Name"
            name="userName"
            rules={[{ required: true, message: 'Please enter your user name' }]}
        >
            <Input placeholder='Enter your user name' />
        </Form.Item>
     
        <Form.Item 
        name='email' 
        label="Email"
        rules={[{ type: 'email' ,required:true, message: 'Please Enter your Email'}]}>
        <Input  placeholder='Enter your Email'/>
      </Form.Item>
      <Form.Item
                    label="Password"
                    name="Password"
                    rules={[{ required: true, message: 'Please input your password' }]}
                >
                    <Input.Password  placeholder='Enter your password' />
                </Form.Item>
                <Form.Item
                    label="Confirm Password"
                    name="Password"
                    rules={[{ required: true, message: 'Please input your  password' }]}
                >
                    <Input.Password  placeholder='Enter your password' />
                </Form.Item>
        <Form.Item wrapperCol={{ offset: 16, span: 10 }}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form.Item>


    </Form>
</PageContainer>
)

}
export default Signup;


