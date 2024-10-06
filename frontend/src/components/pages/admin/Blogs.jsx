import React, { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Constants from "@/utility/Constants";
import api from "@/utility/api";
import EmptyState from "./commons/EmptyState";
import {
  FolderPlus,
  Plus,
  ArrowUpDown,
  MoreHorizontal,
  ArrowDownAzIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "./commons/DataTable";

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
  const [blogList, setBlogList] = useState([]);
  const [blogId, setBlogId] = useState(null);
  const [blogButtonText, setBlogButtonText] = useState("Save Blog Post");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef(null);
  const columns = [
    {
      accessorKey: "BLOG_NAME",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Blog Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "BLOG_DESCRIPTION",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Blog Description
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "AUTHOR_NAME",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Author Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "AUTHOR_IMAGE",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Author Image
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "CREATED_DATE",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created Date
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
              <DropdownMenuItem onClick={() => handleBlogEdit(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleBlogDelete(row.original.ID)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleBlogEdit = async (row) => {
    const image = await api.getImage(row.AUTHOR_IMAGE);
    setFormData({
      blogName: row.BLOG_NAME,
      blogDescription: row.BLOG_DESCRIPTION,
      authorName: row.AUTHOR_NAME,
      authorImage: image,
    });
    setBlogId(row.ID);
    setImagePreview(row.AUTHOR_IMAGE);
    setBlogButtonText("Update Blog Post");
    setShowForm(true);
  };
  const handleBlogDelete = async (id) => {
    const response = await api.deleteBlogDetails(id);
    console.log(response);
    reloadPage();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    setImage(file);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = new FormData();
    payload.set("blog_name", formData.blogName);
    payload.set("blog_description", formData.blogDescription);
    payload.set("author_name", formData.authorName);
    payload.set("file", formData.authorImage);
    if (blogButtonText === "Save Blog Post") {
      const response = await api.saveBlogDetails(payload);
      console.log(response);
    } else if (blogButtonText === "Update Blog Post") {
      const response = await api.updateBlogDetails(payload, blogId);
      console.log(response);
    }
    reloadPage();
  };

  const reloadPage = () => {
    setFormData({
      blogName: "",
      blogDescription: "",
      authorName: "",
      authorImage: null,
    });
    setShowForm(false);
    setBlogId(null);
    setBlogButtonText("Save Blog Post");
    fetchBlogDetails();
    setImagePreview(null);
    setImage(null);
  };

  async function fetchBlogDetails() {
    const response = await api.getBlogDetails();
    if (response.length > 0) {
      setBlogList(response);
    } else {
      setBlogList([]);
    }
  }

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
    fetchBlogDetails();
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
          <TabsTrigger value="blog">Add Blog</TabsTrigger>
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
        <TabsContent value="blog" className="mt-6">
          {blogList.length === 0 && !showForm && (
            <EmptyState
              heading="No blog"
              subheading="Add a blog"
              buttonText="New blog"
              onClick={() => {
                setShowForm(true);
              }}
              icon={<FolderPlus className="w-8 h-8" />}
            />
          )}
          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-w-md mx-auto"
            >
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
                  {blogButtonText}
                </Button>
              </div>
            </form>
          )}
          {blogList.length > 0 && !showForm && (
            <div className="container mx-auto">
              <DataTable
                columns={columns}
                data={blogList}
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
