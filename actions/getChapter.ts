import { Chapter, Course, Progress, Purchase } from "@/model/Course";
import { number } from "zod";


interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
};
interface Chapterr {
    _id : String , 
    title: String, 
    courseId : String , 
    description: String,
    video: String,
    position:Number,
    isPublished : Boolean ,  
    isFree : Boolean ,  
  }

interface Coursse { 
    _id : string ,
    userId: String,
    title: String,
    description: String,
    image: String,
    category: String,
    price:number,
    attachement : String , 
    isPublished :Boolean , 
    chapter : Chapterr[]  , 
    progress: number | null; 
  }



export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    const purchase = await Purchase.find({
          userId,
          courseId, 
    });

    const purchaseLen : any   = purchase.length

    const course  = await Course.find({
        isPublished: true,
        _id: courseId,
     
    });

    const chapter = await Chapter.findOne({_id : chapterId})

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let muxData = null;
    let attachments  = "";
    let nextChapter  = null;

    if (chapter.isFree) {
      attachments = course[0].attachement
    }

    if (chapter.isFree ) {
      muxData = chapter.video
    };

    nextChapter  = await Chapter.findOne({
        courseId , 
        position : chapter.position + 1
      });
    

    const userProgress  = await Progress.findOne({
      userId,
      chapterId,
    });

    // console.log('this is userProgress from chapterId : ')
    // console.log(userProgress)

    return {
      chapter,
      course,
      nextChapter,
      purchaseLen ,
      userProgress
    } ;
  } catch (error) {
    console.log("[GET_CHAPTER]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    }
  } }
