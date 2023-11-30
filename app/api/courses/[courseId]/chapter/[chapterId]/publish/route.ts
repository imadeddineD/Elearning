import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import connectMongo from "@/lib/db";
import { Chapter, Course } from "@/model/Course";



export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const {chapterId , courseId} = params
    await connectMongo()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    

    const chapter = await Chapter.findById(chapterId)

    

    if (!chapter || !chapter.title || !chapter.description || !chapter.video) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const publishedChapter = await Chapter.findByIdAndUpdate(chapterId,
      {
        isPublished: true,
      },
      { new: true } // you should add this 
    );

    const updatedCourse = await Course.findOneAndUpdate(
      {
        _id: courseId,
        'chapter._id': publishedChapter._id,
      },
      {
        $set: {
          'chapter.$': publishedChapter,
        },
      },
      { new: true }
    );

    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log("[CHAPTER_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}