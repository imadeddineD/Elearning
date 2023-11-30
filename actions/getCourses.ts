

import { getProgress } from "@/actions/getProgress";
import { Course } from "@/model/Course";

interface Chapter {
    title: String, 
    courseId : String , 
    description: String,
    video: String,
    position:Number,
    isPublished : Boolean ,  
    isFree : Boolean ,  
  }

interface Coursse { 
      userId: String,
      title: String, 
      description: String,
      image: String,
      category: String,
      price:number,
      attachement : String , 
      isPublished :Boolean , 
      chapter : Chapter[]      
    }

    interface Category {
        _id : String , 
        name : String
    }
  

type CourseWithProgressWithCategory = Coursse & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetCourses = {
  userId: string;
  title?: string;
  category?: string;
};

export const getCourses = async ({
  userId,
  title,
  category
}: GetCourses): Promise<CourseWithProgressWithCategory[]> => {
  try {
    let condition = {}
    if (title) {
      condition = {
        title: { $regex: new RegExp(title, "i") } , 
        isPublished: true 
      }
    } else if (category) {
      condition = {
        category  , 
        isPublished: true 
      }
    } else if (title && category ) {
      condition = {
        title: { $regex: new RegExp(title, "i") } , 
        category  , 
        isPublished: true 
      }
    } else {
      condition = { 
        isPublished: true 
      }
    }
    
    const courses = await Course.find(condition)

    const coursesWithProgress : any = await Promise.all(
       courses.map(async course => {

        const progressPercentage = await getProgress(userId, course._id);

        return {
          ...course._doc,
          progress: progressPercentage,
        };
      })
    );

    // console.log('this is course kanki : ')
    // console.log(coursesWithProgress)

    return coursesWithProgress;
  } catch (error) {
    console.log("[GET_COURSES]", error);
    return [];
  }
}