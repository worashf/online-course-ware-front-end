import { topicConstants } from  "../constants/constantType"
import axios from 'axios'
import httpCommon from "../httpCommon";
const token = localStorage.getItem("token");
export const addTopic = (courseId,topic) => async dispatch => {
  console.log(courseId)
    try {
        const response = await axios.post(`http://localhost:8080/api/topics/${courseId}`, topic);
        if (response.data) {
            dispatch({ type: topicConstants.ADD_TOPIC, payload: response.data })
        }
    }
    catch (err) {
       
    }
   
}
export const listTopics = () => async dispatch => {
    try {
        const response =  await axios.get("/api/topics",{ headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        dispatch({ type: topicConstants.LIST_TOPICS, payload: response.data })
    }
    catch (err) {

    }
    
}

export const deleteTopics = (topic) => async dispatch => {
    try {
        const { topicId} = topic;
       
        const reponse = await axios.delete(`/api/topics/${topicId}`);
        dispatch({type:topicConstants.DELETE_TOPIC,payload:topicId})
    }
    catch (err) {
        
    }
}


export const updateTopic = (topic) => async dispatch => {
    const {topicId} = topic;
    try {
        const response = await axios.put(`http://localhost:8080/api/topics/${topicId}`, topic);
        dispatch({ type: topicConstants.UPDATE_TOPIC, payload: response.data })
    }
    catch (err) {
        
    }
   
  }
  