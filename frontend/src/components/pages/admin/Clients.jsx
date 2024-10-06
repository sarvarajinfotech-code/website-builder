"use client";

import React, { useState, useRef, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/utility/api";
import Constants from "@/utility/Constants";
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

export default function Clients() {
  const [activeTab, setActiveTab] = useState("header");
  const [headerText, setHeaderText] = useState("");
  const [tagline, setTagline] = useState("");
  const [headerTextButton, setHeaderTextButton] = useState("Save Header");
  const [headerId, setHeaderId] = useState(null);
  const [clientName, setClientName] = useState("");
  const [logoPreview, setLogoPreview] = useState(null);
  const [logo, setLogo] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [clientButtonText, setClientButtonText] = useState("Add Client");
  const [clientList, setClientList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const fileInputRef = useRef(null);

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    setLogo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleHeaderSubmit = async (e) => {
    e.preventDefault();
    if (headerTextButton === "Save Header") {
      let payload = {
        header_text: headerText,
        tagline: tagline,
        page: Constants.CLIENT_PAGE,
      };
      const response = await api.saveHeaderInfo(payload);
      console.log(response);
    } else if (headerTextButton === "Update Header") {
      let payload = {
        header_text: headerText,
        tagline: tagline,
        page: Constants.CLIENT_PAGE,
      };
      const response = await api.updateHeaderInfo(payload, headerId);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formdata = new FormData();
    formdata.set("client_name", clientName);
    formdata.set("file", logo);
    if (clientButtonText === "Add Client") {
      const response = await api.saveClientDetails(formdata);
      console.log(response);
    } else if (clientButtonText === "Update Client") {
      const response = await api.updateClientDetails(formdata, clientId);
      console.log(response);
    }
    reloadPage();
    setShowForm(false);
  };
  const reloadPage = () => {
    setClientName("");
    setLogoPreview(null);
    fetchClientDetails();
    setClientButtonText("Add Client");
  };

  const handleClientPageEdit = async (row) => {
    const image = await api.getImage(row.CLIENT_LOGO);
    setLogoPreview(row.CLIENT_LOGO);
    setClientName(row.CLIENT_NAME);
    setClientId(row.ID);
    setShowForm(true);
    setClientButtonText("Update Client");
  };

  const handleclientPageDelete = async (id) => {
    const resposne = await api.deleteClientDetails(id);
    console.log(resposne);
    reloadPage();
  };

  const columns = [
    {
      accessorKey: "CLIENT_NAME",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Client Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "CLIENT_LOGO",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Client logo
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
                onClick={() => handleClientPageEdit(row.original)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleclientPageDelete(row.original.ID)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  async function fetchClientDetails() {
    const respone = await api.getClientDetails();
    if (respone.length > 0) {
      setClientList(respone);
    } else {
      setClientList([]);
    }
  }
  useEffect(() => {
    async function fetchHeaderDetails() {
      const response = await api.getHeaderInfo(Constants.CLIENT_PAGE);
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
    fetchClientDetails();
  }, []);
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-3xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="header">Client Header</TabsTrigger>
          <TabsTrigger value="client">Add Client</TabsTrigger>
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
                required
              />
            </div>
            <div>
              <Label htmlFor="tagline">Tagline</Label>
              <Input
                id="tagline"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Enter tagline"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {headerTextButton}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="client" className="mt-6">
          {clientList.length === 0 && !showForm && (
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
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Enter client name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="clientLogo">Client Logo</Label>
                <Input
                  id="clientLogo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                  ref={fileInputRef}
                />
                <Button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="w-full"
                >
                  Select Logo
                </Button>
                <div className="mt-2 h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Client Logo Preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <p className="text-gray-500">Select a logo to preview</p>
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
                  className="w-1/2"
                >
                  Cancel
                </Button>

                <Button type="submit" className="w-1/2 ml-1">
                  {clientButtonText}
                </Button>
              </div>
            </form>
          )}
          {clientList.length > 0 && !showForm && (
            <div className="container mx-auto">
              <DataTable
                columns={columns}
                data={clientList}
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
