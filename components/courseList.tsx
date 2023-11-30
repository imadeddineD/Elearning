import { CourseCard } from "./courseCard";

interface Chapter {
    
    title: String, 
    courseId : String , 
    description: String,
    video: String,
    position:Number,
    isPublished : Boolean ,  
    isFree : Boolean ,  
  }

interface Course { 
      _id : string ,
      userId: string,
      title: string,
      description: string,
      image: string,
      category: string,
      price:number,
      attachement : string , 
      isPublished :boolean , 
      chapter : Chapter[]  , 
      progress: number | null 
    }






interface CoursesListProps {
  items: Course[];
}

export const CoursesList = ({
  items
}: CoursesListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCard
            key={Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
            title={item.title}
            imageUrl={item.image}
            chaptersLength={item.chapter.length}
            price={item.price}
            progress={item.progress}
            category={item?.category} 
            id={item?._id} 
                   />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foreground mt-10">
          No courses found
        </div>
      )}
    </div>
  )
}