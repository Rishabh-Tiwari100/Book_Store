import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
const PublicRoute = () => {
  return (
        <>
        <Navbar/>
        <Outlet/>
        </>
  )
}

export default PublicRoute