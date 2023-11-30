import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/lib/db";
import {Chapter, Course} from "@/model/Course";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node"

// const { Video } = new Mux(
//   process.env.MUX_TOKEN_ID!,
//   process.env.MUX_TOKEN_SECRET!,
// );

// export const GET = async (req : NextRequest , {params} : any) => {
//   try {
//       const {courseId} = params 
//       await connectMongo()
//       const course = await Course.findById(courseId)
//       return new NextResponse(JSON.stringify(course) , {status : 200} )
//   } catch (error) {
//       return new NextResponse('database error' , {status : 500} )
//   }
// }

export async function PATCH(
  req: NextRequest
 , { params }: { params: { courseId: string; chapterId: string } }) {
  try {
    const { userId } = auth();
    const { chapterId , courseId } = params;
    const values = await req.json();
    await connectMongo() 
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedChapter = await Chapter.findByIdAndUpdate(chapterId, values, {
      new: true,
    });
    const updatedCourse = await Course.findOneAndUpdate(
      {
        _id: courseId,
        'chapter._id': updatedChapter._id,
      },
      {
        $set: {
          'chapter.$': updatedChapter,
        },
      },
      { new: true }
    );
    
    
    
  
    return NextResponse.json(updatedChapter);
  } catch (error) {
    console.log("[CHAPTER_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  } 
}

export const DELETE =  async (req : NextRequest ,  { params }: { params: { courseId: string; chapterId: string } }) => {
  const { chapterId , courseId } = params;
  await connectMongo();

  const chapterDel = await Chapter.findByIdAndDelete(chapterId , {
    new: true
  });
 
      const updatedCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        {
          $pull: {
            chapter: { _id: chapterDel._id }
          }
        },
        { new: true }
      );
  

 


  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}