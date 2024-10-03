import React, { useEffect, useState } from "react";
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
import api from "@/utility/admin/api";
import EmptyState from "./commons/EmptyState";
import { FolderPlus, Plus, ArrowUpDown, MoreHorizontal } from "lucide-react";
import { DataTable } from "./commons/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Footer() {
  const [activeTab, setActiveTab] = useState("header");
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [linkType, setLinkType] = useState("page");

  // Header form state
  const [tagline, setTagline] = useState("");
  const [newsletterHeader, setNewsletterHeader] = useState("");
  const [newsletterTagline, setNewsletterTagline] = useState("");
  const [copyrightText, setCopyrightText] = useState("");
  const [headerButtonText, setHeaderButtonText] = useState("Save Header");
  const [headerId, setHeaderId] = useState(null);

  // Section form state
  const [sectionHeaders, setSectionHeaders] = useState([]);
  const [selectedSectionHeader, setSelectedSectionHeader] = useState("");
  const [newSectionHeader, setNewSectionHeader] = useState("");
  const [optionName, setOptionName] = useState("");
  const [pageLink, setPageLink] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [sectionId, setSectionId] = useState(null);
  const [sectionList, setSectionList] = useState([]);
  const [sectionButtonText, setSectionButtonText] = useState("Add Section");

  const handleHeaderSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      tagline: tagline,
      show_newsletter: showNewsletter,
      newsletter_header_text: showNewsletter ? newsletterHeader : "",
      newsletter_tagline: showNewsletter ? newsletterTagline : "",
      copyright_text: copyrightText,
    };
    if (headerButtonText === "Save Header") {
      const response = await api.saveFooterHeaderInfo(payload);
      console.log(response);
    } else if (headerButtonText === "Update Header") {
      const response = await api.updateFooterHeaderInfo(payload, headerId);
    }
  };

  const columns = [
    {
      accessorKey: "SECTION_HEADER",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Section Header
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "SECTION_ITEM_NAME",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Section item name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "LINK_TYPE",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Link Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "LINK",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Link
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleSectionEdit(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSectionDelete(row.original.ID)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleSectionSubmit = async (e) => {
    e.preventDefault();
    const sectionHeader =
      selectedSectionHeader === "new"
        ? newSectionHeader
        : selectedSectionHeader;

    // // Reset form fields
    // setSelectedSectionHeader("");
    // setNewSectionHeader("");
    // setOptionName("");
    // setPageLink("");
    // setExternalLink("");

    let payload = {
      section_header: sectionHeader,
      section_item_name: optionName,
      link_type: linkType,
      link: linkType === "page" ? pageLink : externalLink,
    };
    if (sectionButtonText === "Add Section") {
      console.log("came to if");
      const response = await api.saveFooterSectionInfo(payload);
      console.log(response);
    } else if (sectionButtonText === "Update Section") {
      const response = await api.updateFooterSectionInfo(payload, sectionId);
      console.log(response);
    }
    reloadPage();
    setShowForm(false);
  };

  const handleSectionEdit = async (row) => {
    setSectionButtonText("Update Section");
    setShowForm(true);
    setSelectedSectionHeader(row.SECTION_HEADER);
    setOptionName(row.SECTION_ITEM_NAME);
    setLinkType(row.LINK_TYPE);
    setSectionId(row.ID);
    console.log(row.ID);
    if (linkType === "page") {
      setPageLink(row.LINK);
    } else {
      setExternalLink(row.LINK);
    }
  };
  const handleSectionDelete = async (id) => {
    const response = await api.deleteFooterSectionInfo(id);
    console.log(response);
    reloadPage();
  };

  const reloadPage = () => {
    setSelectedSectionHeader("");
    setNewSectionHeader("");
    setOptionName("");
    setPageLink("");
    setExternalLink("");
    setSectionButtonText("Add Section");
    fetchSectionDetails();
    fetchSectionHeaders();
    setShowForm(false);
  };

  async function fetchSectionDetails() {
    const response = await api.getFooterSectionInfo();
    if (response.length > 0) {
      setSectionList(response);
    } else {
      setSectionList([]);
    }
  }

  async function fetchSectionHeaders() {
    const response = await api.getSectionHeaders();
    if (response.length > 0) {
      setSectionHeaders(response);
    } else {
      setSectionHeaders([]);
    }
  }
  useEffect(() => {
    async function fetchFooterHeaderInfo() {
      const response = await api.getFooterHeaderInfo();
      console.log(response);
      if (response.length > 0) {
        console.log("came to if");
        setHeaderButtonText("Update Header");
        setCopyrightText(response[0].COPYRIGHT_TEXT);
        setTagline(response[0].TAGLINE);
        setNewsletterHeader(response[0].NEWSLETTER_HEADER_TEXT);
        setShowNewsletter(response[0].SHOW_NEWSLETTER);
        setNewsletterTagline(response[0].NEWSLETTER_TAGLINE);
        setHeaderId(response[0].ID);
      } else {
        setHeaderButtonText("Save Header");
      }
    }

    fetchFooterHeaderInfo();
    fetchSectionHeaders();
    fetchSectionDetails();
  }, []);

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
              {headerButtonText}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="sections" className="mt-6">
          {sectionList.length === 0 && !showForm && (
            <EmptyState
              heading="No Footer Sections"
              subheading="Add a Section"
              buttonText="New Section"
              onClick={() => {
                setShowForm(true);
                reloadPage();
              }}
              icon={<FolderPlus className="w-8 h-8" />}
            />
          )}
          {showForm && (
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
                    <SelectItem value="new">
                      Create New Section Header
                    </SelectItem>
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
              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    reloadPage();
                  }}
                  className="w-1/2"
                >
                  Cancel
                </Button>

                <Button type="submit" className="w-1/2 ml-1">
                  {sectionButtonText}
                </Button>
              </div>
            </form>
          )}
          {sectionList.length > 0 && !showForm && (
            <div className="container mx-auto">
              <DataTable
                columns={columns}
                data={sectionList}
                icon={<Plus />}
                buttonText="Add New Item"
                onButtonClick={() => {
                  setShowForm(true);
                }}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
