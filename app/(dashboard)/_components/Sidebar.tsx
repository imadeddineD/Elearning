import React from 'react'
import {Logo} from './Logo'
import SidebarRoutes from './SidebarRoutes'

const Sidebar = () => {
  return (
    <div className='border-r h-full flex flex-col overflow-auto bg-white shadow-sm'>
        <div className=' flex gap-1 p-6 font-bold justify-center items-center text-lg text-[#0369A1]'>
            <Logo/> 
             Elearning
        </div>
        <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
    </div>
  )
}

export default Sidebar