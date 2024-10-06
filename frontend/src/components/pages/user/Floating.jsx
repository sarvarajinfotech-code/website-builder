import React from "react";
import { PopupButton } from "react-calendly";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FloatingIcon() {
  return (
    <div className="fixed bottom-4 right-4 z-30">
      <PopupButton
        url="https://calendly.com/babureddys003/30min"
        text={
          <Button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full">
            <Calendar className="w-5 h-5" />
            <span className="font-medium font-semibold">
              Schedule a meeting
            </span>
          </Button>
        }
        rootElement={document.getElementById("root")}
      />
    </div>
  );
}
