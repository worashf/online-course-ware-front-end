import React from 'react';
import { Layout } from 'antd';
import NavBar from './navBar'
import FooterComponent  from  './footer'


const {Header,Content,Footer} =Layout;
const PageContainer = ({children}) => {
  return(
<>
<NavBar/>


    {children}
  
    <FooterComponent/>
</>


  
  )
}
  

export default  PageContainer;

