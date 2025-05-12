"use client";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/utility/api";
import { CalendarIcon, Clock, User } from "lucide-react";

export default function Blog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Scroll to the top when the component is mounted
    window.scrollTo(0, 0);

    async function fetchBlogById() {
      try {
        setIsLoading(true);
        const response = await api.getBlogDetailsById(id);
        setBlog(response);
        setError(null);
      } catch (err) {
        setError("Failed to load blog post. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (id) {
      fetchBlogById();
    }
  }, [id]);

  // Calculate estimated reading time (assuming 200 words per minute)
  const calculateReadingTime = (text) => {
    const wordCount = text.replace(/<[^>]*>/g, "").split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);
    return readingTime === 1 ? "1 min read" : `${readingTime} mins read`;
  };

  if (isLoading) {
    return <BlogSkeleton />;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto my-12 px-4">
        <div className="border border-red-200 rounded-lg p-6">
          <div className="text-center text-red-500">
            <p className="text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return null;
  }

  // Assuming blog might have categories/tags
  const category = blog.CATEGORY;
  const readingTime = calculateReadingTime(blog.BLOG_DESCRIPTION);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          aria-label="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          <span>Back</span>
        </button>

        {/* Blog Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
              {category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            {blog.BLOG_NAME}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-sm text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{readingTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon size={16} />
              <time dateTime={blog.CREATED_DATE}>
                {new Date(blog.CREATED_DATE).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
        </div>

        {/* Blog Content Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            {/* Blog Content */}
            <article className="prose prose-lg dark:prose-invert max-w-none mb-10 text-gray-900 dark:text-gray-300">
              <div
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.BLOG_DESCRIPTION }}
              />
            </article>

            {/* Author Card */}
            <div className="mt-10 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center gap-4">
                <img
                  src={blog.AUTHOR_IMAGE || "/placeholder.svg"}
                  alt={blog.AUTHOR_NAME}
                  className="h-12 w-12 rounded-full border-2 border-white shadow"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-purple-600" />
                    <p className="font-medium text-purple-600">
                      {blog.AUTHOR_NAME}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Author
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function BlogSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
          <div className="h-12 w-full bg-gray-300 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
          <div className="h-12 w-3/4 bg-gray-300 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>
          <div className="flex gap-4 mb-6">
            <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="w-full aspect-video bg-gray-300 dark:bg-gray-700 animate-pulse"></div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>

            <div className="mt-10 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div>
                  <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
