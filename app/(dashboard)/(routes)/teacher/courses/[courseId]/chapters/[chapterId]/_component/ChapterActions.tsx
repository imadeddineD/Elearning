"use client"

import { ConfirmModal } from "@/components/modals/confirmmodal";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
    disabled: boolean;
    courseId: string;
    chapterId: string;
    isPublished: boolean;
  };
  
  export const ChapterActions = ({
    disabled,
    courseId,
    chapterId,
    isPublished
  }: ChapterActionsProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    const onDelete = async () => {
        try {
          setIsLoading(true);

          const res = await fetch(`/api/courses/${courseId}/chapter/${chapterId}`, {
            method: "DELETE",
          });
          const response = await res.json()
          console.log(response);
          router.refresh();
          router.push(`/teacher/courses/${courseId}`);
        } catch {
          toast.error("Something went wrong");
        } finally {
          setIsLoading(false);
        }
      }

  const onClick = async () => {
        try {
          setIsLoading(true);
          
          if (isPublished) {
            await fetch(`/api/courses/${courseId}/chapter/${chapterId}/unpublish` , 
    {
        method : 'PATCH' ,  
        headers : {'Content-type' : 'application/json'} , 
    })
            toast.success("Chapter unpublished");
          } else {
            await fetch(`/api/courses/${courseId}/chapter/${chapterId}/publish` , 
    {
        method : 'PATCH' ,  
        headers : {'Content-type' : 'application/json'} , 
    });
            toast.success("Chapter published");
          }
    
          router.refresh();
        } catch {
          toast.error("Something went wrong");
        } finally {
          setIsLoading(false);
        }
      }

      if(!isMounted) {
        return null 
      }
    return (
        <div className="flex items-center gap-x-2">
          <Button
            onClick={onClick}
            disabled={disabled}
            variant="outline"
            size="sm"
          >
            {isPublished ? "Unpublish" : "Publish"}
          </Button>
          <ConfirmModal onConfirm={onDelete}>
            <Button size="sm" >
              <Trash className="h-4 w-4" />
            </Button>
          </ConfirmModal>
        </div>
      )
  }  