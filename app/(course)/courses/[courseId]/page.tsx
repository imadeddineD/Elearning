
import { Course } from "@/model/Course";
import { redirect } from "next/navigation";

const CourseIdPage = async ({
  params
}: {
  params: { courseId: string; }
}) => {
  const {courseId} = params
  const course = await Course.findById(courseId)

  if (!course) {
    return redirect("/");
  }

  return redirect(`/courses/${course._id}/chapter/${course.chapter[0]._id}`);
}
 
export default CourseIdPage;