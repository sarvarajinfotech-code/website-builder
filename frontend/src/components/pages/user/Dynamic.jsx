import api from "@/utility/api";
import React, { useEffect, useState } from "react";

export default function Dynamic() {
  const [contentHeader, setContentHeader] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function fetchContent() {
      const response = await api.getPageDetails();
      if (response.length > 0) {
        setContentHeader(response[0].CONTENT_HEADER);
        setContent(response[0].CONTENT);
      } else {
        setContentHeader("");
        setContent("");
      }
    }
    fetchContent();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full py-16 space-y-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          {contentHeader}
        </h1>
        <div className="mt-6 text-xl text-gray-700 dark:text-gray-300 space-y-6">
          <div
            className="mt-6 text-xl text-gray-700 dark:text-gray-300 space-y-6"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
}
