import React,{useEffect} from 'react'
import {Menu ,Row,Col} from 'antd'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listCategories } from '../../redux/actions/categoryActions';
import {HomeOutlined,DownCircleOutlined , 
  LoginOutlined,AntDesignOutlined,UserAddOutlined,
  UserOutlined ,UpCircleOutlined   } from '@ant-design/icons'

/**
* @author
* @function 
**/

export const TeacherNavbar = (props) => {

  
  
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
    <Menu.Item key="admin" className="menu-item" icon ={<UserAddOutlined style={ {color:"#fff",fontSize:20}} />}>
    <Link to="/admin"  className="menu-link" >Assesment</Link>
    </Menu.Item>      
   </Menu>
   )

 }
