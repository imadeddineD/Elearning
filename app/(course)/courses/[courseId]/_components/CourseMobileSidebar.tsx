import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet";

import  CourseSidebar  from "./courseSidebar";

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


interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
};

export const CourseMobileSidebar = ({ 
  course,
  progressCount,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
        />
      </SheetContent>
    </Sheet>
  )
}