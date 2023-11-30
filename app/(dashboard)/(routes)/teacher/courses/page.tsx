'use client'
import React, { useEffect, useState } from 'react';
// import { auth } from '@clerk/nextjs';
import { notFound, redirect } from 'next/navigation';
import { DataTable } from './_component/data-table';
import { columns } from './_component/columns';

const Page = () => {
  const [courses, setCourses] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
      setIsMounted(true);
    }, []);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/courses`, {
          cache: 'no-store',
        });

        if (!res.ok) {
          return notFound();
        }

        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once when the component mounts


  if (!isMounted) {
    return null;
  }


  return (
    <div className='p-6'>
      <h1>Your Courses</h1>
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default Page;
