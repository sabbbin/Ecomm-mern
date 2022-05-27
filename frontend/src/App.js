import React from "react";
import Home from "./components/Home";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store";
import Homelayout from "./components/layout/Homelayout";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
     
          <Route path="/" element={<Homelayout/>}>
            <Route index element={<Home ></Home>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/register' element={<Register />}></Route>
            </Route>

 

          </Routes>
        </Router>
      </Provider>
    </>
  );
}
