import React from 'react';
import { Form, Input,Button } from 'antd';
import PageContainer from '../components/pageContaner';
const form_div = {
    "background": "#6e6859 ",
    "padding": "20px 20px",
    "widht": "50%",
    "height":"90vh"
}
const Login = () => {
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
                    <Input  placeholder='Enter user name' />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="Password"
                    rules={[{ required: true, message: 'Please input your password' }]}
                >
                    <Input.Password  placeholder='Enter your password' />
                </Form.Item>



                <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>


            </Form>
        </PageContainer>
    )

}
export default Login;