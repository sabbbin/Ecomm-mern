import { PRODUCT_ACTION_TYPE } from "../actions/productActions";


export const productsReducers=(state, action)=>{
    console.log('actionproduct',action)
    switch(action.type){
        case PRODUCT_ACTION_TYPE.PRODUCT_REQUEST:
             return {
                ...state,
                 isLoading:true,
                 products:[]
             }
        case PRODUCT_ACTION_TYPE.PRODUCT_SUCCESS:
        return {
             ...state,
            isLoading:false,
            products:action.payload,
            msg:'successful',
            resPerPage:action.resPerPage,
            productCount:action.productCount
        }
        case PRODUCT_ACTION_TYPE.PRODUCT_DETAILS:
        return {
             ...state,
            isLoading:false,
            product:action.payload,
            msg:'successful'
        }
        case PRODUCT_ACTION_TYPE.PRODUCT_SEARCH:
        return {
             ...state,
            isLoading:false,
            products:action.payload,
            msg:'successful',
            resPerPage:action.resPerPage,
            productCount:action.productCount,
            search:action.search
        }

        
        case PRODUCT_ACTION_TYPE.PRODUCT_FAIL:
            return {
                ...state,
                isLoading:false,
                error:action.payload
            }
        case PRODUCT_ACTION_TYPE.CLEAR_ERRORS:
                return {
                   ...state,
                    error:null
                }
        
        default:
            return {...state};
    }
}
