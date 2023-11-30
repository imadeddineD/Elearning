import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getProgress } from "@/actions/getProgress";

import  CourseSidebar  from "./_components/courseSidebar";
import { Course } from "@/model/Course";
import {CourseNavbar} from "./_components/courseNavbar";

const CourseLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { courseId: string };
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/")
  }

  const course = await Course.findById(params.courseId);

  if (!course) {
    return redirect("/");
  }



  const progressCount = await getProgress(userId, course?._id);

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <CourseNavbar
          course={course}
          progressCount={progressCount}
        />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <CourseSidebar
          course={course}
          progressCount={progressCount}
        />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">
        {children}
      </main>
    </div>
  )
}

export default CourseLayout