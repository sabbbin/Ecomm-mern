import { PRODUCT_ACTION_TYPE } from "../actions/productActions";


export const productsReducers=(state={products:{}}, action)=>{
    switch(action.type){
        case PRODUCT_ACTION_TYPE.PRODUCT_REQUEST:
             return {
               
                 loading:true,
                 Products:[]
             }
        case PRODUCT_ACTION_TYPE.PRODUCT_SUCCESS:
        return {
         
            loading:false,
            Products:action.payload
        }
        case PRODUCT_ACTION_TYPE.PRODUCT_FAIL:
            return {
           
                loading:false,
                error:action.payload
            }
        case PRODUCT_ACTION_TYPE.CLEAR_ERRORS:
                return {
                   
                    error:null
                }
        
        default:
            return state;
    }
}

