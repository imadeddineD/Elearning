"use client";

import * as z from "zod";
// import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, Video } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import ReactPlayer from 'react-player'

interface ChapterVideoFormProps {
    initialData: {
        video: string;
      };
  courseId: string;
  chapterId : string ; 
};

const formSchema = z.object({
  video: z.string().min(1, {
    message: "Video is required",
  }),
});

export const ChapterVideoForm = ({
  initialData,
  courseId , 
  chapterId
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
     await fetch(`/api/courses/${courseId}/chapter/${chapterId}` , 
    {
        method : 'PATCH' ,  
        headers : {'Content-type' : 'application/json'} , 
        body : JSON.stringify(values)
    })
      toast.success("Chapter updated");
      toggleEdit();
      router.refresh();
    } catch  {
      toast.error("Something went wrong");
    }
    console.log(values)
  } 

  
  if (!isMounted) {
    return null;
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && !initialData.video && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a video
            </>
          )}
          {!isEditing && initialData.video && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.video ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <ReactPlayer
            controls={true}
              width="100"
              height="80"
              url={initialData.video}
            /> 
          </div>
        )
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ video: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter&apos;s video
          </div>
        </div>
      )}
      {initialData.video && !isEditing && (
        <div className="text-xs text-muted-foreground mt-2">
          Videos can take a few  minutes to process . refresh the page if the video does not appear .
        </div>
      )}
    </div>
  )
}