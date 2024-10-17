"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const blogPosts = [
  {
    id: 1,
    title: "Boost your conversion rate",
    excerpt:
      "Eget mi proin sed libero enim sed faucibus turpis. Nisl rhoncus mattis rhoncus urna neque viverra justo. Vivamus at augue eget arcu dictum varius duis at consectetur lorem.",
    date: "Mar 16, 2023",
    category: "Marketing",
    author: {
      name: "Michael Foster",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
  },
  {
    id: 2,
    title: "How to use search engine optimization to drive sales",
    excerpt:
      "Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Velit egestas dui id ornare arcu odio ut sem. Facilisi nullam vehicula ipsum a arcu cursus vitae congue.",
    date: "Mar 10, 2023",
    category: "SEO",
    author: {
      name: "Lindsey Walton",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
  },
  {
    id: 3,
    title: "Improve your customer experience",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    date: "Feb 12, 2023",
    category: "Customer Success",
    author: {
      name: "Tom Cook",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
  },
];

const categories = [
  "All",
  "Marketing",
  "SEO",
  "Customer Success",
  "Design",
  "Development",
];

export default function BlogSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <a
            href="#"
            className="flex items-center space-x-1 text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
          ></a>

          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            From the blog
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
              key={post.id}
              className="flex flex-col rounded-lg shadow-lg overflow-hidden dark:bg-gray-800"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-48 w-full object-cover"
                  src={post.image}
                  alt=""
                  width={384}
                  height={192}
                />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between dark:bg-gray-800 dark:text-gray-300">
                <div className="flex-1">
                  <p className="text-sm font-medium text-purple-600">
                    {post.category}
                  </p>
                  <a href="#" className="block mt-2">
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {post.title}
                    </p>
                    <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                      {post.excerpt}
                    </p>
                  </a>
                </div>
                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={post.author.avatar}
                      alt=""
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-purple-600">
                      {post.author.name}
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500 dark:text-gray-400">
                      <time dateTime={post.date}>{post.date}</time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
