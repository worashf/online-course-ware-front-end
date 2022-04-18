
import React from 'react'
import {Menu } from 'antd'
import { Link } from 'react-router-dom';

import {HomeOutlined, CaretDownOutlined , 
AntDesignOutlined,UserAddOutlined,
    } from '@ant-design/icons'

/**
* @author
* @function 
**/

export const AdminNavbar  = (props) => {
  return(
    <Menu  mode="horizontal" theme ="dark" className="menu">
    <Menu.Item key="/home" className="menu-item" icon={<HomeOutlined style={ {color:"#fff",fontSize:20}}/>} >
    <Link to="/category" className="menu-link" >Course Categories</Link>
    </Menu.Item>
    <Menu.Item key="course" className="menu-item" icon ={<AntDesignOutlined  style={ {color:"#fff",fontSize:20}} />}>
    <Link to="/course"  className="menu-link" >Courses</Link>
    </Menu.Item>
   
    <Menu.Item key="user" className="menu-item" icon ={<UserAddOutlined style={ {color:"#fff",fontSize:20}} />}>
    <Link to="/user"  className="menu-link" >Users</Link>
    </Menu.Item>
      
    <Menu.Item key="request" className="menu-item" icon ={<CaretDownOutlined  style={ {color:"#fff",fontSize:20}} />}>
    <Link to="/request"  className="menu-link" >Requests</Link>
    </Menu.Item>
    </Menu>
   )

 }