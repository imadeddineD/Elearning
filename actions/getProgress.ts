import { Chapter, Course, Progress } from "@/model/Course";


export const getProgress = async (
  userId: string,
  courseId: string,
): Promise<number> => {
  try {
    const course = await Course.findById(courseId);

    const publishedChapters = await course.chapter

    const publishedChapterIds = publishedChapters.map((chap : any) => chap._id);

    const validCompletedChapters = await Progress.countDocuments({
      userId: userId, // Include userId in the query
      chapterId: { $in: publishedChapterIds }, // Check if chapterId is in the publishedChapterIds array
      isCompleted: true,
    });


    

    const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100;

    

 

    return progressPercentage;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return 0;
  }
}