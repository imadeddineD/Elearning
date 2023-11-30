import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// import { getAnalytics } from "@/actions/get-analytics";

// import { DataCard } from "./_components/data-card";
import { Course, Purchase } from "@/model/Course";
import { DataCard } from "./_component/DataCard";

const AnalyticsPage = async () => {
  const purchase = await Purchase.find({})
  const totalSales = purchase.length
  const coursesIds = purchase?.map((purchase) => purchase.courseId) ;

    const courses = await Course.find({
        _id: { $in: coursesIds },
      });

    

    const coursesPrice = courses?.map((course) => course.price) ;
    const totalRevenue =  coursesPrice.length ? coursesPrice?.reduce((acc : number , cur : number ) => acc + cur) : 0
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }


  return ( 
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard
          label="Total Revenue"
          value={totalRevenue}
          shouldFormat
        />
        <DataCard
          label="Total Sales"
          value={totalSales}
        />
      </div>
    </div>
   );
}
 
export default AnalyticsPage;