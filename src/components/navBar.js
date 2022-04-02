import React from 'react';
import {Menu ,Row,Col} from 'antd'
import { Link } from 'react-router-dom';
import './nav.css'
import {HomeOutlined,DownCircleOutlined , LoginOutlined,AntDesignOutlined  } from '@ant-design/icons'


const NavBar = () => {
  return(
    <div >
  <Row>
    <Col sm={24} md ={4} lg={4}>
    < h1 style={{color:"black",fontFamily:"cursive", fontWeight:600 ,borderBottom:"2px solid #111"}}>
       <Link to ="/">E-course</Link> 
     </h1>
     </Col>
     <Col sm ={24} md ={12} lg ={12}>
     <Menu  mode="horizontal" theme ="dark" className="menu">
            <Menu.Item key="/" className="menu-item" icon={<HomeOutlined style={ {color:"#fff",fontSize:20}}/>} >
            <Link to="/category" className="menu-link" >Course Categories</Link>
            </Menu.Item>
            <Menu.Item key="course" className="menu-item" icon ={<AntDesignOutlined  style={ {color:"#fff",fontSize:30}} />}>
            <Link to="/course"  className="menu-link" >Courses</Link>
            </Menu.Item>

          

  
</Menu>
</Col>
<Col sm ={24} md ={8} lg ={8}>
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

