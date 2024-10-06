import { X } from "lucide-react";

export default function VideoPopover({ isOpen, onClose, videoUrl }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={videoUrl}
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full"
            style={{ height: "75vh" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
