import axios from "axios"

export const USER_ACTION_TYPES={
    USER_LOGIN_REQUEST:'USER_LOGIN_REQUEST',
    USER_LOGIN_SUCCESS:'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL:'USER_LOGIN_FAIL',
    USER_LOGIN_ERROR:'USER_LOGIN_ERROR'
}

export const userLogin=(userinfo)=>dispatch=>{

    dispatch({
        type:USER_ACTION_TYPES.USER_LOGIN_REQUEST
        
    })

    axios.post(process.env.REACT_APP_BASE_API_URL+'api/v1/user/login',userinfo)
    .then((response)=>{
        console.log(response.data.success==='true')
        if (response.data.success==='true'){
              console.log(response.data.result)
            dispatch({
                type:USER_ACTION_TYPES.USER_LOGIN_SUCCESS,
                payload:response.data.result,
             
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