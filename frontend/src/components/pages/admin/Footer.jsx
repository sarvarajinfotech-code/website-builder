import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Footer() {
  const [activeTab, setActiveTab] = useState("header");
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [linkType, setLinkType] = useState("page");

  // Header form state
  const [tagline, setTagline] = useState("");
  const [newsletterHeader, setNewsletterHeader] = useState("");
  const [newsletterTagline, setNewsletterTagline] = useState("");
  const [copyrightText, setCopyrightText] = useState("");

  // Section form state
  const [sectionHeaders, setSectionHeaders] = useState([
    "About",
    "Services",
    "Contact",
  ]);
  const [selectedSectionHeader, setSelectedSectionHeader] = useState("");
  const [newSectionHeader, setNewSectionHeader] = useState("");
  const [optionName, setOptionName] = useState("");
  const [pageLink, setPageLink] = useState("");
  const [externalLink, setExternalLink] = useState("");

  const handleHeaderSubmit = (e) => {
    e.preventDefault();
    console.log("Header Form Data:", {
      tagline,
      showNewsletter,
      newsletterHeader,
      newsletterTagline,
      copyrightText,
    });
  };

  const handleSectionSubmit = (e) => {
    e.preventDefault();
    const sectionHeader =
      selectedSectionHeader === "new"
        ? newSectionHeader
        : selectedSectionHeader;
    console.log("Section Form Data:", {
      sectionHeader,
      optionName,
      link: linkType === "page" ? pageLink : externalLink,
    });

    // Add new section header to the list if it's a new one
    if (
      selectedSectionHeader === "new" &&
      newSectionHeader &&
      !sectionHeaders.includes(newSectionHeader)
    ) {
      setSectionHeaders([...sectionHeaders, newSectionHeader]);
    }

    // Reset form fields
    setSelectedSectionHeader("");
    setNewSectionHeader("");
    setOptionName("");
    setPageLink("");
    setExternalLink("");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-3xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="header">Footer Header</TabsTrigger>
          <TabsTrigger value="sections">Add Sections</TabsTrigger>
        </TabsList>
        <TabsContent value="header" className="mt-6">
          <form
            onSubmit={handleHeaderSubmit}
            className="space-y-6 max-w-md mx-auto"
          >
            <div className="space-y-2">
              <Label htmlFor="tagline">Tagline Text</Label>
              <Input
                id="tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Enter tagline text"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="showNewsletter"
                checked={showNewsletter}
                onCheckedChange={setShowNewsletter}
              />
              <Label htmlFor="showNewsletter">Show Newsletter</Label>
            </div>

            {showNewsletter && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="newsletterHeader">
                    Newsletter Header Text
                  </Label>
                  <Input
                    id="newsletterHeader"
                    value={newsletterHeader}
                    onChange={(e) => setNewsletterHeader(e.target.value)}
                    placeholder="Enter newsletter header text"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newsletterTagline">
                    Newsletter Tagline Text
                  </Label>
                  <Input
                    id="newsletterTagline"
                    value={newsletterTagline}
                    onChange={(e) => setNewsletterTagline(e.target.value)}
                    placeholder="Enter newsletter tagline text"
                  />
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="copyrightText">Copyright Text</Label>
              <Input
                id="copyrightText"
                value={copyrightText}
                onChange={(e) => setCopyrightText(e.target.value)}
                placeholder="Enter copyright text"
              />
            </div>

            <Button type="submit" className="w-full">
              Save Header
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="sections" className="mt-6">
          <form
            onSubmit={handleSectionSubmit}
            className="space-y-6 max-w-md mx-auto"
          >
            <div className="space-y-2">
              <Label htmlFor="sectionHeader">Section Header</Label>
              <Select
                value={selectedSectionHeader}
                onValueChange={setSelectedSectionHeader}
              >
                <SelectTrigger id="sectionHeader">
                  <SelectValue placeholder="Select or create a section header" />
                </SelectTrigger>
                <SelectContent>
                  {sectionHeaders.map((header) => (
                    <SelectItem key={header} value={header}>
                      {header}
                    </SelectItem>
                  ))}
                  <SelectItem value="new">Create New Section Header</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedSectionHeader === "new" && (
              <div className="space-y-2">
                <Label htmlFor="newSectionHeader">
                  New Section Header Name
                </Label>
                <Input
                  id="newSectionHeader"
                  value={newSectionHeader}
                  onChange={(e) => setNewSectionHeader(e.target.value)}
                  placeholder="Enter new section header name"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="optionName">Section Option Name</Label>
              <Input
                id="optionName"
                value={optionName}
                onChange={(e) => setOptionName(e.target.value)}
                placeholder="Enter section option name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="linkType">Link Type</Label>
              <Select value={linkType} onValueChange={setLinkType}>
                <SelectTrigger id="linkType">
                  <SelectValue placeholder="Select link type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="page">Existing Page</SelectItem>
                  <SelectItem value="external">External Link</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {linkType === "page" ? (
              <div className="space-y-2">
                <Label htmlFor="pageLink">Select Page</Label>
                <Select value={pageLink} onValueChange={setPageLink}>
                  <SelectTrigger id="pageLink">
                    <SelectValue placeholder="Select a page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home</SelectItem>
                    <SelectItem value="about">About</SelectItem>
                    <SelectItem value="contact">Contact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="externalLink">External Link</Label>
                <Input
                  id="externalLink"
                  value={externalLink}
                  onChange={(e) => setExternalLink(e.target.value)}
                  placeholder="Enter external link"
                />
              </div>
            )}

            <Button type="submit" className="w-full">
              Add Section
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
