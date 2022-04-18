import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkTokenAsync } from '../../redux/users/actions/current.user.action'
import { AdminNavbar } from './admin.navbar'
import NavBarContainer from './navbar.container'
import { TeacherNavbar } from './teacher.navbar';
import { StudentNavbar } from './student.navbar'

/**
* @author
* @function 
**/

 const Navbar = (props) => {
    const navigate= useNavigate()
    const currentUser=useSelector(state=> state.users.currentUser)

    const dispatch=useDispatch()
    useEffect(()=>{
    let token=localStorage.getItem('token')
    if(!token){
      navigate('/')
    }
    else {
      dispatch(checkTokenAsync(token))
    }
   
     // eslint-disable-next-line react-hooks/exhaustive-deps
     },[])
     console.log(currentUser)
  return(
      <NavBarContainer>
    {  
    !currentUser? <></>:
      currentUser.role=== "Admin"?
      <AdminNavbar/>:
      currentUser.role === "Teacher"?
      <TeacherNavbar/>:
      currentUser.role === "Student"?
      <StudentNavbar/>:
      <></>
      }
      </NavBarContainer>
   )

 }

 export default Navbar