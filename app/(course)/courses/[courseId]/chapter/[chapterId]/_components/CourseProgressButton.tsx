"use client"
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CourseProgressButtonProps {
    chapterId: string;
    courseId: string;
    isCompleted?: boolean;
    nextChapterId?: string;
  };

 
  
  export const CourseProgressButton = ({
    chapterId,
    courseId,
    isCompleted,
    nextChapterId
  }: CourseProgressButtonProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const confetti = useConfettiStore()
    const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

    const onClick = async () => {
        try {
            
          setIsLoading(true);

          const res =   await fetch(`/api/courses/${courseId}/chapter/${chapterId}/progress`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({isCompleted: !isCompleted} )
              }) 
          
    
          if (!isCompleted && !nextChapterId) {
            confetti.onOpen();
          }
    
          if (!isCompleted && nextChapterId) {
            router.push(`/courses/${courseId}/chapter/${nextChapterId}`);
          }

          const response = await res.json()
          console.log("this is the response : ")
          console.log(response)
    
          toast.success("Progress updated");
          router.refresh();
        } catch {
          toast.error("Something went wrong");
        } finally {
          setIsLoading(false);
        }
      }



    const Icon = isCompleted ? XCircle : CheckCircle

    if(!isMounted) {
      return null 
    }
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      type="button"
      variant={isCompleted ? "outline" : "success"}
      className="w-full md:w-auto"
    >
      {isCompleted ? "Not completed" : "Mark as complete"}
      <Icon className="h-4 w-4 ml-2" />
    </Button>
  )
}

export default CourseProgressButton