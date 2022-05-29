import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { http } from '../http.services'

const ChangedPassword = () => {


    let [oldpassword,setOldPassword]= useState()
    let [password, setNewPassword]= useState()
    let [confirmpassword, setConfirmpassword]= useState()
  let navigate= useNavigate()

    const handleSubmit=(e)=>{
        e.preventDefault()
        if (password === confirmpassword){

            http.updateItem('api/v1/user/password/update',{
                oldpassword,password
            })
            .then((result)=>{
                    if (result.data.success){
                        navigate('/me')
                    }
                    else{
                        toast.info('please enter write password')
                    }
            })
            .catch((err)=>{
                    console.log('error',err)
            })
        }
        else
        {
            toast.warning('password does not match')
        }

    }

  return (
   <>
   <ToastContainer />
   <div class="container-container-fluid">
		<div class="row wrapper">
                <div class="col-10 col-lg-5">
                    <form class="shadow-lg" onSubmit={handleSubmit}>
                        <h1 class="mt-2 mb-5">Update Password</h1>
                        <div class="form-group">
                            <label for="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                class="form-control"
                                onChange={(e)=>setOldPassword(e.target.value)}
                            />
                        </div>

                        <div class="form-group">
                            <label for="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                class="form-control"
                                onChange={(e)=>setNewPassword(e.target.value)}
                            />
                        </div>
                        <div class="form-group">
                            <label for="new_password_field">Confirm Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                class="form-control"
                                onChange={(e)=>setConfirmpassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" class="btn update-btn btn-block mt-4 mb-3">Update Password</button>
                    </form>
                </div>
            </div>
        
    </div>
   </>
  )
}

export default ChangedPassword