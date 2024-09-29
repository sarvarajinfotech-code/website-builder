"use client";

import React, { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("favicon");
  const [faviconPreview, setFaviconPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [emailSettings, setEmailSettings] = useState({
    from: "",
    to: "",
    smtpHost: "",
    smtpPort: "",
    smtpUsername: "",
    smtpPassword: "",
  });
  const [bannerSettings, setBannerSettings] = useState({
    text: "",
    buttonText: "",
    buttonLink: "",
  });
  const handleColorChange = (index, color) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };
  const [colors, setColors] = useState(["#ffffff", "#ffffff", "#ffffff"]);
  const faviconInputRef = useRef(null);

  const handleFaviconChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFaviconPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconSubmit = (e) => {
    e.preventDefault();
    console.log("Favicon submitted:", { title, faviconPreview });
    // Add your favicon submission logic here
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log("Email settings submitted:", emailSettings);
    // Add your email settings submission logic here
  };

  const handleBannerChange = (e) => {
    const { name, value } = e.target;
    setBannerSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleBannerSubmit = (e) => {
    e.preventDefault();
    console.log("Banner settings submitted:", bannerSettings);
    // Add your banner settings submission logic here
  };

  const handleColorThemeSubmit = (e) => {
    e.preventDefault();
    console.log("Color palette submitted:", colors);
    // Add your color theme submission logic here
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-4xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="favicon">Favicon</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="banner">Banner</TabsTrigger>
          <TabsTrigger value="color-theme">Color Theme</TabsTrigger>
        </TabsList>
        <TabsContent value="favicon" className="mt-6">
          <form
            onSubmit={handleFaviconSubmit}
            className="space-y-6 max-w-md mx-auto"
          >
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
              />
            </div>
            <div>
              <Label htmlFor="faviconUpload">Favicon</Label>
              <Input
                id="faviconUpload"
                type="file"
                accept="image/*"
                onChange={handleFaviconChange}
                className="hidden"
                ref={faviconInputRef}
              />
              <Button
                type="button"
                onClick={() => faviconInputRef.current.click()}
                className="w-full"
              >
                Select Favicon
              </Button>
              <div className="mt-2 h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                {faviconPreview ? (
                  <img
                    src={faviconPreview}
                    alt="Favicon Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <p className="text-gray-500">Select a favicon to preview</p>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full">
              Save Favicon Settings
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="email" className="mt-6">
          <form
            onSubmit={handleEmailSubmit}
            className="space-y-6 max-w-md mx-auto"
          >
            <div>
              <Label htmlFor="from">From Email</Label>
              <Input
                id="from"
                name="from"
                value={emailSettings.from}
                onChange={handleEmailChange}
                placeholder="Enter from email"
              />
            </div>
            <div>
              <Label htmlFor="to">To Email</Label>
              <Input
                id="to"
                name="to"
                value={emailSettings.to}
                onChange={handleEmailChange}
                placeholder="Enter to email"
              />
            </div>
            <div>
              <Label htmlFor="smtpHost">SMTP Host</Label>
              <Input
                id="smtpHost"
                name="smtpHost"
                value={emailSettings.smtpHost}
                onChange={handleEmailChange}
                placeholder="Enter SMTP host"
              />
            </div>
            <div>
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input
                id="smtpPort"
                name="smtpPort"
                value={emailSettings.smtpPort}
                onChange={handleEmailChange}
                placeholder="Enter SMTP port"
              />
            </div>
            <div>
              <Label htmlFor="smtpUsername">SMTP Username</Label>
              <Input
                id="smtpUsername"
                name="smtpUsername"
                value={emailSettings.smtpUsername}
                onChange={handleEmailChange}
                placeholder="Enter SMTP username"
              />
            </div>
            <div>
              <Label htmlFor="smtpPassword">SMTP Password</Label>
              <Input
                id="smtpPassword"
                name="smtpPassword"
                type="password"
                value={emailSettings.smtpPassword}
                onChange={handleEmailChange}
                placeholder="Enter SMTP password"
              />
            </div>
            <Button type="submit" className="w-full">
              Save Email Settings
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="banner" className="mt-6">
          <form
            onSubmit={handleBannerSubmit}
            className="space-y-6 max-w-md mx-auto"
          >
            <div>
              <Label htmlFor="bannerText">Banner Text</Label>
              <Input
                id="bannerText"
                name="text"
                value={bannerSettings.text}
                onChange={handleBannerChange}
                placeholder="Enter banner text"
              />
            </div>
            <div>
              <Label htmlFor="bannerButtonText">Banner Button Text</Label>
              <Input
                id="bannerButtonText"
                name="buttonText"
                value={bannerSettings.buttonText}
                onChange={handleBannerChange}
                placeholder="Enter banner button text"
              />
            </div>
            <div>
              <Label htmlFor="bannerButtonLink">Banner Button Link</Label>
              <Input
                id="bannerButtonLink"
                name="buttonLink"
                value={bannerSettings.buttonLink}
                onChange={handleBannerChange}
                placeholder="Enter banner button link"
              />
            </div>
            <Button type="submit" className="w-full">
              Save Banner Settings
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="color-theme" className="mt-6">
          <form
            onSubmit={handleColorThemeSubmit}
            className="space-y-6 max-w-md mx-auto"
          >
            <div className="space-y-4">
              {colors.map((color, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Label htmlFor={`color-${index + 1}`} className="w-24">
                    Color {index + 1}
                  </Label>
                  <div className="flex-1 flex items-center space-x-2">
                    <Input
                      id={`color-${index + 1}`}
                      type="color"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="w-12 h-12 p-1 rounded-md"
                    />
                    <Input
                      type="text"
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="flex-1"
                      placeholder={`Enter color ${index + 1} hex code`}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Label className="w-24">Preview</Label>
              <div className="flex-1 h-12 rounded-md overflow-hidden">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    style={{ backgroundColor: color }}
                    className="w-1/3 h-full inline-block"
                  />
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full">
              Save Color Palette
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
