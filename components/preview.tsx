"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
};

export const Preview = ({
  value,
}: PreviewProps) => {
  const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), { ssr: false }), []);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if(!isMounted) {
    return null
  }

  return (
    <ReactQuill
      theme="bubble"
      value={value}
      readOnly
    />
  );
};