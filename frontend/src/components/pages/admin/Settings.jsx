"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import api from "@/utility/admin/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsTabs() {
  const faviconInputRef = useRef(null);

  const [activeTab, setActiveTab] = useState("favicon");
  const [faviconPreview, setFaviconPreview] = useState(null);
  const [title, setTitle] = useState("");
  const [favId, setFavId] = useState(null);
  const [faviconImage, setFaviconImage] = useState(null);
  const [favButtonText, setFavButtonText] = useState("Update Favicon Settings");
  const [emailSettings, setEmailSettings] = useState({
    from: "",
    to: "",
    smtpHost: "",
    smtpPort: "",
    smtpUsername: "",
    smtpPassword: "",
  });
  const [emailSettingsId, setEmailSettingsId] = useState(null);
  const [emailSettingsButtonText, setEmailSettingsButtonText] = useState(
    "Save Email Settings"
  );
  const [bannerSettings, setBannerSettings] = useState({
    text: "",
    buttonText: "",
    buttonLink: "",
  });
  const [bannerID, setBannerID] = useState(null);
  const [bannerButtonText, setBannerButtonText] = useState(
    "Save Banner Settings"
  );
  const [colors, setColors] = useState(["#ffffff", "#ffffff", "#ffffff"]);
  const [colorsButtonText, setColorsButtonText] =
    useState("Save Color Palette");
  const [colorsID, setColorsId] = useState(null);

  const handleColorChange = (index, color) => {
    const newColors = [...colors];
    newColors[index] = color;
    setColors(newColors);
  };

  const handleFaviconChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFaviconImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFaviconPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconSubmit = async (e) => {
    e.preventDefault();
    if (title === "") {
      alert("enter the title");
      return;
    } else if (!faviconPreview) {
      alert("please select a image");
    } else {
      let formdata = new FormData();
      formdata.set("title", title);
      formdata.set("file", faviconImage);

      if (favButtonText === "Save Favicon Settings") {
        const response = await api.saveFaviconSettings(formdata);
        console.log(response);
      } else if (favButtonText === "Update Favicon Settings") {
        const response = await api.updateFaviconSettings(formdata, favId);
        console.log(response);
      }
    }
  };

  const handleEmailChange = async (e) => {
    const { name, value } = e.target;
    setEmailSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      from_mail: emailSettings.from,
      to_mail: emailSettings.to,
      smtp_host: emailSettings.smtpHost,
      smtp_port: emailSettings.smtpPort,
      smtp_username: emailSettings.smtpUsername,
      smtp_password: emailSettings.smtpPassword,
    };
    if (emailSettingsButtonText === "Save Email Settings") {
      const response = await api.saveEmailSettings(payload);
      console.log(response);
    } else if (emailSettingsButtonText === "Update Email Settings") {
      const response = await api.updateEmailSettings(payload, emailSettingsId);
      console.log(response);
    }
  };

  const handleBannerChange = (e) => {
    const { name, value } = e.target;
    setBannerSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleBannerSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      banner_text: bannerSettings.text,
      banner_button_text: bannerSettings.buttonText,
      button_link: bannerSettings.buttonLink,
    };
    if (bannerButtonText === "Save Banner Settings") {
      const response = await api.saveBannerSettings(payload);
      console.log(response);
    } else if (bannerButtonText === "Update Banner Settings") {
      const response = await api.updateBannerSettings(payload, bannerID);
      console.log(response);
    }
  };

  const handleColorThemeSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      color1: colors[0],
      color2: colors[1],
      color3: colors[2],
    };

    if (colorsButtonText === "Save Color Palette") {
      const response = await api.saveColorsSettings(payload);
      console.log(response);
    } else if (colorsButtonText === "Update Color Palette") {
      const response = await api.updateColorsSettings(payload, colorsID);
      console.log(response);
    }
  };

  useEffect(() => {
    async function fetchFaviconDetails() {
      const faviconDetails = await api.getFaviconDetails();
      if (faviconDetails.length > 0) {
        const image = await api.getImage(faviconDetails[0].FAVICON_PATH);
        setTitle(faviconDetails[0].TITLE);
        setFaviconPreview(faviconDetails[0].FAVICON_PATH);
        setFaviconImage(image);
        setFavId(faviconDetails[0].ID);
        setFavButtonText("Update Favicon Settings");
      } else {
        setFavButtonText("Save Favicon Settings");
      }
    }

    async function fetchEmailSettings() {
      const emailSettings = await api.getEmailSettingsDetails();
      if (emailSettings.length > 0) {
        setEmailSettings({
          from: emailSettings[0].FROM_MAIL,
          to: emailSettings[0].TO_MAIL,
          smtpHost: emailSettings[0].SMTP_HOST,
          smtpPort: emailSettings[0].SMTP_PORT,
          smtpUsername: emailSettings[0].SMTP_USERNAME,
          smtpPassword: emailSettings[0].SMTP_PASSWORD,
        });
        setEmailSettingsId(emailSettings[0].ID);
        setEmailSettingsButtonText("Update Email Settings");
      } else {
        setEmailSettingsButtonText("Save Email Settings");
      }
    }

    async function fetchBannerSettings() {
      const bannerSettings = await api.getBannerSettingsDetails();
      if (bannerSettings.length > 0) {
        setBannerSettings({
          text: bannerSettings[0].BANNER_TEXT,
          buttonText: bannerSettings[0].BANNER_BUTTON_TEXT,
          buttonLink: bannerSettings[0].BUTTON_LINK,
        });
        setBannerID(bannerSettings[0].ID);
        setBannerButtonText("Update Banner Settings");
      } else {
        setBannerButtonText("Save Banner Settings");
      }
    }

    async function fetchColorsSettings() {
      const colorsSettings = await api.getColorsSettingsDetails();
      if (colorsSettings.length > 0) {
        setColors([
          colorsSettings[0].COLOR1,
          colorsSettings[0].COLOR2,
          colorsSettings[0].COLOR3,
        ]);
        setColorsId(colorsSettings[0].ID);
        setColorsButtonText("Update Color Palette");
      } else {
        setColorsButtonText("Save Color Palette");
      }
    }

    fetchFaviconDetails();
    fetchEmailSettings();
    fetchBannerSettings();
    fetchColorsSettings();
  }, []);

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
                required
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
              {favButtonText}
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {emailSettingsButtonText}
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
                required
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
                required
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
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {bannerButtonText}
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
              {colorsButtonText}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
