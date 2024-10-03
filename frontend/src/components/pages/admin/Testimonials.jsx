"use client";

import React, { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/utility/admin/api";
import Constants from "@/utility/admin/Constants";
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

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState("header");
  const [headerText, setHeaderText] = useState("");
  const [tagline, setTagline] = useState("");
  const [headerTextButton, setHeaderTextButton] = useState("Save Header");
  const [headerId, setHeaderId] = useState(null);
  const [testimonial, setTestimonial] = useState({
    name: "",
    designation: "",
    review: "",
  });
  const [photo, setPhoto] = useState(null);
  const [testimonialId, setTestimonialId] = useState(null);
  const [testimonialButtonText, setTestimonialButtonText] =
    useState("Save Testimonial");
  const [testimonialList, setTestimonialList] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef(null);

  const columns = [
    {
      accessorKey: "PERSON_NAME",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Person Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "DESIGNATION",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Designation
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "REVIEW",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Review
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "PERSON_PHOTO",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Person Photo
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
              <DropdownMenuItem
                onClick={() => handleTestimonialPageEdit(row.original)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleTestimonialPageDelete(row.original.ID)}
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
    if (headerTextButton === "Save Header") {
      let payload = {
        header_text: headerText,
        tagline: tagline,
        page: Constants.TESTIMONIAL_PAGE,
      };
      const response = await api.saveHeaderInfo(payload);
      console.log(response);
    } else if (headerTextButton === "Update Header") {
      let payload = {
        header_text: headerText,
        tagline: tagline,
        page: Constants.TESTIMONIAL_PAGE,
      };
      const response = await api.updateHeaderInfo(payload, headerId);
    }
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTestimonialChange = (e) => {
    const { name, value } = e.target;
    setTestimonial((prev) => ({ ...prev, [name]: value }));
  };

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.set("person_name", testimonial.name);
    formData.set("designation", testimonial.designation);
    formData.set("review", testimonial.review);
    formData.set("file", photo);
    if (testimonialButtonText === "Save Testimonial") {
      const response = await api.saveTestimonialsDetails(formData);
      console.log(response);
    } else if (testimonialButtonText === "Update Testimonial") {
      const respone = await api.updateTestimonialsDetails(
        formData,
        testimonialId
      );
      console.log(respone);
    }
    reloadPage();
    setShowForm(false);
  };

  const reloadPage = () => {
    fetchTestimonials();
    setTestimonial({ name: "", designation: "", review: "" });
    setTestimonialId(null);
    setPhoto(null);
    setPhotoPreview(null);
    setTestimonialId(null);
    setTestimonialButtonText("Save Testimonial");
  };

  const handleTestimonialPageEdit = async (row) => {
    const image = await api.getImage(row.PERSON_PHOTO);
    setPhoto(image);
    setPhotoPreview(row.PERSON_PHOTO);
    setTestimonial({
      name: row.PERSON_NAME,
      designation: row.DESIGNATION,
      review: row.REVIEW,
    });
    setTestimonialId(row.ID);
    setShowForm(true);
    setTestimonialButtonText("Update Testimonial");
  };

  const handleTestimonialPageDelete = async (id) => {
    const resposne = await api.deleteTestimonialsDetails(id);
    console.log(resposne);
    reloadPage();
  };

  async function fetchTestimonials() {
    const response = await api.getTestimonialsDetails();
    if (response.length > 0) {
      setTestimonialList(response);
    } else {
      setTestimonialList([]);
    }
  }

  useEffect(() => {
    async function fetchHeaderDetails() {
      const response = await api.getHeaderInfo(Constants.TESTIMONIAL_PAGE);
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
    fetchTestimonials();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-3xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="header">Testimonial Header</TabsTrigger>
          <TabsTrigger value="testimonial">Add Testimonial</TabsTrigger>
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
        <TabsContent value="testimonial" className="mt-6">
          {testimonialList.length === 0 && !showForm && (
            <EmptyState
              heading="No Testimonials"
              subheading="Add a Testimonial"
              buttonText="New Review"
              onClick={() => {
                setShowForm(true);
              }}
              icon={<FolderPlus className="w-8 h-8" />}
            />
          )}
          {showForm && (
            <form
              onSubmit={handleTestimonialSubmit}
              className="space-y-6 max-w-md mx-auto"
            >
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={testimonial.name}
                  onChange={handleTestimonialChange}
                  placeholder="Enter person's name"
                />
              </div>
              <div>
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  name="designation"
                  value={testimonial.designation}
                  onChange={handleTestimonialChange}
                  placeholder="Enter person's designation"
                />
              </div>
              <div>
                <Label htmlFor="photo">Photo</Label>
                <Input
                  id="photo"
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
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
              <div>
                <Label htmlFor="review">Review</Label>
                <Textarea
                  id="review"
                  name="review"
                  value={testimonial.review}
                  onChange={handleTestimonialChange}
                  placeholder="Enter the testimonial review"
                  rows={4}
                />
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
                  {testimonialButtonText}
                </Button>
              </div>
            </form>
          )}
          {testimonialList.length > 0 && !showForm && (
            <div className="container mx-auto">
              <DataTable
                columns={columns}
                data={testimonialList}
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
