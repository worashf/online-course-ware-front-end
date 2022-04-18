import React,{useEffect} from 'react'
import {Menu ,Row,Col} from 'antd'

import { Link } from 'react-router-dom';

import {
  AntDesignOutlined,UserAddOutlined,
  UpCircleOutlined   } from '@ant-design/icons'



export const StudentNavbar = () => {

  
  
  return(
    <Menu  mode="horizontal" theme ="dark" className="menu">
  <Menu.Item key="course" className="menu-item" icon ={<AntDesignOutlined  style={ {color:"#fff",fontSize:20}} />}>
    <Link to="/teacher-course"  className="menu-link" >Courses</Link>
    </Menu.Item>
    <Menu.Item key="your-course" className="menu-item" icon ={<UpCircleOutlined  style={ {color:"#fff",fontSize:20}} />}>
    <Link to="/your-course"  className="menu-link" >Your Course</Link>
    </Menu.Item>
    <Menu.Item key="user" className="menu-item" icon ={<UserAddOutlined style={ {color:"#fff",fontSize:20}} />}>
    <Link to="/user"  className="menu-link" >Question</Link>
    </Menu.Item>
    <Menu.Item key="user1" className="menu-item" icon ={<UserAddOutlined style={ {color:"#fff",fontSize:20}} />}>
    <Link to="/user1"  className="menu-link" >Assesment</Link>
    </Menu.Item>      
   </Menu>
   )

 }
