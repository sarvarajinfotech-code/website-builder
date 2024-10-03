import React, { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from "@/utility/admin/api";
import Constants from "@/utility/admin/Constants";

export default function Blogs() {
  const [activeTab, setActiveTab] = useState("header");
  const [headerText, setHeaderText] = useState("");
  const [tagline, setTagline] = useState("");
  const [headerTextButton, setHeaderTextButton] = useState("Save Header");
  const [headerId, setHeaderId] = useState(null);
  const [formData, setFormData] = useState({
    blogName: "",
    blogDescription: "",
    authorName: "",
    authorImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        authorImage: file,
      }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeaderSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      header_text: headerText,
      tagline: tagline,
      page: Constants.BLOGS,
    };
    if (headerTextButton === "Save Header") {
      const response = await api.saveHeaderInfo(payload);
      console.log(response);
      setHeaderTextButton("Update Header");
    } else if (headerTextButton === "Update Header") {
      const response = await api.updateHeaderInfo(payload, headerId);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Blog Post Data:", formData);
  };

  useEffect(() => {
    async function fetchHeaderDetails() {
      const response = await api.getHeaderInfo(Constants.BLOGS);
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
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-3xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="header">Blog Header</TabsTrigger>
          <TabsTrigger value="product">Add Blog</TabsTrigger>
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
        <TabsContent value="product" className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
            <div className="space-y-2">
              <Label htmlFor="blogName">Blog Name</Label>
              <Input
                id="blogName"
                name="blogName"
                placeholder="Enter blog name"
                value={formData.blogName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blogDescription">Blog Description</Label>
              <Textarea
                id="blogDescription"
                name="blogDescription"
                placeholder="Enter blog description"
                value={formData.blogDescription}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="authorName">Author Name</Label>
              <Input
                id="authorName"
                name="authorName"
                placeholder="Enter author name"
                value={formData.authorName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="authorImage">Author Image</Label>
              <Input
                id="authorImage"
                name="authorImage"
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
                Select Author Image
              </Button>
              <div className="mt-2 h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Author Image Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <p className="text-gray-500">Select an image to preview</p>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full">
              Save Blog Post
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
