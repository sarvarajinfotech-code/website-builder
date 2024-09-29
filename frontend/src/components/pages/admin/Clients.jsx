"use client";

import React, { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Clients() {
  const [activeTab, setActiveTab] = useState("header");
  const [headerText, setHeaderText] = useState("");
  const [tagline, setTagline] = useState("");
  const [clientName, setClientName] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleHeaderSubmit = (e) => {
    e.preventDefault();
    console.log("Header submitted:", { headerText, tagline });
    // Add your header submission logic here
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Client submitted:", { clientName, logo: logoPreview });
    // Add your client submission logic here
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-3xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="header">Client Header</TabsTrigger>
          <TabsTrigger value="client">Add Client</TabsTrigger>
        </TabsList>
        <TabsContent value="header" className="mt-6">
          {" "}
          <form
            onSubmit={handleHeaderSubmit}
            className="space-y-6 max-w-md mx-auto"
          >
            <div>
              <Label htmlFor="headerText">Header Text</Label>
              <Input
                id="headerText"
                value={headerText}
                onChange={(e) => setHeaderText(e.target.value)}
                placeholder="Enter header text"
              />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Enter tagline"
              />
            </div>
            <Button type="submit" className="w-full">
              Save Header
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="client" className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
            <div className="space-y-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Enter client name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientLogo">Client Logo</Label>
              <Input
                id="clientLogo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
                ref={fileInputRef}
              />
              <Button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="w-full"
              >
                Select Logo
              </Button>
              <div className="mt-2 h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Client Logo Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <p className="text-gray-500">Select a logo to preview</p>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                onClick={() => console.log("Cancelled")}
                className="w-1/2"
              >
                Cancel
              </Button>

              <Button type="submit" className="w-1/2 ml-1">
                Add Client
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
