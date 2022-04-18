import { topicConstants} from '../constants/constantType'

const initialState =[ ]


export const topicReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case  topicConstants.ADD_TOPIC:
            return  [...state,payload];
        case topicConstants.LIST_TOPICS:
            return payload;
                
        case topicConstants.DELETE_TOPIC:
            const currentTopics = state.filter((topic) => topic.topicId === payload ? null : topic);
            return currentTopics;
        case topicConstants.UPDATE_TOPIC:
            const topics = state.map((topic)=>{
                if(topic.topicId === payload.topicId){
                    return payload;
                }
                else{
                    return topic;
                }
                   
            });
            return topics;
       

        default:
            return state
        }
 }
