import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PopupButton, useCalendlyEventListener } from "react-calendly";
import api from "@/utility/api";

export default function FloatingIcon() {
  const [showMeeting, setShowMeeting] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  useCalendlyEventListener({
    onEventScheduled: (e) => console.log(e.data.payload),
  });
  useEffect(() => {
    api
      .getMeetingDetails()
      .then((resposne) => {
        if (resposne.length > 0) {
          setShowMeeting(resposne[0].SHOW_MEETING);
          setButtonText(resposne[0].BUTTON_TEXT);
          setMeetingLink(resposne[0].MEETING_LINK);
        }
      })
      .catch(() => {});
  }, []);
  return (
    <>
      {showMeeting && (
        <div className="fixed bottom-4 right-4 z-30">
          <PopupButton
            url={meetingLink}
            text={
              <Button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full">
                <Calendar className="w-5 h-5" />
                <span className="font-medium font-semibold">{buttonText}</span>
              </Button>
            }
            rootElement={document.getElementById("root")}
          />
        </div>
      )}
    </>
  );
}
