import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <Outlet/>
        <div>Layout</div>
    
    </>
  )
}

export default Layout