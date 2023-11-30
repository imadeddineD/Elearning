import React from 'react'
import {  redirect} from 'next/navigation';
import { Chapter, Course } from '@/model/Course';
import { IconBadge } from '@/components/icon-badge';
import { CircleDollarSign, File, LayoutDashboard, ListChecks } from 'lucide-react';
import { TitleForm } from './_component/TitleForm';
import { DescriptionForm } from './_component/DescriptionForm';
import { ImageForm } from './_component/ImageForm';
import { CategoryForm } from './_component/CategoryForm';
import { PriceForm } from './_component/PriceForm';
import { AttachementForm } from './_component/AttachementForm';
import { ChapterForm } from './_component/ChapterForm';
import { Banner } from '@/components/banner';
import { Actions } from './_component/Actions';



const page = async ({
    params
  }: {
    params: { courseId: string; }
  }) => {
    const chapters = await Chapter.find({courseId : params.courseId})
    const course = await Course.findById(params.courseId)
    if (!course) {
      return redirect("/");
    }
    

  
    const categories = [
      {
        _id : "1" ,
        name : "Computer Science" 
      },
      {
        _id : "2" ,
        name : "Music" 
      },
      {
        _id : "3" ,
        name : "Fitness" 
      },
      {
        _id : "4" ,
        name : "Photography" 
      },
      {
        _id : "5" ,
        name : "Accounting" 
      },
      {
        _id : "6" ,
        name : "Engineering" 
      },
      {
        _id : "7" ,
        name : "Filming" 
      },
    ]

    const requiredFields = [
      course.title , 
      course.description , 
      course.image , 
      course.category , 
      course.price , 
      course.chapter.some( (chap : any) => chap.isPublished)
    ]

    const maxFields = requiredFields.length
    const completedFields = requiredFields.filter(Boolean).length
    const displayed = `(${completedFields}/${maxFields})`

    const isComplete = requiredFields.every(Boolean);
  
  return (
    <>
     {!course.isPublished && (
        <Banner
          label="This course is unpublished. It will not be visible to the students."
        />
      )}
    <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">
              Course setup
            </h1>
            <span className="text-sm text-slate-700">
              Complete all fields {displayed}
            </span>
          </div>
          <Actions
                disabled={!isComplete}
                courseId={params.courseId}
                isPublished={course.isPublished}
              />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">
                Customize your course
              </h2>
            </div>
            <TitleForm 
              initialData={course}
              courseId={course._id.toString()}
            />
            <DescriptionForm
              initialData={course}
              courseId={course._id.toString()}
            /> 
            <ImageForm
              initialData={course}
              courseId={course._id.toString()}
            /> 
            <CategoryForm
              initialData={course}
              courseId={course.id}
              options={categories.map((category) => ({
                label: category.name,
                value: category.name,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">
                  Course chapters
                </h2>
              </div>
              <div className=' mb-3'>
              <ChapterForm
              initialData={chapters}
              courseId={course._id.toString()}
            />
              </div>
              <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">
                  Sell your course
                </h2>
              </div>
              <PriceForm
                initialData={course}
                courseId={course.id}
              />
            </div>
            <div className=' md:mt-3'>
            <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">
                  Resources & Attachement 
                </h2>
              </div>
              <AttachementForm
              initialData={course}
              courseId={course._id.toString()}
            /> 
            </div>
            </div>
          </div>
        </div>
    </div>
    </>
  )
}

export default page 