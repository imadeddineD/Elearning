import {Course , Chapter} from "@/model/Course";
import connectMongo from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export const POST = async (request : NextRequest , {params} : any) => {
  try {
        const {userId} = auth()
        const { title , position} = await request.json();
        const {courseId} = params

        if (!userId ) {
            return new NextResponse("Unauthorized", { status: 401 });
          }
        await connectMongo();
        const chapters = await Chapter.create({ title , courseId , position})
        
        const updatedCourse = await Course.findOneAndUpdate(
          { _id: courseId },
          {
            $push: {
              chapter: chapters, 
            },
          },
          { new: true }
        );

        

          
        console.log("success")
    }  catch (error) {
        console.log("[COURSES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }

}

export const GET = async ({params} : any) => {
  try {
    const {courseId} = params
      await connectMongo()
      const chapters = await Chapter.find({courseId})
      return new NextResponse(JSON.stringify(chapters) , {status : 200} )
  } catch (error) {
      return new NextResponse('database error' , {status : 500} )
  }
}