import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'



function LoginRoute({component:Component}){
    let {status}= useSelector(state=>state.User)
    console.log('state')
    
    return status? Component:<Navigate to='/login'></Navigate>
    
}
export default LoginRoute