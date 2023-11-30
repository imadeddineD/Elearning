import React from 'react'
import Categories from './_components/Categories'
import { SearchInput } from '@/components/SearchInput'
import { getCourses } from '@/actions/getCourses';
import { auth } from '@clerk/nextjs';
import { CoursesList } from '@/components/courseList';

interface SearchPageProps {
  searchParams: {
    title: string;
    category: string;
  }
};

const categories = [
  {
    _id : "1" ,
    name : "Computer Science" 
  },
  {
    _id : "2" ,
    name : "Music" 
  },
  {
    _id : "3" ,
    name : "Fitness" 
  },
  {
    _id : "4" ,
    name : "Photography" 
  },
  {
    _id : "5" ,
    name : "Accounting" 
  },
  {
    _id : "6" ,
    name : "Engineering" 
  },
  {
    _id : "7" ,
    name : "Filming" 
  },
] 



const page = async ({
  searchParams
}: SearchPageProps) => {
  const { userId } : any = auth();

  const courses : any = await getCourses({
    userId,
    ...searchParams,
  });
  return (
    <>
    <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
    <div className=' p-6'>
      <Categories
      items = {categories}
      />
      <CoursesList items={courses} />
    </div>
    </>
  )
}
 
export default page