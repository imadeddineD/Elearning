
import { Course, Purchase } from "@/model/Course";
import { getProgress } from "./getProgress";

type DashboardCourses = {
  completedCourses: any[];
  coursesInProgress: any[];
}

export const getDashboardCourses = async (userId: string): Promise<DashboardCourses> => {
  try {
    const purchasedCourses = await Purchase.find({userId});

    const coursesIds = purchasedCourses.map((purchase) => purchase.courseId) ;

    const courses = await Course.find({
        _id: { $in: coursesIds },
      });

    for (let course of courses) {
      const progress = await getProgress(userId, course.id);
      course["progress"] = progress;
    }

    const completedCourses = courses.filter((course) => course.progress === 100);
    const coursesInProgress = courses.filter((course) => (course.progress ?? 0) < 100);

    return {
      completedCourses,
      coursesInProgress,
    }
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]", error);
    return {
      completedCourses: [],
      coursesInProgress: [],
    }
  }
}