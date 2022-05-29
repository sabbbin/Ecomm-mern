
import { http } from "../http.services"

export const USER_ACTION_TYPES={
    USER_LOGIN_REQUEST:'USER_LOGIN_REQUEST',
    USER_LOGIN_SUCCESS:'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL:'USER_LOGIN_FAIL',
    USER_LOGIN_ERROR:'USER_LOGIN_ERROR',
    USER_LOAD:'USER_LOAD',
    USER_LOGOUT:'USER_LOGOUT',
    USER_LOGOUT_FAIL:'USER_LOGOUT_FAIL',
    USER_UPDATE_SUCCESS:'USER_UPDATE_SUCCESS',
    USER_UPDATE_FAIL:'USER_UPDATE_FAIL'
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

export const updateUserProfile=(formdata)=>dispatch=>{
    

    http.updateItem('api/v1/user/me/update', formdata, false,true)
    .then((result)=>{
   console.log('resutl', result)
         
        dispatch({
            type:USER_ACTION_TYPES.USER_UPDATE_SUCCESS,
            payload:result.data.msg,
         
        })

       

    })
    .catch((err)=>{
        dispatch({
            type:USER_ACTION_TYPES.USER_UPDATE_FAIL,
            payload:err.message,
            
             
        })

    })
    
        
        

}

// export const updateUserProfile=(dataform)=>dispatch=>{
//     console.log('updateuserProfile')
//     http.updateItem('api/v1/user/me/update', dataform,false, true)
//     .then((result)=>{
//             dispatch({
//                 type:USER_ACTION_TYPES.USER_UPDATE_SUCCESS,
//                 isUpdated:true,
//                 msg:'user_update_successfully'
//             })
//     })
//     .catch((err)=>{
//         dispatch({
//             type:USER_ACTION_TYPES.USER_UPDATE_FAIL,
//             msg:'user update fail'
//         })

//     })
//     dispatch({
        
//             type:USER_ACTION_TYPES.USER_UPDATE_FAIL,
//             msg:'user update fail',
//             isUpdated:false
      
//     })

// }

export const userLogin=(userinfo)=>dispatch=>{


    dispatch({
        type:USER_ACTION_TYPES.USER_LOGIN_REQUEST

        
    })

    http.postItem ('api/v1/user/login',userinfo)
    .then((response)=>{
        console.log('response',response)
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



       console.log('helo i amd at user loader')

    http.getItem('api/v1/user/me')
    .then((result)=>{
        console.log('dlsfj', result)
        if (result.data.result!=null){

            dispatch({
                type:USER_ACTION_TYPES.USER_LOAD,
                payload:result.data.result,
                status:true
            })

        }else{
            dispatch({
                type:USER_ACTION_TYPES.USER_LOGIN_FAIL,
                msg:'error in getting request'
            })
        }
    })
    .catch((err)=>{
       dispatch({
           type:USER_ACTION_TYPES.USER_LOGIN_FAIL,
           msg:'error in getting request'
       })
    })
}