"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/utility/api";
import ReactQuill from "react-quill"; // Rich text editor
import "react-quill/dist/quill.snow.css"; // Quill styles
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, ArrowUpDown, MoreHorizontal, FolderPlus } from "lucide-react";
import EmptyState from "./commons/EmptyState";
import { DataTable } from "./commons/DataTable";

export default function DynamicPage() {
  const [pageName, setPageName] = useState("");
  const [contentHeader, setContentHeader] = useState("");
  const [content, setContent] = useState("");
  const [pageId, setPageId] = useState(null);
  const [pageList, setPageList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [buttonText, setButtonText] = useState("Save Page");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pageData = {
      page_name: pageName,
      content_header: contentHeader,
      content: content,
    };

    if (buttonText === "Save Page") {
      const response = await api.savePageDetails(pageData);
      saveORupdateDynamicPath(response.ID, "save");
      console.log(response);
    } else if (buttonText === "Update Page") {
      const response = await api.updatePageDetails(pageData, pageId);
      saveORupdateDynamicPath(pageId, "update");
      console.log(response);
    }
    reloadPage();
  };

  const columns = [
    {
      accessorKey: "PAGE_NAME",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Page Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "CONTENT_HEADER",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Content Header
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const page = row.original;

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
              <DropdownMenuItem onClick={() => handleEdit(page)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(page.ID)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleEdit = (row) => {
    setPageName(row.PAGE_NAME);
    setContentHeader(row.CONTENT_HEADER);
    setContent(row.CONTENT);
    setPageId(row.ID);
    setButtonText("Update Page");
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const response = await api.deletePageDetails(id);
    deleteDynamicPath(id);
    reloadPage();
  };

  const reloadPage = () => {
    setPageName("");
    setContentHeader("");
    setContent("");
    setPageId(null);
    setShowForm(false);
    fetchPageDetails();
    setButtonText("Save Page");
  };

  const generateDynamicPagePath = () => {
    if (typeof pageName !== "string") {
      throw new Error("Input must be a string");
    }
    const dynamicPagePath = pageName.toLowerCase().replace(/\s+/g, "-");

    return dynamicPagePath;
  };

  const saveORupdateDynamicPath = async (dynamic_page_id, action) => {
    let page_path = "/" + generateDynamicPagePath();
    let payload = {
      id: null,
      page_name: pageName,
      page_path: page_path,
      show: true,
      disabled: false,
      dynamic_page_id: dynamic_page_id,
    };
    if (action === "save") {
      const response = await api.savePathDetails(payload);
      console.log(response);
    } else if (action === "update") {
      const response = await api.updatePathDetails(payload, dynamic_page_id);
      console.log(response);
    }
  };

  const deleteDynamicPath = async (id) => {
    const response = await api.deletePathDetails(id);
  };

  async function fetchPageDetails() {
    const response = await api.getPageDetails();
    if (response.length > 0) {
      setPageList(response);
    } else {
      setPageList([]);
    }
  }

  useEffect(() => {
    fetchPageDetails();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {pageList.length === 0 && !showForm && (
        <EmptyState
          heading="No Pages Available"
          subheading="Add a new dynamic page"
          buttonText="New Page"
          onClick={() => setShowForm(true)}
          icon={<FolderPlus className="w-8 h-8" />}
        />
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          {/* Page Name Input */}
          <div className="space-y-2">
            <Label htmlFor="pageName">Page Name</Label>
            <Input
              id="pageName"
              value={pageName}
              onChange={(e) => setPageName(e.target.value)}
              placeholder="Enter the page name"
              required
            />
          </div>

          {/* Content Header Input */}
          <div className="space-y-2">
            <Label htmlFor="contentHeader">Content Header</Label>
            <Input
              id="contentHeader"
              value={contentHeader}
              onChange={(e) => setContentHeader(e.target.value)}
              placeholder="Enter the content header"
              required
            />
          </div>

          {/* Content Editor */}
          <div className="space-y-2" style={{ height: "300px" }}>
            <Label htmlFor="content">Content</Label>
            <ReactQuill
              value={content}
              onChange={setContent}
              placeholder="Write your content here..."
              theme="snow"
              style={{ height: "80%" }}
            />
          </div>

          <div className="flex justify-between mt-2">
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
              {buttonText}
            </Button>
          </div>
        </form>
      )}
      {pageList.length > 0 && !showForm && (
        <div className="container mx-auto">
          <DataTable
            columns={columns}
            data={pageList}
            icon={<Plus />}
            buttonText="Add New Item"
            onButtonClick={() => setShowForm(true)}
          />
        </div>
      )}
    </div>
  );
}
