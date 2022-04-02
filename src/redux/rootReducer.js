import { combineReducers } from "redux";
import { categoryReducer } from "./reducer/CategoryReducer";
import { courseReducer } from "./reducer/courseReducer";

const rootReducer = combineReducers({
    categories: categoryReducer,
    courses:courseReducer,
  
    
})

export default rootReducer;