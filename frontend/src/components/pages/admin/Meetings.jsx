import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, CheckCircle } from "lucide-react";
import api from "@/utility/api";
import { useToast } from "@/hooks/use-toast";

export default function Meetings() {
  const { toast } = useToast();

  const [showMeeting, setShowMeeting] = useState(false);
  const [buttonText, setButtonText] = useState("");
  const [calendlyLink, setCalendlyLink] = useState("");
  const [pageButtonText, setPageButtonText] = useState("Save Meeting setup");
  const [meetingId, setMeetingId] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      show_meeting: showMeeting,
      button_text: buttonText,
      meeting_link: calendlyLink,
    };
    if (pageButtonText === "Save Meeting setup") {
      await api
        .saveMeetingDetails(payload)
        .then((resposne) => {
          toast({
            title: (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Saved Meeting Details</span>
              </div>
            ),
          });
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: (
              <div className="flex items-center gap-2 text-white">
                <AlertCircle className="h-5 w-5" />
                <span>Error: Failed save meeting details, try again.</span>
              </div>
            ),
          });
        });
    } else {
      await api
        .updateMeetingsDetails(payload, meetingId)
        .then((resposne) => {
          toast({
            title: (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Updated Meeting Details</span>
              </div>
            ),
          });
        })
        .catch((error) => {
          toast({
            variant: "destructive",
            title: (
              <div className="flex items-center gap-2 text-white">
                <AlertCircle className="h-5 w-5" />
                <span>Error: Failed update meeting details, try again.</span>
              </div>
            ),
          });
        });
    }
  };
  useEffect(() => {
    api
      .getMeetingDetails()
      .then((resposne) => {
        if (resposne.length > 0) {
          setShowMeeting(resposne[0].SHOW_MEETING);
          setButtonText(resposne[0].BUTTON_TEXT);
          setCalendlyLink(resposne[0].MEETING_LINK);
          setMeetingId(resposne[0].ID);
          setPageButtonText("Update Meeting setup");
        }
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: (
            <div className="flex items-center gap-2 text-white">
              <AlertCircle className="h-5 w-5" />
              <span>Error: Failed load meeting details, try again.</span>
            </div>
          ),
        });
      });
  }, []);
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <Label
            htmlFor="show-meeting"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Show Meeting
          </Label>
          <Switch
            id="show-meeting"
            checked={showMeeting}
            onCheckedChange={setShowMeeting}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="button-text">Button Text</Label>
          <Input
            id="button-text"
            type="text"
            placeholder="Enter button text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="calendly-link">Calendly Link</Label>
          <Input
            id="calendly-link"
            type="url"
            placeholder="https://calendly.com/your-link"
            value={calendlyLink}
            onChange={(e) => setCalendlyLink(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          {pageButtonText}
        </Button>
      </form>
    </div>
  );
}
