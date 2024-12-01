"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import Axios from "@/app/utils/axiosInstance";
import { URL } from "@/app/constants/apiEndpoints";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  userId: z.string(),
});

const CreatePage = () => {
  const loggedInUserData = useSelector((state: RootState) => state.user.user);
  const userId = loggedInUserData?.id;
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      userId: loggedInUserData.id, // Add userId to default values
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await Axios.post(URL.CREATE_COURSE, {
        ...values,
        userId,
      });
      console.log(response, "respppp");
      router.push(`/teacher/courses/${response.data.id}`);
      toast.success("Course created");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name your course</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course? Don&apos;t worry, you can
          change this later.
        </p>
        {/* <Form {...form}> */}
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-8">
          <div>
            <label htmlFor="title">Course title</label>
            {/* <input
              id="title"
              disabled={isSubmitting}
              placeholder="e.g. 'Advanced web development'"
              {...form.register("title")}
              className="input"
            /> */}
            <div className="input-container">
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border rounded-2xl ms-4 mb-4 input focus:outline-none focus:border-none border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g. 'Advanced web development'"
                {...form.register("title")}
                required
              />

              {/* <input
                id="title"
                disabled={isSubmitting}
                placeholder="e.g. 'Advanced web development'"
                className=" input-new"
                {...form.register("title")}
              /> */}
            </div>

            <p className="form-description">
              What will you teach in this course?
            </p>
          </div>

          <div className="flex items-center gap-x-2">
            <Link href="/">
              <button type="button" className="btn-ghost">
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="btn-animation"
            >
              Continue
            </button>
          </div>
        </form>

        {/* </Form> */}
      </div>
    </div>
  );
};

export default CreatePage;
