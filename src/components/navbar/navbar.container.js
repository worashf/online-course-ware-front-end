import React, { useEffect } from 'react'
import {Menu ,Row,Col} from 'antd'
import { Link } from 'react-router-dom';

import {HomeOutlined,DownCircleOutlined , 
  LoginOutlined,AntDesignOutlined,UserAddOutlined,
  UserOutlined ,UpCircleOutlined   } from '@ant-design/icons'

/**
* @author
* @function 
**/

 const NavBarContainer  = ({children}) => {
  
  return(
    <Row>
      <Col sm={24} md ={4} lg={4}>
      < h1 style={{color:"black",fontFamily:"cursive", fontWeight:600 ,borderBottom:"2px solid #111"}}>
         <Link to ="/home">E-course</Link> 
       </h1>
       </Col>
       <Col sm ={24} md ={16} lg ={16}>
           {children}
    
  </Col>
  <Col sm ={24} md ={4} lg ={4}>
  <Menu  mode="horizontal" theme ="dark" className="menu">
              <Menu.Item key="login" className="menu-item" icon={<LoginOutlined  style={ {color:"#fff",fontSize:20}}/>} >
              <Link to="/" className="menu-link" >Login</Link>
              </Menu.Item>
              <Menu.Item key="signup" className="menu-item" icon ={<DownCircleOutlined  style={ {color:"#fff",fontSize:20}} />}>
              <Link to="/signup"  className="menu-link" >Sign Up</Link>
              </Menu.Item>
              
            
  
    
  </Menu>
  
  </Col>
    </Row>
       
   )

 }

 export default NavBarContainer