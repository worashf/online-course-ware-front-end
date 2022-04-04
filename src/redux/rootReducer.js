import { combineReducers } from "redux";
import { categoryReducer } from "./reducer/CategoryReducer";
import { courseReducer } from "./reducer/courseReducer";
import { roleReducer } from "./reducer/roleReducer";

import { userReducer } from "./reducer/userReducer";


const rootReducer = combineReducers({
    categories: categoryReducer,
    courses:courseReducer,
    roles:roleReducer,
    users:userReducer,

  
    
})

export default rootReducer;