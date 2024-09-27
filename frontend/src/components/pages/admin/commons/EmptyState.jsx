import React from "react";
import { Plus } from "lucide-react";
export default function EmptyState({
  heading,
  subheading,
  buttonText,
  onClick,
  icon,
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full bg-white p-4">
      <div className="text-gray-400 mb-4">
        <div className="w-16 h-16 border-2 border-current rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">{heading}</h2>
      <p className="text-sm text-gray-500 mb-6 text-center">{subheading}</p>
      <button
        onClick={onClick}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
      >
        <span className="mr-2">
          <Plus />
        </span>
        {buttonText}
      </button>
    </div>
  );
}
