// import { Chapter, Course, UserProgress } from "@prisma/client"

import { NavbarRoutes } from "@/components/navbar-routes";
import { CourseMobileSidebar } from "./CourseMobileSidebar";

// import { CourseMobileSidebar } from "./course-mobile-sidebar";
interface Chapter {
    _id : String , 
    title: String, 
    courseId : String , 
    description: String,
    video: String,
    position:Number,
    isPublished : Boolean ,  
    isFree : Boolean ,  
  }

interface Course { 
      _id : string ,
      userId: String,
      title: String,
      description: String,
      image: String,
      category: String,
      price:number,
      attachement : String , 
      isPublished :Boolean , 
      chapter : Chapter[]  , 
      progress: number | null; 
    }

    interface UserProgress {
        isCompleted : String , 
          
      }

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
};

export const CourseNavbar = ({
  course,
  progressCount,
}: CourseNavbarProps) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
      />
      <NavbarRoutes />      
    </div>
  )
}