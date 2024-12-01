"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
};

export const Editor = ({
  onChange,
  value,
}: EditorProps) => {
  // // const ReactQuill = useMemo(() => dynamic(() => import("react-quill-new"), { ssr: false }), []);
  // const ReactQuill = dynamic(() => import("react-quill-new"), {
  //   ssr: false, // Disable SSR for this component
  // });
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill-new"), { ssr: false }), []);

  return (
    <div className="bg-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
