"use client";

import React, { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Constants from "@/utility/admin/Constants";
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

export default function Team() {
  const [activeTab, setActiveTab] = useState("header");
  const [headerText, setHeaderText] = useState("");
  const [tagline, setTagline] = useState("");
  const [headerTextButton, setHeaderTextButton] = useState("Save Header");
  const [headerId, setHeaderId] = useState(null);
  const fileInputRef = useRef(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [teamMember, setTeamMember] = useState({
    name: "",
    designation: "",
    linkedin: "",
    twitter: "",
  });
  const [photo, setPhoto] = useState(null);
  const [teamButtonText, setTeamButtonText] = useState("Add Team");
  const [teamId, setTeamId] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeamMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleHeaderSubmit = async (e) => {
    e.preventDefault();
    if (headerTextButton === "Save Header") {
      let payload = {
        header_text: headerText,
        tagline: tagline,
        page: Constants.TEAM_PAGE,
      };
      const response = await api.saveHeaderInfo(payload);
      console.log(response);
    } else if (headerTextButton === "Update Header") {
      let payload = {
        header_text: headerText,
        tagline: tagline,
        page: Constants.TEAM_PAGE,
      };
      const response = await api.updateHeaderInfo(payload, headerId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.set("employee_name", teamMember.name);
    formdata.set("designation", teamMember.designation);
    formdata.set("linkedin_profile", teamMember.linkedin);
    formdata.set("twitter_profile", teamMember.twitter);
    formdata.set("file", photo);

    if (teamButtonText === "Add Team") {
      const response = await api.saveTeamDetails(formdata);
      console.log(response);
    } else if (teamButtonText === "Update Team") {
      const response = await api.updateTeamDetails(formdata, teamId);
      console.log(response);
    }
    reloadPage();
    setShowForm(false);
  };
  const reloadPage = () => {
    setTeamMember({ name: "", designation: "", linkedin: "", twitter: "" });
    setPhotoPreview(null);
    setPhoto(null);
    fetchTeamDetails();
    setTeamButtonText("Add Team");
  };

  const handleTeamPageEdit = async (row) => {
    const image = await api.getImage(row.PHOTO_PATH);
    setPhoto(image);
    setPhotoPreview(row.PHOTO_PATH);
    setTeamMember({
      name: row.EMPLOYEE_NAME,
      designation: row.DESIGNATION,
      linkedin: row.LINKEDIN_PROFILE,
      twitter: row.TWITTER_PROFILE,
    });
    setTeamId(row.ID);
    setShowForm(true);
    setTeamButtonText("Update Team");
  };

  const handleTeamPageDelete = async (id) => {
    const resposne = await api.deleteTeamDetails(id);
    console.log(resposne);
    reloadPage();
  };

  const columns = [
    {
      accessorKey: "EMPLOYEE_NAME",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Employee Name
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
      accessorKey: "TWITTER_PROFILE",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Twitter Link
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "LINKEDIN_PROFILE",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Linkdein Link
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "PHOTO_PATH",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Photo
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
                onClick={() => handleTeamPageEdit(row.original)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleTeamPageDelete(row.original.ID)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  async function fetchTeamDetails() {
    const respone = await api.getTeamDetails();
    if (respone.length > 0) {
      setTeamList(respone);
    } else {
      setTeamList([]);
    }
  }

  useEffect(() => {
    async function fetchHeaderDetails() {
      const response = await api.getHeaderInfo(Constants.TEAM_PAGE);
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
    fetchTeamDetails();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-3xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="header">Team Header</TabsTrigger>
          <TabsTrigger value="team">Add Team</TabsTrigger>
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
        <TabsContent value="team" className="mt-6">
          {teamList.length === 0 && !showForm && (
            <EmptyState
              heading="No Clients"
              subheading="Add a client"
              buttonText="New Client"
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
                <Label htmlFor="name">Employee Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={teamMember.name}
                  onChange={handleInputChange}
                  placeholder="Enter employee name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="designation">Designation</Label>
                <Input
                  id="designation"
                  name="designation"
                  value={teamMember.designation}
                  onChange={handleInputChange}
                  placeholder="Enter employee designation"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={teamMember.linkedin}
                  onChange={handleInputChange}
                  placeholder="Enter LinkedIn profile URL"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter Profile</Label>
                <Input
                  id="twitter"
                  name="twitter"
                  value={teamMember.twitter}
                  onChange={handleInputChange}
                  placeholder="Enter Twitter profile URL"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientLogo">Photo</Label>
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
                  onClick={() => fileInputRef.current.click()}
                  className="w-full"
                >
                  Select Photo
                </Button>
                <div className="mt-2 h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Team Member phto Preview"
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
                  onClick={() => setShowForm(false)}
                  className="w-1/2"
                >
                  Cancel
                </Button>

                <Button type="submit" className="w-1/2 ml-1">
                  {teamButtonText}
                </Button>
              </div>
            </form>
          )}
          {teamList.length > 0 && !showForm && (
            <div className="container mx-auto">
              <DataTable
                columns={columns}
                data={teamList}
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
