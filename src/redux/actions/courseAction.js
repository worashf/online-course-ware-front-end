import { courseConstants } from  "../constants/constantType"
import axios from 'axios'
const token = localStorage.getItem("token");
export const addCourse = (course) => async dispatch => {
    const {categoryId} = course;
    console.log(course,categoryId)
    try {
        const response = await axios.post(`/api/courses/${categoryId}`, course, { headers: {"Authorization" : `Bearer ${token}`} });
        if (response.data) {
            dispatch({ type: courseConstants.ADD_COURSE, payload: response.data })
        }
    }
    catch (err) {
       
    }
   
}
export const listCourses = () => async dispatch => {
    try {
        const response =  await axios.get("/api/courses",{ headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        dispatch({ type: courseConstants.LIST_COURSES, payload: response.data })
    }
    catch (err) {

    }
    
}

export const deleteCourse = (course) => async dispatch => {
    try {
        const { courseId} = course;
       
        const reponse = await axios.delete(`/api/courses/${courseId}`);
        dispatch({type:courseConstants.DELETE_COURSE,payload:courseId})
    }
    catch (err) {
        
    }
}


export const updateCourse = (course) => async dispatch => {
    const {courseId} = course;
    try {
        const response = await axios.put(`http://localhost:8080/api/courses/${courseId}`, course);
        dispatch({ type: courseConstants.UPDATE_COURSE, payload: response.data })
    }
    catch (err) {
        
    }
   
  }
  