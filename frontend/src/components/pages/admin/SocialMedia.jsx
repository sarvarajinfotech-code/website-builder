"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  //   Pinterest,
} from "lucide-react";

export default function SocialMedia() {
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [youtube, setYoutube] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const socialLinks = {
      facebook,
      twitter,
      instagram,
      linkedin,
      youtube,
    };
    console.log("Social Media Links:", socialLinks);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <Label htmlFor="facebook" className="flex items-center space-x-2">
            <Facebook className="w-5 h-5" />
            <span>Facebook</span>
          </Label>
          <Input
            id="facebook"
            value={facebook}
            onChange={(e) => setFacebook(e.target.value)}
            placeholder="Enter your Facebook profile link"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="twitter" className="flex items-center space-x-2">
            <Twitter className="w-5 h-5" />
            <span>Twitter</span>
          </Label>
          <Input
            id="twitter"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            placeholder="Enter your Twitter profile link"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="instagram" className="flex items-center space-x-2">
            <Instagram className="w-5 h-5" />
            <span>Instagram</span>
          </Label>
          <Input
            id="instagram"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="Enter your Instagram profile link"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center space-x-2">
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </Label>
          <Input
            id="linkedin"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="Enter your LinkedIn profile link"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="youtube" className="flex items-center space-x-2">
            <Youtube className="w-5 h-5" />
            <span>YouTube</span>
          </Label>
          <Input
            id="youtube"
            value={youtube}
            onChange={(e) => setYoutube(e.target.value)}
            placeholder="Enter your YouTube channel link"
          />
        </div>

        <Button type="submit" className="w-full mt-6">
          Save Social Media Links
        </Button>
      </form>
    </div>
  );
}
