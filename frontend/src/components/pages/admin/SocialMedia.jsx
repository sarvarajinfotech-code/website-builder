"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SocialMedia() {
  const [mediaName, setMediaName] = useState("");
  const [mediaIcon, setMediaIcon] = useState("");
  const [mediaLink, setMediaLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mediaName && mediaIcon && mediaLink) {
      const socialMediaData = {
        name: mediaName,
        icon: mediaIcon,
        link: mediaLink,
      };
      console.log("Submitted Social Media Data:", socialMediaData);

      // Clear the input fields after submission
      setMediaName("");
      setMediaIcon("");
      setMediaLink("");
    } else {
      alert("Please fill out all fields.");
    }
  };

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
          />
        </div>

        {/* Save Button */}
        <Button type="submit" className="w-full mt-6">
          Save Social Media Link
        </Button>
      </form>
    </div>
  );
}
