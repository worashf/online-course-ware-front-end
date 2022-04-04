import React from 'react';
import { Layout } from 'antd';
import Navbar from '../components/navbar/navbar'
import FooterComponent  from  './footer'


const {Header,Content,Footer} =Layout;
const PageContainer = ({children}) => {
  return(
<>
<Navbar />


    {children}
  
    <FooterComponent/>
</>


  
  )
}
  

export default  PageContainer;

