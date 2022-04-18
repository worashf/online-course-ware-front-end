import React from 'react';

const FooterComponent = () => {
    return(
        <div style={{background:"black",position: "fixed",width:"100%", height:60,
        left: 0,
        bottom: 0,
       color :"#fff",
      
    
       }}>
           <div style={ { marginLeft:50,marginTop:20,display:"flex"}}>
           <h2 style={{color:"#0c2ff2"}}>  <strong>E-courseware</strong> </h2>
           <h2 style={{color:"#fff",marginLeft:20}} > <strong>designed by </strong> <span style={{color:"blue"}}>Deva </span></h2>
           <p style={{marginLeft:200
           }}>© 2022</p>
           </div>
    
    </div> 
    )
}
  

export default FooterComponent ;

