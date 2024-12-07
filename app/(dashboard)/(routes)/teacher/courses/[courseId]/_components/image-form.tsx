"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/file-upload";
import { URL as API_URL } from "@/app/constants/apiEndpoints";
import Axios from "@/app/utils/axiosInstance";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const isNest = process.env.NEXT_PUBLIC_API_BACKEND === "true";
  const [isEditing, setIsEditing] = useState(false);
  // const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialData?.imageUrl || null
  ); // Set initial preview to existing image if available
  const toggleEdit = () => {
    setIsEditing((current) => !current);
    if (isEditing) {
      setPreviewImage(initialData?.imageUrl || null); // Reset to initial value when canceling
    }
  };

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // await axios.patch(`${API_URL.UPDATE_COURSE + courseId}`, values);
      toast.success("Course updated");
      // console.log(values, "vvallu");
      // if (isNest) {
      //   setPreviewImage(
      //     process.env.NEXT_PUBLIC_API_BASE_URL_NEST + values.imageUrl
      //   );
      // }
      // // else {
      //   setPreviewImage(values.imageUrl);
      // }
      toggleEdit();
      // router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };
  // const handleFileChange = async (file: File) => {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0]; // Get the first file
      const fileURL = URL.createObjectURL(file);
      console.log(fileURL, "filee");
      setPreviewImage(fileURL);
      const formData = new FormData();
      formData.append("file", file);

      try {
        // Upload the file
        const response = await Axios.post(
          `${API_URL.UPDATE_COURSE + courseId + API_URL.UPLOAD}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data.url, "response.data.urlresponse.data.url");
        setPreviewImage(response.data.url);

        if (response.data.url) {
          onSubmit({ imageUrl: response.data.url });
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("File upload failed");
      }
    } else {
      setPreviewImage(null);
    }
  };
  // console.log(initialData.imageUrl, "initialData.imageUrlinitialData.imageUrl");

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              height={100}
              width={100}
              className="object-cover rounded-md"
              src={`${
                previewImage
                  ? previewImage // Use preview image if available
                  : isNest
                  ? process.env.NEXT_PUBLIC_API_BASE_URL_NEST +
                    initialData.imageUrl // Use backend URL if in NestJS environment
                  : previewImage // Fallback to the original image URL
              }?t=${Date.now()}`} // Append timestamp to URL

              // src={`${
              //   previewImage || isNest
              //     ? process.env.NEXT_PUBLIC_API_BASE_URL_NEST +
              //       initialData.imageUrl
              //     : initialData.imageUrl
              // }?t=${Date.now()}`} // Append timestamp to URL
            />
          </div>
        ))}
      {isEditing && (
        <div>
          {/* <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          /> */}
          <input
            type="file"
            accept="image/*" // Only allow image files
            onChange={handleFileChange}
          />

          <div className="text-xs text-muted-foreground mt-4">
            16:9 aspect ratio recommended
          </div>
        </div>
      )}
    </div>
  );
};
