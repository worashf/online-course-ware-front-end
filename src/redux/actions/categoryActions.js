import { categoryConstants } from  "../constants/constantType"
import axios from 'axios'
 const token = localStorage.getItem("token");
export const addCategory = (category) => async dispatch => {
    try {
        const response = await axios.post("/api/categories", category,{ headers: {"Authorization" : `Bearer ${token}`} });
        if (response.data) {
            dispatch({ type: categoryConstants.ADD_CATEGOTY, payload: response.data })
        }
    }
    catch (err) {
       
    }
   
}
export const listCategories = () => async dispatch => {
    try {
        const response =  await axios.get("/api/categories",{ headers: {"Authorization" : `Bearer ${token}`} })
        console.log(response)
        dispatch({ type: categoryConstants.LIST_CATEGORIES, payload: response.data })
    }
    catch (err) {

    }
    
}

export const deleteCategory = (category) => async dispatch => {
    try {
        const { categoryId } = category;
        console.log(categoryId)
        const reponse = await axios.delete(`/api/categories/${categoryId}`);
        dispatch({type:categoryConstants.DELETE_CATEGORY,payload:categoryId})
    }
    catch (err) {
        
    }
}


export const updateCategory = (category) => async dispatch => {
    const { categoryId } = category;
    try {
        const response = await axios.put(`/api/categories/${categoryId}`, category);
        dispatch({ type: categoryConstants.UPDATE_CATEGORY, payload: response.data })
    }
    catch (err) {
        
    }
   
  }
  