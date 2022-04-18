import { combineReducers } from "redux";
import { categoryReducer } from "./reducer/CategoryReducer";
import { courseReducer } from "./reducer/courseReducer";
import { roleReducer } from "./reducer/roleReducer";
import { requestReducer } from "./reducer/requestReducer";
import { userReducer } from "./reducer/userReducer";
import { topicReducer } from "./reducer/TopicReducer";


const rootReducer = combineReducers({
    categories: categoryReducer,
    courses:courseReducer,
    roles:roleReducer,
    users:userReducer,
    requests:requestReducer,
    topics:topicReducer,

  
    
})

export default rootReducer;