"use client";

import React, { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/utility/api";
import Constants from "@/utility/Constants";
import { FolderPlus, Plus, ArrowUpDown, MoreHorizontal } from "lucide-react";
import EmptyState from "./commons/EmptyState";
import { DataTable } from "./commons/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function WhyChooseUs() {
  const [activeTab, setActiveTab] = useState("header");
  const [headerText, setHeaderText] = useState("");
  const [tagline, setTagline] = useState("");
  const [headerTextButton, setHeaderTextButton] = useState("Save Header");
  const [headerId, setHeaderId] = useState(null);
  const [reason, setReason] = useState({
    title: "",
    explanation: "",
    image: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null); // To hold the preview URL
  const [reasonId, setReasonId] = useState(null);
  const [reasonButtonText, setReasonButtonText] = useState("Save Reason");
  const [reasonList, setReasonList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef(null); // Reference for file input

  const columns = [
    {
      accessorKey: "HEADER",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "EXPLANATION",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Explanation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "IMAGE",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Image
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => handleReasonPageEdit(row.original)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleReasonPageDelete(row.original.ID)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleHeaderSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      header_text: headerText,
      tagline: tagline,
      page: Constants.WHY_CHOOSE_US,
    };
    if (headerTextButton === "Save Header") {
      await api.saveHeaderInfo(payload);
    } else if (headerTextButton === "Update Header") {
      await api.updateHeaderInfo(payload, headerId);
    }
  };

  const handleReasonChange = (e) => {
    const { name, value } = e.target;
    setReason((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    setReason((prev) => ({ ...prev, image: file })); // Update reason state with image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result); // Set the preview URL
      };
      reader.readAsDataURL(file); // Read the image file
    }
  };

  const handleReasonSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("header", reason.title);
    formData.append("explanation", reason.explanation);
    if (reason.image) {
      formData.append("file", reason.image);
    }

    if (reasonButtonText === "Save Reason") {
      await api.saveReasonsDetails(formData);
    } else if (reasonButtonText === "Update Reason") {
      await api.updateReasonsDetails(formData, reasonId);
    }
    reloadPage();
    setShowForm(false);
  };

  const reloadPage = () => {
    fetchReasons();
    setReason({ title: "", explanation: "", image: null });
    setPhotoPreview(null); // Reset preview
    setReasonId(null);
    setReasonButtonText("Save Reason");
  };

  const handleReasonPageEdit = async (row) => {
    const photo = await api.getImage(row.IMAGE);

    setReason({
      title: row.HEADER,
      explanation: row.EXPLANATION,
      image: photo,
    });
    setPhotoPreview(row.IMAGE);
    setReasonId(row.ID);
    setShowForm(true);
    setReasonButtonText("Update Reason");
  };

  const handleReasonPageDelete = async (id) => {
    await api.deleteReasonsDetails(id);
    reloadPage();
  };

  async function fetchReasons() {
    const response = await api.getReasonsDetails();
    if (response.length > 0) {
      setReasonList(response);
    } else {
      setReasonList([]);
    }
  }

  useEffect(() => {
    async function fetchHeaderDetails() {
      const response = await api.getHeaderInfo(Constants.WHY_CHOOSE_US);
      if (response.length > 0) {
        setHeaderTextButton("Update Header");
        setHeaderText(response[0].HEADER_TEXT);
        setTagline(response[0].TAG_LINE);
        setHeaderId(response[0].ID);
      } else {
        setHeaderTextButton("Save Header");
      }
    }
    fetchHeaderDetails();
    fetchReasons();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-3xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="header">Why Choose Us Header</TabsTrigger>
          <TabsTrigger value="reason">Add Reason</TabsTrigger>
        </TabsList>
        <TabsContent value="header" className="mt-6">
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
              {headerTextButton}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="reason" className="mt-6">
          {reasonList.length === 0 && !showForm && (
            <EmptyState
              heading="No Reasons"
              subheading="Add a Reason"
              buttonText="New Reason"
              onClick={() => setShowForm(true)}
              icon={<FolderPlus className="w-8 h-8" />}
            />
          )}
          {showForm && (
            <form
              onSubmit={handleReasonSubmit}
              className="space-y-6 max-w-md mx-auto"
            >
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={reason.title}
                  onChange={handleReasonChange}
                  placeholder="Enter reason title"
                />
              </div>
              <div>
                <Label htmlFor="explanation">Explanation</Label>
                <Textarea
                  id="explanation"
                  name="explanation"
                  value={reason.explanation}
                  onChange={handleReasonChange}
                  placeholder="Enter explanation"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="photo">Photo</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full"
                >
                  Select Photo
                </Button>
                <div className="mt-2 h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Person Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <p className="text-gray-500">Select a photo to preview</p>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    reloadPage();
                  }}
                  className=" w-1/2"
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-1/2 ml-1">
                  {reasonButtonText}
                </Button>
              </div>
            </form>
          )}
          {reasonList.length > 0 && !showForm && (
            <div className="container mx-auto">
              <DataTable
                columns={columns}
                data={reasonList}
                icon={<Plus />}
                buttonText="Add New reason"
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
