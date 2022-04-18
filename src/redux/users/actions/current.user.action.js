
import axios from "axios";

import { currentUserActionType } from "./users.action";

export const checkTokenSuccess=(payload)=>({
   type: currentUserActionType.CHECK_TOKEN_SUCESS,
   payload 
})



export const checkTokenAsync=(token)=>async (dispatch)=>{
  

 try{

  const res= await axios.post(`/api/checktoken/${token}` )
    
  let {roles,userName} =res.data
  

  dispatch({ type: currentUserActionType.CHECK_TOKEN_SUCESS, payload: {userName,role:roles[0]}})

 }

    
    catch(err) {
      console.log(err.message)
    }
}