"use client";

import toast from "react-hot-toast";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { UploadButton, UploadDropzone } from "@uploadthing/react";

// Define your file router type
type FileRouterType = typeof ourFileRouter;

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof FileRouterType; // Ensure this is the correct type for your router
}

export const FileUpload = ({
  onChange,
  endpoint
}: FileUploadProps) => {
  return (
    <UploadDropzone<FileRouterType, typeof endpoint> // Specify the generic types
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        console.log(res,"ressssssss9393939")
        onChange(res?.[0]?.url); // Ensure to safely access the URL
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
  );
}

// "use client";

// import toast from "react-hot-toast";

// // import { UploadDropzone } from "@/lib/uploadthing";
// import { ourFileRouter } from "@/app/api/uploadthing/core";
// import { UploadButton, UploadDropzone } from "@uploadthing/react";

// interface FileUploadProps {
//   onChange: (url?: string) => void;
//   endpoint: keyof typeof ourFileRouter;
// };

// export const FileUpload = ({
//   onChange,
//   endpoint
// }: FileUploadProps) => {
//   return (
//     <UploadDropzone
//       endpoint={endpoint}
//       onClientUploadComplete={(res) => {
//         onChange(res?.[0].url);
//       }}
//       onUploadError={(error: Error) => {
//         toast.error(`${error?.message}`);
//       }}
//     />
//   )
// }