import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loadUser, userLogin } from '../actions/userAction';





const Login = () => {

let navigate = useNavigate()
const dispatch =useDispatch()
let [email, setEmail]= useState('');
let [password, setPassword]= useState('')

let {user, status} = useSelector(state=>state.User)


useEffect(()=>{

  if (status){
    navigate('/')
  }

},[status])


const handleSubmit=(e)=>{
    e.preventDefault()
    
    dispatch(userLogin({email,password}))


}

  return (
    <div className="container container-fluid">
    <div className="row wrapper"> 
    <div className="col-10 col-lg-5">
    <form className="shadow-lg" onSubmit={handleSubmit}>
        <h1 className="mb-3">Login</h1>
        <div className="form-group">
          <label for="email_field">Email</label>
          <input
            type="email"
            id="email_field"
            className='form-control'
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label for="password_field">Password</label>
          <input
            type="password"
            id="password_field"
            className="form-control"
            onChange={(e=>setPassword(e.target.value))}
          />
        </div>

        <Link to="#" className="float-right mb-4">Forgot Password?</Link>

        <button
          id="login_button"
          type="submit"
          className="btn btn-block py-3"
        >
          LOGIN
        </button>

        <Link to="/register" className="float-right mt-3">New User?</Link>
      </form>
      </div>
</div>
</div>
  )
}

export default Login