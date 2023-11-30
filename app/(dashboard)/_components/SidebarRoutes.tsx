"use client"
import React, { useEffect, useState } from 'react'

import  SidebarItem  from './SidebarItem'
import { usePathname } from 'next/navigation'

const guestRoutes  = [
    {
        label : "Dashboard" , 
        href : '/'
    } , 
    {
        label : "Browse" , 
        href : '/search'
    } 
]

const teacherRoutes = [
    {
      label: "Courses",
      href: "/teacher/courses",
    },
    {
      label: "Analytics",
      href: "/teacher/analytics",
    },
  ]

const SidebarRoutes = () => {
    const pathname = usePathname()
    const isTeacherPage = pathname?.includes("/teacher");
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
      setIsMounted(true);
    }, []);

    const routes = isTeacherPage ? teacherRoutes : guestRoutes;

    if (!isMounted) {
      return null;
    }
    
  return (
    <div className=' flex flex-col w-full'>
        {routes.map((route ) => (
            <SidebarItem 
            key={route.href}
            label={route.label}
            href={route.href} 
            />   
        ) )}
    </div>
  )
}

export default SidebarRoutes