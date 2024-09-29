"use client";

import React, { useState, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState("header");
  const [headerText, setHeaderText] = useState("");
  const [tagline, setTagline] = useState("");
  const [testimonial, setTestimonial] = useState({
    name: "",
    designation: "",
    review: "",
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
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

  const handleHeaderSubmit = (e) => {
    e.preventDefault();
    console.log("Header submitted:", { headerText, tagline });
    // Add your header submission logic here
  };

  const handleTestimonialSubmit = (e) => {
    e.preventDefault();
    console.log("Testimonial submitted:", {
      ...testimonial,
      photo: photoPreview,
    });
    // Add your testimonial submission logic here
  };
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
              Save Header
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="testimonial" className="mt-6">
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
            <Button type="submit" className="w-full">
              Save Testimonial
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
