import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts, searchProducts } from "../../actions/productActions";



function Header() {

   let [search, setSearch]= useState('')
   let dispatch= useDispatch()
 
   const [price, setPrice]=useState([1,1000])

  
   const handleSubmit=()=>{
    
    dispatch(searchProducts(search ,1, price))
   
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
      <div className="col-12 col-md-3 mt-4 mt-md-0  text-center">
        <button className="btn" id="login_btn">
          Login
        </button>
        <span id="cart" className="ml-3">
          Cart
        </span>
        <span className="ml-1" id="cart_count">
          2
        </span>
      </div>
    </nav>
  );
}

export default Header;
