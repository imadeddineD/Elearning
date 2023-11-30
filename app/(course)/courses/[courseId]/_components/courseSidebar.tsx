import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import{ CourseSidebarItem }from './CourseSidebarItem';
import { Progress, Purchase } from '@/model/Course';
import {CourseProgress} from '@/components/CourseProgress';

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

interface CourseSidebarProps {
    course: Course & {
      chapters: (Chapter & {
        userProgress: UserProgress[] | null;
      })[]
    };
    progressCount: number;
  };

const courseSidebar = async ({
    course,
    progressCount,
  }: CourseSidebarProps) => { 

    const { userId } = auth();

    if (!userId) {
      return redirect("/");
    }

    const validChapters = course.chapter.filter((chap : any) => {
        chap.isPublished === true 
        return chap
    })

    const publishedChapters = course.chapter

    const publishedChapterIds = publishedChapters.map((chap : any) => chap._id);

    const Completed= await Progress.findOne({
      userId: userId, // Include userId in the query
      chapterId: { $in: publishedChapterIds }, // Check if chapterId is in the publishedChapterIds array
      isCompleted: true,
    });

    

    console.log('this is the complete chap : ')
    console.log(Completed)
    // console.log(Completed.isCompleted)


   

    const purchase = await Purchase.find({
          userId,
          courseId: course._id,    
    });

    const isPurchase = purchase.length > 0 ? true : false
    // console.log("this is purchase from courseSidebar : ")
    // console.log(purchase)

  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">
          {course.title}
        </h1>
        {purchase.length > 0 && (
          <div className="mt-10">
            <CourseProgress
              variant="success"
              value={progressCount}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col w-full">
        {validChapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter._id.toString()}
            id={chapter._id}
            label={chapter.title}
            isCompleted={Completed ? (Completed?.isCompleted ? true : false ) : false}
            courseId={course._id}
            isLocked={!chapter.isFree && !isPurchase}
          />
        ))}
      </div>
    </div>
  )
}

export default courseSidebar