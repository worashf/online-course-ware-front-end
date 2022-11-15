import React from 'react';
import {Menu ,Row,Col} from 'antd'
import { Link } from 'react-router-dom';

import {HomeOutlined,DownCircleOutlined , 
  LoginOutlined,AntDesignOutlined,UserAddOutlined,
  UserOutlined ,UpCircleOutlined   } from '@ant-design/icons'


const NavBar = () => {
  return(
    <div >
  <Row>
    <Col sm={24} md ={4} lg={4}>
    < h1 style={{color:"black",fontFamily:"cursive", fontWeight:600 ,borderBottom:"2px solid #111"}}>
       <Link to ="/">E-course</Link> 
     </h1>
     </Col>
     <Col sm ={24} md ={16} lg ={16}>
     <Menu  mode="horizontal" theme ="dark" className="menu">
            <Menu.Item key="/" className="menu-item" icon={<HomeOutlined style={ {color:"#fff",fontSize:20}}/>} >
            <Link to="/category" className="menu-link" >Course Categories</Link>
            </Menu.Item>
            <Menu.Item key="course" className="menu-item" icon ={<AntDesignOutlined  style={ {color:"#fff",fontSize:20}} />}>
            <Link to="/course"  className="menu-link" >Courses</Link>
            </Menu.Item>
           
            <Menu.Item key="user" className="menu-item" icon ={<UserAddOutlined style={ {color:"#fff",fontSize:20}} />}>
            <Link to="/user"  className="menu-link" >Users</Link>
            </Menu.Item>
            <Menu.Item key="user" className="menu-item" icon ={<UpCircleOutlined  style={ {color:"#fff",fontSize:20}} />}>
            <Link to="/user"  className="menu-link" >Your Course</Link>
            </Menu.Item>
            <Menu.Item key="question" className="menu-item" icon ={<UserAddOutlined style={ {color:"#fff",fontSize:20}} />}>
            <Link to="/question"  className="menu-link" >Question</Link>
            </Menu.Item>
            <Menu.Item key="user" className="menu-item" icon ={<UserAddOutlined style={ {color:"#fff",fontSize:20}} />}>
            <Link to="/user"  className="menu-link" >Assesment</Link>
            </Menu.Item>
  
</Menu>
</Col>
<Col sm ={24} md ={4} lg ={4}>
<Menu  mode="horizontal" theme ="dark" className="menu">
            <Menu.Item key="login" className="menu-item" icon={<LoginOutlined  style={ {color:"#fff",fontSize:20}}/>} >
            <Link to="/login" className="menu-link" >Login</Link>
            </Menu.Item>
            <Menu.Item key="signup" className="menu-item" icon ={<DownCircleOutlined  style={ {color:"#fff",fontSize:20}} />}>
            <Link to="/signup"  className="menu-link" >Sign Up</Link>
            </Menu.Item>
            
          

  
</Menu>

</Col>
  </Row>
     





</div>
  )
}


export default  NavBar;

