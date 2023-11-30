"use client";

// import axios from "axios";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import toast from "react-hot-toast";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`/api/courses/${courseId}/checkout` , 
      {
          method : 'POST' ,  
          headers : {'Content-type' : 'application/json'} , 
      })

      const res = await response.json()

      // console.log('this is the response from stripe : ')
      // console.log(res)

      window.location.assign(res.url);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  if(!isMounted) {
    return null 
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      Enroll for {formatPrice(price)}
    </Button>
  )
}