import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import { CookiesProvider } from "react-cookie";
const Homelayout = () => {
  return (
      <>
      <Header />
      <Outlet />
      <Footer />
      </>
  )
}

export default Homelayout