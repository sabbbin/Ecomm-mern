
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {  http } from "../http.services";

const Register = () => {

    const initialState={ 
    name:'',
    email:'',
    password:'',
  
}

let [avatar, setAvatar]= useState('')
let [preview, setPreview]= useState('')

    const dispatch = useDispatch() 
    const navigate= useNavigate()

    let [data, setData]= useState(initialState)
    let [filesToUpload,setFilesToUpload]=useState([]);


    const handleSubmit=(e)=>{
        e.preventDefault()
        const form_data= new FormData()
        for (let key in data){
            console.log(key, data[key])
            form_data.append(key,data[key])
        }
        form_data.append('avatar', avatar)
       
      
        http.postItem ('api/v1/user/register',form_data)
        .then((result)=>{
          navigate('/login')
        })
        .catch((err)=>{
          console.log('error in register',err)
        })
        
      
        
    }

    const handleChange=(e)=>{
        let {name,value, files}=e.target;
        if (name=='avatar'){
            const reader = new FileReader();

            reader.onload=()=>{
                console.log(reader)
                if (reader.readyState==2){
                    setAvatar(reader.result)
                }
            }
            reader.readAsDataURL(files[0])
        } else{
        // if (files){
        //     let images=[]
        //     Object.keys(files).map(key=>{
        //         images.push(files[key])
              
        //     })
        //     return setFilesToUpload(images)
       
        // }
        setData({...data, [name]:value})
        }
    }




  return (
    <div className="container container-fluid">
    <div className="row wrapper">
    <div className="col-10 col-lg-5">
    <form className="shadow-lg" onSubmit={handleSubmit} encType='multipart/form-data'>
        <h1 className="mb-3">Register</h1>

      <div className="form-group" onSubmit={handleSubmit}>
        <label htmlFor="email_field">Name</label>
        <input type="name" id="name_field"
         className="form-control" 
         name='name'
         onChange={handleChange}
         />
      </div>

        <div className="form-group">
          <label htmlFor="email_field">Email</label>
          <input
            type="email"
            id="email_field"
            className="form-control"
            name='email'
           
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password_field">Password</label>
          <input
            type="password"
            id="password_field"
            className="form-control"
             name='password'
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='avatar_upload'>Avatar</label>
          <div className='d-flex align-items-center'>
              <div>
     
                <h6> {data.avatar}</h6>
                  <figure className='avatar mr-3 item-rtl'>
                      <img
                          src={avatar}
                          className='rounded-circle'
                          alt='image'
                      />
                  </figure>
       

               
              </div>
              <div className='custom-file'>
                  <input
                      type='file'
                      name='avatar'
                      className='custom-file-input'
                      id='customFile'
                      onChange={handleChange}
                  />
                  <label className='custom-file-label' htmlFor='customFile'>
                      Choose Avatar
                  </label>
              </div>
          </div>
      </div>

        <button
          id="register_button"
          type="submit"
          className="btn btn-block py-3"
        >
          REGISTER
        </button>
      </form>
      </div>
</div>
</div>
  );
};

export default Register;
