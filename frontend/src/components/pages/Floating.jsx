"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FloatingIcon() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        className={`flex items-center justify-center bg-purple-600 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl ${
          isHovered ? "w-48 h-12" : "w-12 h-12"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <>
            <Calendar className="w-5 h-5" />
            <span className="font-medium whitespace-nowrap">
              Schedule a meeting
            </span>
          </>
        ) : (
          <Calendar className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
}
