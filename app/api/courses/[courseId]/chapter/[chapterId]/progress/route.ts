import { Progress } from "@/model/Course";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function PUT(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    const { isCompleted } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    } 

    const userProgress = await Progress.findOneAndUpdate({
      userId , 
      chapterId : params.chapterId
    }, 
      { isCompleted} ,
       { new: true, upsert: true })
    
    // const updatedProgress = await Progress.findOneAndUpdate(
    //   { userId, chapterId: params.chapterId },
    //   { isCompleted: !isCompleted }, // Toggle isCompleted status
    //   { new: true, upsert: true }
    // );

    console.log(userProgress)
    return NextResponse.json(userProgress);
  } catch (error) {
    console.log("[CHAPTER_ID_PROGRESS]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}