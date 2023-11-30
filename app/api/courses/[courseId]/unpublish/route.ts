import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import connectMongo from "@/lib/db";
import { Chapter, Course } from "@/model/Course";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string} }
) {
  try {
    const { userId } = auth();
    const {courseId} = params
    await connectMongo()
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const unpublishedChapter = await Course.findByIdAndUpdate(courseId, {
        isPublished: false,
      },
      { new: true }
    );

  
   

    

    return NextResponse.json(unpublishedChapter);
  } catch (error) {
    console.log("[CHAPTER_UNPUBLISH]", error);
    return new NextResponse("Internal Error", { status: 500 }); 
  }
}