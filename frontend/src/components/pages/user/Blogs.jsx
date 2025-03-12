"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/utility/api";
import Constants from "@/utility/Constants";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

export default function BlogSection({ seo }) {
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [headerText, setHeaderText] = useState("");
  const [tagline, setTagline] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredPosts =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((post) => post.CATEGORY === selectedCategory);

  useEffect(() => {
    async function fetchBlogCategories() {
      const response = await api.getBlogCategoryDetails();
      if (response.length > 0) {
        setCategories([
          "All",
          ...response.map((category) => category.CATEGORY_NAME),
        ]);
      } else {
        setCategories(["All"]);
      }
    }
    async function fetchBlogDetails() {
      const response = await api.getBlogDetails();
      if (response.length > 0) {
        setBlogs(response);
      } else {
        setBlogs([]);
      }
    }
    async function fetchHeaderDetails() {
      const response = await api.getHeaderInfo(Constants.BLOGS);
      if (response.length > 0) {
        setHeaderText(response[0].HEADER_TEXT);
        setTagline(response[0].TAG_LINE);
      } else {
        setHeaderText("");
        setTagline("");
      }
    }
    fetchBlogCategories();
    fetchBlogDetails();
    fetchHeaderDetails();
  }, []);

  return (
    <>
      {seo && (
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <meta name="keywords" content={seo.keywords} />
        </Helmet>
      )}
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <a
              href="#"
              className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
            ></a>

            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {headerText}
              <p className="text-xl text-gray-500 dark:text-white">{tagline}</p>
            </h2>

            <div className="space-y-2">
              <label
                htmlFor="category-select"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Category
              </label>
              <Select
                onValueChange={setSelectedCategory}
                defaultValue={selectedCategory}
              >
                <SelectTrigger className="w-[180px] bg-white text-black border border-gray-300 dark:bg-gray-700 dark:text-white dark:border-gray-600">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-12 max-w-lg mx-auto grid gap-8 ">
            {filteredPosts.map((post) => (
              <div
                key={post.ID}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden dark:bg-gray-800"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover"
                    src={post.AUTHOR_IMAGE}
                    alt=""
                    width={384}
                    height={192}
                  />
                </div>
                <div className="flex-1 bg-white p-6 flex flex-col justify-between dark:bg-gray-800 dark:text-gray-300">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-purple-600">
                      {post.CATEGORY}
                    </p>
                    <a href="#" className="block mt-2">
                      <p className="text-xl font-semibold text-gray-900 dark:text-white">
                        {post.BLOG_NAME}
                      </p>
                      <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                        {post.BLOG_DESCRIPTION}
                      </p>
                    </a>
                  </div>
                  <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={post.AUTHOR_IMAGE}
                        alt=""
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-purple-600">
                        {post.AUTHOR_NAME}
                      </p>
                      <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
                        <time dateTime={post.CREATED_DATE}>
                          {new Date(post.CREATED_DATE).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
