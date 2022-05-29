import { USER_ACTION_TYPES } from "../actions/userAction";





export const userReducer=(state={User:{user:{}}},action)=>{
    switch(action.type){
        case USER_ACTION_TYPES.USER_LOGIN_REQUEST:
            return {
                ...state,
                isLoading:true,
                user:{}
            }
            case USER_ACTION_TYPES.USER_LOGIN_SUCCESS:
            console.log('action', action)
            return {
                ...state,
                isLoading:false,
                user:action.payload,
                msg:'successful login',
                status:action.status

                
            }
            case USER_ACTION_TYPES.USER_LOGOUT:
                return {
                    ...state,
                    user:null,
                    status:false,
                    msg:'successfuly logout'
                }

            case USER_ACTION_TYPES.USER_LOGOUT_FAIL:
                return {
                    ...state,
                    msg:action.payload
                }

            case USER_ACTION_TYPES.USER_LOAD:
                
                return {
                    ...state,
                    isLoading:false,
                    user:action.payload,
                    status:action.status,
                    msg:'successful load user'
    
                    
                }
        case USER_ACTION_TYPES.USER_LOGIN_FAIL:
            return {
                ...state,
                isloading:false,
                msg:'Invalid username or password'
            }

        case USER_ACTION_TYPES.USER_UPDATE_SUCCESS:
                return {
                    ...state,
                    msg:action.payload,
                    isUpdate:true,
                } 
        case USER_ACTION_TYPES.USER_UPDATE_FAIL:
            return{
                ...state,
                msg:action.payload ,
                isUpdate:false
            }   
        default:
            return {
                ...state
            }
    }
}


