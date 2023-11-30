"use client";

import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import ReactPlayer from "react-player";
// import { useConfettiStore } from "@/hooks/use-confetti-store";

interface Chapterr {
    _id : String , 
    title: String, 
    courseId : String , 
    description: String,
    video: string,
    position:Number,
    isPublished : Boolean ,  
    isFree : Boolean ,  
  }

interface VideoPlayerProps {
  playbackId: string;
  courseId: string;
  chapterId: Chapterr;
  nextChapterId?: string;
  isLocked: Boolean;
  completeOnEnd: boolean;
  title: string;
};

export const VideoPlayer = ({
//   courseId,
  chapterId,
//   nextChapterId,
  isLocked,
//   completeOnEnd,
//   title,
}: VideoPlayerProps) => {
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

//   const confetti = useConfettiStore();

//   const onEnd = async () => {
//     try {
//       if (completeOnEnd) {
//         await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
//           isCompleted: true,
//         });

//         if (!nextChapterId) {
//           confetti.onOpen();
//         }

//         toast.success("Progress updated");
//         router.refresh();

//         if (nextChapterId) {
//           router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
//         }
//       }
//     } catch {
//       toast.error("Something went wrong");
//     }
//   }


if (!isMounted) {
    return null;
  }
  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className="h-8 w-8 animate-spin text-secondary" />
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary">
          <Lock className="h-8 w-8" />
          <p className="text-sm">
            This chapter is locked
          </p>
        </div>
      )}
      {/* {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(
            !isReady && "hidden"
          )}
          onCanPlay={() => setIsReady(true)}
          onEnded={onEnd}
          autoPlay
          playbackId={playbackId}
        />
      )} */}
      {!isLocked && 
      <div className="relative aspect-video mt-2">
            <ReactPlayer
                controls={true}
                width="100"
                height="80"
                url={chapterId.video}
                onPlay={() => setIsReady(true)}
            /> 
        </div>}
    </div>
  )
}