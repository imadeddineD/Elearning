"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import ChapterList from "./ChapterList";


const formSchema = z.object({
  title: z.string().min(1, {
    message: "Description is required",
  }),
});

export const ChapterForm = ({
  initialData,
  courseId 
} : any) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreating , setIsCreating] = useState(false)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleCreating = () => setIsCreating((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  let position  = initialData.length + 1

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const title = values.title
    try {
      await fetch(`/api/courses/${courseId}/chapter`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({title , position} )
      })
      toast.success("Chapter created");
      toggleCreating();
      router.refresh()
    } catch {
      toast.error("Something went wrong");
    }
  }
 
  // const onReorder = async (updateData: { _id: string; position: number }[]) => {
  //   try {
  //     setIsUpdating(true);

  //     const response = await fetch(`/api/courses/${courseId}/chapters/reorder`, {
  //       method: 'PUT',
  //       headers: { 'Content-type': 'application/json' },
  //       body: JSON.stringify({
  //         list: updateData
  //       } )
  //     })
  //     const res = await response.json()
  //     console.log(res)
  //     toast.success("Chapters reordered");
  //     router.refresh();
  //   } catch {
  //     toast.error("Something went wrong");
  //   } finally {
  //     setIsUpdating(false);
  //   }
  // }

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  }
  

  if (!isMounted) {
    return null;
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      {/* {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )} */}
      <div className="font-medium flex items-center justify-between">
        Course chapter
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add chapter
            </>
          )}
        </Button>
      </div>
      
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction To Course ...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      )}
      <div className={cn(
          "text-sm mt-2",
          !initialData.length && "text-slate-500 italic"
        )}>
          {!initialData.length && "No chapters"} 
          <ChapterList
            onEdit={onEdit}
            onReorder={() => {}}
            items={initialData || []}
          />
      </div>
    </div>
  )
}