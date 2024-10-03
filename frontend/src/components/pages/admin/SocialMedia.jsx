"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/utility/admin/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FolderPlus, Plus, ArrowUpDown, MoreHorizontal } from "lucide-react";
import EmptyState from "./commons/EmptyState";
import { DataTable } from "./commons/DataTable";

export default function SocialMedia() {
  const [mediaName, setMediaName] = useState("");
  const [mediaIcon, setMediaIcon] = useState("");
  const [mediaLink, setMediaLink] = useState("");
  const [mediaId, setMediaId] = useState(null);
  const [socialMediaList, setSocialMediaList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [mediaButtonText, setMediaButtonText] = useState(
    "Save Social Media Link"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const socialMediaData = {
      media_name: mediaName,
      svg_icon: mediaIcon,
      link: mediaLink,
    };
    if (mediaButtonText === "Save Social Media Link") {
      const respone = await api.saveSocialMediaDetails(socialMediaData);
      console.log(respone);
    } else if (mediaButtonText === "Update Social Media Link") {
      const resposne = await api.updateSocialMediaDetails(
        socialMediaData,
        mediaId
      );
      console.log(resposne);
      reloadPage();
    }
  };
  const columns = [
    {
      accessorKey: "MEDIA_NAME",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Media Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "SVG_ICON",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            SVG Icon
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
              <DropdownMenuItem
                onClick={() => handleSocialMediaEdit(row.original)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleSocialMediaDelete(row.original.ID)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleSocialMediaEdit = async (row) => {
    setMediaIcon(row.SVG_ICON);
    setMediaLink(row.LINK);
    setMediaName(row.MEDIA_NAME);
    setMediaId(row.ID);
    setMediaButtonText("Update Social Media Link");
    setShowForm(true);
  };

  const handleSocialMediaDelete = async (id) => {
    const resposne = await api.deleteSocialMediaDetails(id);
    console.log(resposne);
    reloadPage();
  };

  const reloadPage = () => {
    setMediaIcon("");
    setMediaLink("");
    setMediaName("");
    setMediaId("");
    setShowForm(false);
    fetchMediaDetails();
    setMediaButtonText("Save Social Media Link");
  };
  async function fetchMediaDetails() {
    const response = await api.getSocialMediaDetails();
    if (response.length > 0) {
      setSocialMediaList(response);
    } else {
      setSocialMediaList([]);
    }
  }

  useEffect(() => {
    fetchMediaDetails();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {socialMediaList.length === 0 && !showForm && (
        <EmptyState
          heading="No Social Media"
          subheading="Add a media"
          buttonText="New Media"
          onClick={() => {
            setShowForm(true);
          }}
          icon={<FolderPlus className="w-8 h-8" />}
        />
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          {/* Media Name Input */}
          <div className="space-y-2">
            <Label htmlFor="mediaName">Media Name</Label>
            <Input
              id="mediaName"
              value={mediaName}
              onChange={(e) => setMediaName(e.target.value)}
              placeholder="Enter social media name"
              required
            />
          </div>

          {/* Media SVG Icon Input */}
          <div className="space-y-2">
            <Label htmlFor="mediaIcon">Media SVG Icon</Label>
            <Input
              id="mediaIcon"
              value={mediaIcon}
              onChange={(e) => setMediaIcon(e.target.value)}
              placeholder="Enter SVG icon or icon URL"
              required
            />
          </div>

          {/* Media Link Input */}
          <div className="space-y-2">
            <Label htmlFor="mediaLink">Media Link</Label>
            <Input
              id="mediaLink"
              value={mediaLink}
              onChange={(e) => setMediaLink(e.target.value)}
              placeholder="Enter social media link"
              required
            />
          </div>

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
              {mediaButtonText}
            </Button>
          </div>
        </form>
      )}
      {socialMediaList.length > 0 && !showForm && (
        <div className="container mx-auto">
          <DataTable
            columns={columns}
            data={socialMediaList}
            icon={<Plus />}
            buttonText="Add New Item"
            onButtonClick={() => {
              setShowForm(true);
            }}
          />
        </div>
      )}
    </div>
  );
}
