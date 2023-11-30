import { getChapter } from '@/actions/getChapter';
import { Banner } from '@/components/banner';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react'
import { VideoPlayer } from './_components/VideoPlayer';
import { CourseEnrollButton } from './_components/CourseEnrollButton';
import { Preview } from '@/components/preview';
import { Separator } from '@/components/ui/separator';
import { number } from 'zod';
import CourseProgressButton from './_components/CourseProgressButton';

// interface Chap {
//   chapter : any,
//   course : any,
//   muxData,
//   attachments,
//   nextChapter,
//   purchaseLen ,
//   userProgress
// }


const page = async ({
  params
}: {
  params: { courseId: string; chapterId: string }
}) => {
  const { userId } = auth();
  
  if (!userId) {
    return redirect("/");
  } 

  const {
    chapter,
    course,
    nextChapter,
    purchaseLen ,
    userProgress
  } = await getChapter({
    userId,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  

  
const isPurchase = purchaseLen  > 0 ? true : false 
  // const isLocked = !chapter.isFree && !purchase;
  const isLocked = !chapter.isFree && !isPurchase
  // const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {/* {userProgress?.isCompleted && (
        <Banner
          variant="success"
          label="You already completed this chapter."
        />
      )} */}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer 
            chapterId={chapter}
            // title={chapter.title}
            // courseId={params.courseId}
            // nextChapterId={nextChapter?._id}
            // playbackId={muxData?.playbackId!}
            isLocked={isLocked} playbackId={''} courseId={''}  completeOnEnd={false} title={''}            // completeOnEnd={completeOnEnd}
          />
        </div>
        <div>
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">
              {chapter.title}
            </h2>
        {isPurchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter?._id}
                isCompleted={userProgress?.isCompleted}
              />
              
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course ? course[0].price : null}
              />
            )} 
          </div>
        </div>
      </div>
      <Separator />
        <div>
            <Preview value={chapter.description!} />
        </div>
    </div> 
  )
}

export default page