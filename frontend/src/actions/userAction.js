
import { http } from "../http.services"

export const USER_ACTION_TYPES={
    USER_LOGIN_REQUEST:'USER_LOGIN_REQUEST',
    USER_LOGIN_SUCCESS:'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL:'USER_LOGIN_FAIL',
    USER_LOGIN_ERROR:'USER_LOGIN_ERROR',
    USER_LOAD:'USER_LOAD',
    USER_LOGOUT:'USER_LOGOUT',
    USER_LOGOUT_FAIL:'USER_LOGOUT_FAIL'
}



export const userLogout=()=>dispatch=>{

        http.getItem('api/v1/user/logout')
        .then((result)=>{
            dispatch({
                type:USER_ACTION_TYPES.USER_LOGOUT,
                payload:null
                 
            })
        })
        .catch((err)=>{
            dispatch({
                type:USER_ACTION_TYPES.USER_LOGOUT_FAIL,
                payload:err.message
                 
            })

        })
}



export const userLogin=(userinfo)=>dispatch=>{


    dispatch({
        type:USER_ACTION_TYPES.USER_LOGIN_REQUEST

        
    })

    http.postItem (process.env.REACT_APP_BASE_API_URL+'api/v1/user/login',userinfo)
    .then((response)=>{
        console.log(response.data.success==='true')
        if (response.data.success==='true'){
              console.log(response.data.result)
            dispatch({
                type:USER_ACTION_TYPES.USER_LOGIN_SUCCESS,
                payload:response.data.result,
                status:true
             
            })
        }else{
            console.log('b')
            dispatch({
                type:USER_ACTION_TYPES.USER_LOGIN_FAIL,
              
               
            })
        }
    })
    .catch((error)=>{
        dispatch({
            type:USER_ACTION_TYPES.USER_LOGIN_ERROR,
            msg:'error in login'
        })
    })
}

export const loadUser=()=>dispatch=>{
    http.getItem('api/v1/user/me')
    .then((result)=>{
        console.log('dlsfj', result)
        dispatch({
            type:USER_ACTION_TYPES.USER_LOAD,
            payload:result.data.data
        })
    })
    .catch((err)=>{
       dispatch({
           type:USER_ACTION_TYPES.USER_LOGIN_FAIL,
           msg:'error in getting request'
       })
    })
}