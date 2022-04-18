import { courseConstants, requestConstants } from  "../constants/constantType"
import axios from 'axios'
const token = localStorage.getItem("token");
export const addRequest = (request) => async dispatch => {
    const {requestId} = request;

    try {
        const response = await axios.post(`/api/courses/${requestId}`, request);
        if (response.data) {
            dispatch({ type: courseConstants.ADD_COURSE, payload: response.data })
        }
    }
    catch (err) {
       
    }
   
}
export const listRequests = () => async dispatch => {
    try {
        
        const response =  await axios.get("/api/requests",{ headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        dispatch({ type: requestConstants.LIST_REQUESTS, payload: response.data })
    }
    catch (err) {

    }
    
}

export const deleteRequest = (request) => async dispatch => {
    try {
        const { requestId} = request;
       
        const reponse = await axios.delete(`/api/requests/${requestId}`);
        dispatch({type:requestConstants.DELETE_REQUEST,payload:requestId})
    }
    catch (err) {
        
    }
}


export const updateRequest = (request) => async dispatch => {
    const { requestId} = request;
    try {
        const response = await axios.put(`/api/requests/${requestId}`, request);
        dispatch({ type: requestConstants.UPDATE_REQUEST, payload: response.data })
    }
    catch (err) {
        
    }
   
  }
  