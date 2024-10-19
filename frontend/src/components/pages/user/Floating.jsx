import React from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PopupButton, useCalendlyEventListener } from "react-calendly";

export default function FloatingIcon() {
  useCalendlyEventListener({
    onEventScheduled: (e) => console.log(e.data.payload),
  });
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
