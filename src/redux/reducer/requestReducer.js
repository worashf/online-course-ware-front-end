import { requestConstants} from '../constants/constantType'

const initialState =[ ]


export const requestReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case  requestConstants.ADD_REQUEST:
            return  [...state,payload];
        case requestConstants.LIST_REQUESTS:
            return payload;
                
        case requestConstants.DELETE_REQUEST:
            const currentRequests = state.filter((request) => request.requestId === payload ? null : request);
            return currentRequests;
        case requestConstants.UPDATE_REQUEST:
            const requests = state.map((request)=>{
                if(request.requestId === payload.requestId){
                    return payload;
                }
                else{
                    return request;
                }
                   
            });
            return requests;
       

        default:
            return state
        }
 }
