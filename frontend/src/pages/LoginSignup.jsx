
import React from 'react'
import { Outlet } from 'react-router-dom';
// import logo from '../assets/image.png';
export default function LoginSignUp() {
  return (
    <div className="flex flex-col  flex-1  overflow-hidden">
        {/* <img
          src={logo}
          alt="logo"
          className="mx-auto w-[170px]"
        /> */}
        <Outlet />
      </div>
  )
}
