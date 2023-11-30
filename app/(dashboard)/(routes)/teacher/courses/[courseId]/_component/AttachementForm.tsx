"use client";

import * as z from "zod";
// import axios from "axios";
import { Pencil, PlusCircle, ImageIcon, File , X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";

interface AttachementFormProps {
    initialData: {
        attachement: string;
      };
  courseId: string;
};

const formSchema = z.object({
    attachement: z.string().min(1, {
      message: "Your Attachement here ...",
    }),
});

export const AttachementForm = ({
  initialData,
  courseId
}: AttachementFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
     await fetch(`/api/courses/${courseId}` , 
    {
        method : 'PATCH' ,  
        headers : {'Content-type' : 'application/json'} , 
        body : JSON.stringify(values)
    })
      toast.success("Course updated");
      toggleEdit();
      router.refresh();
    } catch  {
      toast.error("Something went wrong");
    }
    console.log(values)
  } 
  const onDelete = async (values: z.infer<typeof formSchema>) => {
    try {
     await fetch(`/api/courses/${courseId}` , 
    {
        method : 'PATCH' ,  
        headers : {'Content-type' : 'application/json'} , 
        body : JSON.stringify(values)
    })
      toast.success("Course updated");
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
        Course attachement
        <Button onClick={toggleEdit} variant="ghost">
        {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a file
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
        { !initialData.attachement && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No attachments yet
            </p>
          )}
          {initialData.attachement && (
            <div
            className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
          >
            <File className="h-4 w-4 mr-2 flex-shrink-0" />
            <p className="text-xs line-clamp-1">
              {initialData.attachement}
            </p>
            <button
                      onClick={() => {
                        {
                          onDelete({ attachement: "" });
                        }
                      }}
                      className="ml-auto hover:opacity-75 transition"
                    >
                      <X className="h-4 w-4" />
                </button>
            </div>
          )}
        </>
      )}
      
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ attachement: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  )
}