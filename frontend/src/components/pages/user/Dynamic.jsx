import api from "@/utility/api";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Dynamic() {
  const [contentHeader, setContentHeader] = useState("");
  const [content, setContent] = useState("");
  const [pageNotFound, setPageNotFound] = useState(false);
  const { pageName } = useParams();

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await api.getPageByName(pageName);
        if (response) {
          setContentHeader(response.CONTENT_HEADER);
          setContent(response.CONTENT);
          setPageNotFound(false);
        } else {
          setPageNotFound(true);
        }
      } catch (error) {
        setPageNotFound(true);
      }
    }
    fetchContent();
  }, [pageName]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full py-16 space-y-8 text-center">
        {pageNotFound ? (
          <div class="text-center">
            <p class="text-base font-semibold text-indigo-600">404</p>
            <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Page not found
            </h1>
            <p class="mt-6 text-base leading-7 text-gray-600">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              {contentHeader}
            </h1>
            <div className="mt-6 text-xl text-gray-700 dark:text-gray-300 space-y-6">
              <div
                className="mt-6 text-xl text-gray-700 dark:text-gray-300 space-y-6"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
