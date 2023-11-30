"use client"

import { ConfirmModal } from "@/components/modals/confirmmodal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ActionsProps {
    disabled: boolean;
    courseId: string;
    isPublished: boolean;
  };
  
  export const Actions = ({
    disabled,
    courseId,
    isPublished
  }: ActionsProps) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const confetti = useConfettiStore()
    const [isMounted , setIsMounted] = useState(false)

    useEffect(() => {
      setIsMounted(true)
    } , [])
    if (!isMounted) {
      return null;
    }

    const onDelete = async () => {
        try {
          setIsLoading(true);

          const res = await fetch(`/api/courses/${courseId}`, {
            method: "DELETE",
          });
          const response = await res.json()
          console.log(response);
          router.refresh();
          router.push(`/teacher/courses`);
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
            await fetch(`/api/courses/${courseId}/unpublish` , 
    {
        method : 'PATCH' ,  
        headers : {'Content-type' : 'application/json'} , 
    })
            toast.success("Course unpublished");
          } else {
            await fetch(`/api/courses/${courseId}/publish` , 
    {
        method : 'PATCH' ,  
        headers : {'Content-type' : 'application/json'} , 
    });
            toast.success("Course published");
            confetti.onOpen()
          }
    
          router.refresh();
        } catch {
          toast.error("Something went wrong");
        } finally {
          setIsLoading(false);
        }
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