
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, updateUserProfile } from '../actions/userAction'

import { useNavigate } from "react-router-dom";

const Updateprofile = ({history}) => {

     let {name, email, avatar,isUpdate}=useSelector(state=>state.User.user)
  
      let dispatch= useDispatch()

    let [name1, setName]= useState(name)
    let [email1 ,setEmail] = useState(email)
    let [avatar1, setAvatar]=useState(avatar.public_id)
    let navigate = useNavigate();

    
    const handleChange=(e)=>{
      
        const reader = new FileReader();

            reader.onload=()=>{
               
                if (reader.readyState==2){
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(e.target.files[0])
        

    }

  
    const handleSubmit=(e)=>{
        e.preventDefault()
        let formdata= new FormData()
        formdata.set('name',name1)
        formdata.set('email',email1)
        formdata.set('avatar',avatar1)
     

        dispatch(updateUserProfile(formdata))

       navigate('/me')
    }

  return(

    <div class="container-container-fluid">
    <div class="row wrapper">
             <div class="col-10 col-lg-5">
                 <form class="shadow-lg"  onSubmit={handleSubmit} encType='multipart/form-data'>
                     <h1 class="mt-2 mb-5">Update Profile</h1>

                     <div class="form-group">
                         <label for="email_field">Name</label>
                         <input 
                             type="name" 
                             id="name_field" 
                             class="form-control"
                             name='name'
                             value={name1}
                             onChange={(e)=>setName(e.target.value)}
                         />
                     </div>

                     <div class="form-group">
                         <label for="email_field">Email</label>
                         <input
                             type="email"
                             id="email_field"
                             class="form-control"
                             name='email'
                             value={email1}
                             onChange={e=>setEmail(e.target.value)}
                         />
                     </div>

                     <div class='form-group'>
                         <label for='avatar_upload'>Avatar</label>
                         <div class='d-flex align-items-center'>
                             <div>
                                 {avatar1 && 
                                 <figure class='avatar mr-3 item-rtl'>
                                     <img
                                         src={avatar1}
                                         class='rounded-circle'
                                         alt='Avatar Preview'
                                     />
                                 </figure>}
                             </div>
                             <div class='custom-file'>
                                 <input
                                     type='file'
                                     name='avatar'
                                     class='custom-file-input'
                                     id='customFile'
                                     onChange={handleChange}
                                 />
                                 <label class='custom-file-label' for='customFile'>
                                     Choose Avatar
                             </label>
                             </div>
                         </div>
                     </div>

                     <button type="submit" class="btn update-btn btn-block mt-4 mb-3" >Update</button>
                 </form>
             </div>
         </div>
     
 </div>
  )
}

export default Updateprofile