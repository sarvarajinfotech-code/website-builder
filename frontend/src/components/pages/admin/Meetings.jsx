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
  const [showCalendly, setShowCalendly] = useState(false);
  const [calendlyLink, setCalendlyLink] = useState("");
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [showTawkto, setShowTawkto] = useState(false);
  const [tawktoPropertyId, setTawktoPropertyId] = useState("");
  const [pageButtonText, setPageButtonText] = useState("Save Meeting setup");
  const [meetingId, setMeetingId] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      show_calendly: showCalendly,
      calendly_link: calendlyLink,
      show_whatsapp: showWhatsapp,
      whatsapp_number: whatsappNumber,
      show_tawkto: showTawkto,
      tawkto_property_id: tawktoPropertyId,
      button_text: buttonText,
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
    api.getMeetingDetails().then((response) => {
      if (response.length > 0) {
        const data = response[0];
        setShowCalendly(data.SHOW_CALENDLY);
        setCalendlyLink(data.CALENDLY_LINK || "");
        setShowWhatsapp(data.SHOW_WHATSAPP);
        setWhatsappNumber(data.WHATSAPP_NUMBER || "");
        setShowTawkto(data.SHOW_TAWKTO);
        setTawktoPropertyId(data.TAWKTO_PROPERTY_ID || "");
        setButtonText(data.BUTTON_TEXT || "");
        setMeetingId(data.ID);
        setPageButtonText("Update Meeting setup");
      }
    });
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
        {/* Calendly */}
        <div className="flex items-center justify-between">
          <Label htmlFor="show-calendly">Show Calendly</Label>
          <Switch
            id="show-calendly"
            checked={showCalendly}
            onCheckedChange={setShowCalendly}
          />
        </div>
        {showCalendly && (
          <>
            <div className="space-y-2">
              <Label htmlFor="button-text">Button Text</Label>
              <Input
                id="button-text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calendly-link">Calendly Link</Label>
              <Input
                id="calendly-link"
                value={calendlyLink}
                onChange={(e) => setCalendlyLink(e.target.value)}
              />
            </div>
          </>
        )}
        {/* WhatsApp */}
        <div className="flex items-center justify-between">
          <Label htmlFor="show-whatsapp">Show WhatsApp</Label>
          <Switch
            id="show-whatsapp"
            checked={showWhatsapp}
            onCheckedChange={setShowWhatsapp}
          />
        </div>
        {showWhatsapp && (
          <div className="space-y-2">
            <Label htmlFor="whatsapp-number">WhatsApp Number</Label>
            <Input
              id="whatsapp-number"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
            />
          </div>
        )}
        {/* Tawk.to */}
        <div className="flex items-center justify-between">
          <Label htmlFor="show-tawkto">Show Tawk.to</Label>
          <Switch
            id="show-tawkto"
            checked={showTawkto}
            onCheckedChange={setShowTawkto}
          />
        </div>
        {showTawkto && (
          <div className="space-y-2">
            <Label htmlFor="tawkto-property-id">
              Tawk.to Property ID (PropertyId/WidgetID)
            </Label>
            <Input
              id="tawkto-property-id"
              value={tawktoPropertyId}
              onChange={(e) => setTawktoPropertyId(e.target.value)}
            />
          </div>
        )}
        <Button type="submit" className="w-full">
          {pageButtonText}
        </Button>
      </form>
    </div>
  );
}
