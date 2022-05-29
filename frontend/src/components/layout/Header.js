
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { searchProducts } from "../../actions/searchAction";
import { loadUser, userLogout } from "../../actions/userAction";



function Header() {

   let [search, setSearch]= useState('')
   let dispatch= useDispatch()
   let {user, isLoading, status}= useSelector(state=>state.User)
   console.log('user',user)
   console.log('userstatu',status)
 


   const handlelogout=()=>{
     dispatch(userLogout())
   }

  
   const handleSubmit=()=>{
    
    dispatch(searchProducts(search))
   
   }
  return (
    <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <img src="https://raw.githubusercontent.com/ghulamabbas2/shopit/master/frontend/public/images/shopit_logo.png"></img>
        </div>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <div className="input-group">
          <input
            type="text"
            id="search-field"
            className="form-control"
            placeholder="Enter Product name"
            onChange={e=>setSearch(e.target.value)}
          />
          <div className="input-group-append">
            <button id="search_btn" className="btn" onClick={handleSubmit}>
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      <div className=" col-12 col-md-3 mt-4 mt-md-0  text-center">
        <Link to='/cart' style={{ textDecoration:'none'}}>
        <span id="cart" className="">
          Cart
        </span>
        <span className="mx-1" id="cart_count">
          2
        </span>
        </Link>

        {status?
        (
       <div className="ml-4 dropdown d-inline">
         <Link to='#' className="btn  dropdown-toggle text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
         >
           <figure className="avatar avatar-nav">
             <img src={user.avatar&&user.avatar.public_id} alt='no'
             className="rounded-circle"
             ></img>
           </figure>
           <span>
             {user&&user.name}
           </span>
 
         
         </Link>
         
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">

      {(user.role=='admin')?(
       

         <Link  className="dropdown" to='/dashboard' >Dashboard</Link>
     

      ):
  

        <Link  className="dropdown-item" to='/myorder' >My Order</Link>
     
      
      }
           <Link className="dropdown-item" to ='/me' >Profile</Link>
           <Link className="dropdown-item text-danger" to='/'
           onClick={handlelogout}
           >
             Logout
           </Link>

         </div>
         </div>
        ):(
          <button className="btn ml-3" id="login_btn">
          <Link to='/login'>
          Login
            </Link>
      
        </button>
        )}  
        
      </div>
    </nav>
  );
}

export default Header;
