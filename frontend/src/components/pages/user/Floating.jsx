import React, { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PopupButton, useCalendlyEventListener } from "react-calendly";
import api from "@/utility/api";

export default function FloatingIcon() {
  const [meeting, setMeeting] = useState({});

  useCalendlyEventListener({
    onEventScheduled: (e) => console.log(e.data.payload),
  });

  useEffect(() => {
    api.getMeetingDetails().then((response) => {
      if (response.length > 0) setMeeting(response[0]);
    });
  }, []);

  // Auto-inject Tawk.to script if enabled
  useEffect(() => {
    if (
      meeting.SHOW_TAWKTO &&
      meeting.TAWKTO_PROPERTY_ID &&
      !document.getElementById("tawkto-script")
    ) {
      const script = document.createElement("script");
      script.id = "tawkto-script";
      script.async = true;
      script.src = `https://embed.tawk.to/${meeting.TAWKTO_PROPERTY_ID}`;
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");
      document.body.appendChild(script);
    }
  }, [meeting]);

  // Optional: Cleanup on unmount
  useEffect(() => {
    return () => {
      const existingScript = document.getElementById("tawkto-script");
      if (existingScript) {
        existingScript.remove();
      }
      delete window.Tawk_API;
    };
  }, []);

  return (
    <div
      className={`fixed ${
        meeting.SHOW_TAWKTO ? "bottom-24" : "bottom-8"
      } right-6  z-40 flex flex-col items-end gap-3`}
    >
      {/* Calendly Icon Button */}
      {meeting.SHOW_CALENDLY && meeting.CALENDLY_LINK && (
        <div className="w-16 h-16 rounded-full shadow-md bg-purple-600 hover:bg-purple-700 transition-colors flex items-center justify-center cursor-pointer">
          <PopupButton
            url={meeting.CALENDLY_LINK}
            rootElement={document.getElementById("root")}
            text={<Calendar className="w-8 h-8 text-white" />}
          />
        </div>
      )}

      {/* WhatsApp Icon Button */}
      {meeting.SHOW_WHATSAPP && meeting.WHATSAPP_NUMBER && (
        <a
          href={`https://wa.me/${meeting.WHATSAPP_NUMBER.replace(
            /[^0-9]/g,
            ""
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 rounded-full shadow-md bg-green-600 hover:bg-green-700 transition-colors flex items-center justify-center"
        >
          {/* Inline SVG for WhatsApp */}
          <svg
            className="w10 h-10 text-white"
            viewBox="0 0 32 32"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.58 2.236 6.364L4 29l7.01-2.183C12.99 27.606 14.47 28 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.38 0-2.73-.27-4-.8l-.285-.12-4.17 1.3 1.3-4.17-.12-.285C6.27 17.73 6 16.38 6 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.07-7.75c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.36.99 2.68 1.13 2.87.14.18 1.95 2.98 4.73 4.06.66.28 1.18.45 1.58.58.66.21 1.26.18 1.74.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z" />
          </svg>
        </a>
      )}
    </div>
  );
}
