import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { userLogin } from '../actions/userAction';





const Login = () => {
 
const dispatch =useDispatch()
let [email, setEmail]= useState('');
let [password, setPassword]= useState('')

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

        <a href="#" className="float-right mb-4">Forgot Password?</a>

        <button
          id="login_button"
          type="submit"
          className="btn btn-block py-3"
        >
          LOGIN
        </button>

        <a href="#" className="float-right mt-3">New User?</a>
      </form>
      </div>
</div>
</div>
  )
}

export default Login