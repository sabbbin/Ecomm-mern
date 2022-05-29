import React, { useEffect } from "react";
import Home from "./components/Home";

import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";

import store from "./store";
import Homelayout from "./components/layout/Homelayout";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductDetail from "./components/ProductDetail";
import { Profile } from "./components/Profile";
import Updateprofile from "./components/updateprofile";
import { loadUser } from "./actions/userAction";
import LoginRoute from "./components/ProtectedRoute/LoginRoute";
import ChangedPassword from "./components/ChangedPassword";

export default function App() {
  
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])
  


 


  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
     
          <Route path="/" element={<Homelayout/>}>
            <Route index element={<Home ></Home>}></Route>
            <Route path='/me' 
             element={<LoginRoute component={<Profile />}/>}
              ></Route>
           <Route path='/update' 
             element={<LoginRoute component={<Updateprofile />}/>}
             ></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='/product/:id' element={<ProductDetail />}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/changepassword' element={<ChangedPassword/>}></Route>
            
            </Route>

 

          </Routes>
        </Router>
      </Provider>
    </>
  );
}
