import { userConstants } from  "../constants/constantType"
import axios from 'axios'

const token = localStorage.getItem("token");
export const listUsers = () => async dispatch => {
    try {
        const response =  await axios.get("/api/users",{ headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        dispatch({ type: userConstants.LIST_USERS, payload: response.data })
    }
    catch (err) {

    }
    
}

export const deleteUser = (user) => async dispatch => {
    try {
        const { userId } = user;
        
        const reponse = await axios.delete(`/api/users/${userId}`);
        dispatch({type:userConstants.DELETE_USER,payload:userId})
    }
    catch (err) {
        
    }
}


export const updateUser= (user) => async dispatch => {
    const { userId } = user;
    try {
        const response = await axios.put(`/api/users/${userId}`, user);
        dispatch({ type: userConstants.UPDATE_USER, payload: response.data })
    }
    catch (err) {
        
    }
   
  }
  