import React from 'react'
import { Outlet } from 'react-router-dom';
export default function Root() {
  return (
    <div className="flex gap-[32px] p-[24px] bg-white min-h-screen">
      <Outlet />
    </div>
  )
}