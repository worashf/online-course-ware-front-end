import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkTokenAsync } from '../../redux/users/actions/current.user.action'
import { AdminNavbar } from './admin.navbar'
import NavBarContainer from './navbar.container'
import { TeacherNavbar } from './teacher.navbar'

/**
* @author
* @function 
**/

 const Navbar = (props) => {
    const navigate= useNavigate()
    const [state,setState]=useState({
      laoding:true
    })
    const currentUser=useSelector(state=> state.users.currentUser)
    const dispatch=useDispatch()
    useEffect(()=>{
    let token=localStorage.getItem('token')
    if(!token){
      navigate('/login')
    }
    else {
      dispatch(checkTokenAsync(token))
      if(currentUser){
        setState({laoding:false})
      }
      else {
        navigate('/login')
      }
    }
   
     },[currentUser,dispatch])
  return(
      <NavBarContainer>
    {  
    state.laoding? <></>:
      currentUser.role=== "Admin"?
      <AdminNavbar/>:
      currentUser.role === "Teacher"?
      <TeacherNavbar/>:
      <></>
      }
      </NavBarContainer>
   )

 }

 export default Navbar