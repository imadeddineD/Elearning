import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/db";
import {Course} from "@/model/Course";
import { auth } from "@clerk/nextjs";

export const GET = async (req : NextRequest , {params} : any) => {
  try {
      const {courseId} = params 
      await connectMongo()
      const course = await Course.findById(courseId)
      return new NextResponse(JSON.stringify(course) , {status : 200} )
  } catch (error) {
      return new NextResponse('database error' , {status : 500} )
  }
}

export const DELETE =  async (req : NextRequest ,  { params }: { params: { courseId: string} }) => {
  const { courseId } = params;
  await connectMongo();
  await Course.findByIdAndDelete(courseId , {
    new: true
  });
  


  return NextResponse.json({ message: "Course deleted" }, { status: 200 });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { courseId } = params;
    const values = await req.json();
    await connectMongo() 
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await Course.findByIdAndUpdate(
      courseId ,
      values)

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}