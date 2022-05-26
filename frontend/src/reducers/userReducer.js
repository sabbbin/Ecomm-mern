import { USER_ACTION_TYPES } from "../actions/userAction";


export const userReducer=(state,action)=>{
  console.log('action', action)
    switch(action.type){
        case USER_ACTION_TYPES.USER_LOGIN_REQUEST:
            return {
                ...state,
                loading:true,
                user:{}
            }
        case USER_ACTION_TYPES.USER_LOGIN_SUCCESS:
            return {
                ...state,
                isloading:false,
                user:action.payload,
                msg:'successful login'

                
            }
        case USER_ACTION_TYPES.USER_LOGIN_FAIL:
            return {
                ...state,
                isloading:false,
                msg:'Invalid username or password'
            }
        default:
            return {
                ...state
            }
    }
}


