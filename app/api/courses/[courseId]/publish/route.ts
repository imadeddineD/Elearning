import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import connectMongo from "@/lib/db";
import { Chapter, Course } from "@/model/Course";



export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string;} }
) {
  try {
    const { userId } = auth();
    const { courseId} = params
    await connectMongo()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    

    const course = await Course.findById(courseId)

    

    if (!course || !course.title || !course.description || !course.image || !course.price || !course.category) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const publishedChapter = await Course.findByIdAndUpdate(courseId,
      {
        isPublished: true,
      },
      { new: true } // you should add this 
    );

    

    return NextResponse.json(publishedChapter);
  } catch (error) {
    console.log("[CHAPTER_PUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}