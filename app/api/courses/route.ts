import {Course} from "@/model/Course";
import connectMongo from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export const GET = async () => {
  try {
    const {userId} = auth()
    if (!userId ) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
      await connectMongo()
      const course = await Course.find()
      return new NextResponse(JSON.stringify(course) , {status : 200} )
  } catch (error) {
      return new NextResponse('database error' , {status : 500} )
  }
}

export const POST = async (request : NextRequest) => {
  try {
        const {userId} = auth()
        const { title} = await request.json();

        if (!userId ) {
            return new NextResponse("Unauthorized", { status: 401 });
          }
        await connectMongo();
        const course = await Course.create({ title, userId })
        return NextResponse.json(course);
    } catch (error) {
        console.log("[COURSES]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }

}



