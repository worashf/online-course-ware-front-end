import { categoryConstants} from '../constants/constantType'

const initialState =[ ]


export const categoryReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case categoryConstants.ADD_CATEGOTY:
            return  [...state,payload];
        case categoryConstants.LIST_CATEGORIES:
            return payload;
                
        case categoryConstants.DELETE_CATEGORY:
            const currentCategories = state.filter((category) => category.categoryId === payload ? null : category);
            return currentCategories;
        case categoryConstants.UPDATE_CATEGORY:
            const Categories = state.map((category)=>{
                if(category.categoryId === payload.categoryId){
                    return payload;
                }
                else{
                    return category
                }
                   
            });
            return Categories
       

        default:
            return state
 }

    
}

