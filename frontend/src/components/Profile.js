import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link} from 'react-router-dom'
import { loadUser } from '../actions/userAction'

import Loader from './layout/loader'

export const Profile = () => {

 let dispatch = useDispatch()


    let {user, isLoading} =useSelector(state=>state.User)
    useEffect(()=>{
        dispatch(loadUser())
    },[])
    

 console.log('user',user)

  return (
   <>

   {isLoading?(
      <Loader/>

   ):(

       <div className='container container-fluid mt-5 '>
               <h4 className='text-center'>My Profile</h4>
           <div className=' row mt-5 justify-content-around user-info'>
            
                <div className='col-12 col-md-3'>
                    <img src='' alt='images/camera.jpg'
                      className='img-fluid rounded-circle'>
                    
                    </img>
                    <Link to='/edit_profile' className='d-block btn btn-danger  my-5'>
                        Edit profile
                    </Link>
    
                </div>
                <div className='col-12 ml-auto col-md-6'>
                    <h3>Full Name</h3>
                    <p className='text-muted'> {user.name}</p>
    
                    <h3>Email Address</h3>
                    <p className='text-muted'>{user.email}</p>
    
                    <h3>Joined On</h3>
                    <p className='text-muted'>{String(user.createdAt).substring(0,10)}</p>
    
                    <button className=' btn btn-danger btn-block'>
                        Chanded password
                    </button>
    
                </div>
    
               </div>
    
    
       </div>
   )}
   </>
  )
}

