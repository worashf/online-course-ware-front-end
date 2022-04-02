import { courseConstants} from '../constants/constantType'

const initialState =[ ]


export const courseReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case courseConstants.ADD_COURSE:
            return  [...state,payload];
        case courseConstants.LIST_COURSES:
            return payload;
                
        case courseConstants.DELETE_COURSE:
            const currentCourses = state.filter((course) => course.courseId === payload ? null : course);
            return currentCourses;
        case courseConstants.UPDATE_COURSE:
            const courses = state.map((course)=>{
                if(course.courseId === payload.courseId){
                    return payload;
                }
                else{
                    return course;
                }
                   
            });
            return courses;
       

        default:
            return state
 }

    
}

