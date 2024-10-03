"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/utility/admin/api";
import { CloudFog } from "lucide-react";

export default function SocialMedia() {
  const [mediaName, setMediaName] = useState("");
  const [mediaIcon, setMediaIcon] = useState("");
  const [mediaLink, setMediaLink] = useState("");
  const [mediaId, setMediaId] = useState(null);
  const [mediaButtonText, setMediaButtonText] = useState(
    "Save Social Media Link"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const socialMediaData = {
      media_name: mediaName,
      svg_icon: mediaIcon,
      link: mediaLink,
    };
    if (mediaButtonText === "Save Social Media Link") {
      const respone = await api.saveSocialMediaDetails(socialMediaData);
    } else if (mediaButtonText === "Update Social Media Link") {
      const resposne = await api.updateSocialMediaDetails(
        socialMediaData,
        mediaId
      );
      console.log(resposne);
    }
  };

  useEffect(() => {
    async function fetchMediaDetails() {
      const response = await api.getSocialMediaDetails();
      if (response.length > 0) {
        setMediaIcon(response[0].SVG_ICON);
        setMediaLink(response[0].LINK);
        setMediaName(response[0].MEDIA_NAME);
        setMediaId(response[0].ID);
        setMediaButtonText("Update Social Media Link");
      } else {
        setMediaButtonText("Save Social Media Link");
      }
    }

    fetchMediaDetails();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
        {/* Media Name Input */}
        <div className="space-y-2">
          <Label htmlFor="mediaName">Media Name</Label>
          <Input
            id="mediaName"
            value={mediaName}
            onChange={(e) => setMediaName(e.target.value)}
            placeholder="Enter social media name"
            required
          />
        </div>

        {/* Media SVG Icon Input */}
        <div className="space-y-2">
          <Label htmlFor="mediaIcon">Media SVG Icon</Label>
          <Input
            id="mediaIcon"
            value={mediaIcon}
            onChange={(e) => setMediaIcon(e.target.value)}
            placeholder="Enter SVG icon or icon URL"
            required
          />
        </div>

        {/* Media Link Input */}
        <div className="space-y-2">
          <Label htmlFor="mediaLink">Media Link</Label>
          <Input
            id="mediaLink"
            value={mediaLink}
            onChange={(e) => setMediaLink(e.target.value)}
            placeholder="Enter social media link"
            required
          />
        </div>

        {/* Save Button */}
        <Button type="submit" className="w-full mt-6">
          {mediaButtonText}
        </Button>
      </form>
    </div>
  );
}
