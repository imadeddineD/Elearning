import Image from "next/image";
import Link from "next/link";
import { BookOpen } from "lucide-react";

import { IconBadge } from "@/components/icon-badge";
import { formatPrice } from "@/lib/format";
import { Purchase } from "@/model/Course";
import { auth } from "@clerk/nextjs";
import { CourseProgress } from "./CourseProgress";
// import { CourseProgress } from "@/components/course-progress";

interface CourseCardProps {
  id: String;
  title: String ;
  imageUrl: String;
  chaptersLength: number;
  price: number;
  progress: any;
  category: String;
};

export const CourseCard =async ({
  id,
  title,
  imageUrl,
  chaptersLength,
  price,
  progress,
  category
}: CourseCardProps) => {
  const {userId} = auth()
  const purchase = await Purchase.find({
    courseId : id , 
    userId 
  })


  const isPurchase = purchase.length > 0 ? true : false
  const isProgress = progress !== 0
  return (
    <Link href={`/courses/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image
            fill
            className="object-cover"
            alt={title.toString()}
            src={imageUrl.toString()}
          />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">
            {category}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>
                {chaptersLength} {chaptersLength === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>
          </div>
          {isProgress || isPurchase ? (
            <CourseProgress
            variant={progress === 100 ? "success" : "default"}
            size="sm"
            value={progress}
          />
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              {formatPrice(price)}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}