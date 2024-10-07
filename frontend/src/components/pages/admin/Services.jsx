import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Constants from "@/utility/Constants";
import api from "@/utility/api";
import EmptyState from "./commons/EmptyState";
import { FolderPlus, Plus, ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable } from "./commons/DataTable";

export default function Services() {
  const [activeTab, setActiveTab] = useState("header");
  const [headerText, setHeaderText] = useState("");
  const [tagline, setTagline] = useState("");
  const [headerTextButton, setHeaderTextButton] = useState("Save Header");
  const [headerId, setHeaderId] = useState(null);
  const [formData, setFormData] = useState({
    serviceName: "",
    serviceCategory: "",
    serviceIcon: "",
    serviceDescription: "",
    learnMoreLink: "",
    showLearnMore: false,
  });
  const [serviceList, setServiceList] = useState([]);
  const [serviceId, setServiceId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [serviceCategoryList, setServiceCategoryList] = useState([]);
  const [serviceButtonText, setServiceButtonText] = useState("Save Service");

  const columns = [
    {
      accessorKey: "SERVICE_CATEGORY",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Service Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "SERVICE_NAME",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Service Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "SERVICE_DESCRIPTION",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Service Description
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
      accessorKey: "LEARN_MORE",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Learn More
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "LEARN_MORE_LINK",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Learn More link
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const service = row.original;

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
              <DropdownMenuItem onClick={() => handleServiceEdit(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleServiceDelete(row.original.ID)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const reloadPage = () => {
    setServiceButtonText("Save Service");
    fetchServiceDetails();
    setFormData({
      serviceName: "",
      serviceCategory: "",
      serviceIcon: "",
      serviceDescription: "",
      learnMoreLink: "",
      showLearnMore: false,
    });
    setServiceId(null);
    setShowForm(false);
  };

  const handleServiceEdit = (row) => {
    setFormData({
      serviceName: row.SERVICE_NAME,
      serviceCategory: row.SERVICE_CATEGORY,
      serviceIcon: row.SVG_ICON,
      serviceDescription: row.SERVICE_DESCRIPTION,
      learnMoreLink: row.LEARN_MORE_LINK,
      showLearnMore: row.LEARN_MORE,
    });
    setShowForm(true);
    setServiceId(row.ID);
    setServiceButtonText("Update Service");
  };

  const handleServiceDelete = async (id) => {
    const response = await api.deleteServiceDetails(id);
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

  const handleToggleLearnMore = () => {
    setFormData((prevData) => ({
      ...prevData,
      showLearnMore: !prevData.showLearnMore,
      learnMoreLink: !formData.showLearnMore ? "" : prevData.learnMoreLink,
    }));
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      service_name: formData.serviceName,
      service_category: formData.serviceCategory,
      svg_icon: formData.serviceIcon,
      service_description: formData.serviceDescription,
      learn_more: formData.showLearnMore,
      learn_more_link: formData.learnMoreLink ? formData.learnMoreLink : "",
    };
    if (serviceButtonText === "Save Service") {
      const response = await api.saveServiceDetails(payload);
      console.log(response);
    } else if (serviceButtonText === "Update Service") {
      const response = await api.updateServiceDetails(payload, serviceId);
      console.log(response);
    }
    reloadPage();
  };

  const handleHeaderSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      header_text: headerText,
      tagline: tagline,
      page: Constants.SERVICES,
    };
    if (headerTextButton === "Save Header") {
      const response = await api.saveHeaderInfo(payload);
      console.log(response);
    } else if (headerTextButton === "Update Header") {
      const response = await api.updateHeaderInfo(payload, headerId);
    }
  };

  async function fetchServiceDetails() {
    const response = await api.getServiceDetails();
    if (response.length > 0) {
      setServiceList(response);
    } else {
      setServiceList([]);
    }
  }

  useEffect(() => {
    async function fetchHeaderDetails() {
      const response = await api.getHeaderInfo(Constants.SERVICES);
      if (response.length > 0) {
        setHeaderTextButton("Update Header");
        setHeaderText(response[0].HEADER_TEXT);
        setTagline(response[0].TAG_LINE);
        setHeaderId(response[0].ID);
      } else {
        setHeaderTextButton("Save Header");
      }
    }
    async function fetchServiceCategoryDetails() {
      const response = await api.getServiceCategoryDetails();
      if (response.length > 0) {
        setServiceCategoryList(response);
      } else {
        setServiceCategoryList([]);
      }
    }
    fetchHeaderDetails();
    fetchServiceDetails();
    fetchServiceCategoryDetails();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-3xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="header">Service Header</TabsTrigger>
          <TabsTrigger value="service">Add Service</TabsTrigger>
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
        <TabsContent value="service" className="mt-6">
          {serviceList.length === 0 && !showForm && (
            <EmptyState
              heading="No Service"
              subheading="Add a service"
              buttonText="New Service"
              onClick={() => {
                setShowForm(true);
              }}
              icon={<FolderPlus className="w-8 h-8" />}
            />
          )}
          {showForm && (
            <form
              onSubmit={handleServiceSubmit}
              className="space-y-6 max-w-md mx-auto"
            >
              <div className="space-y-2">
                <Label htmlFor="serviceName">Service Name</Label>
                <Input
                  id="serviceName"
                  name="serviceName"
                  placeholder="Enter service name"
                  value={formData.serviceName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceCategory">Service Category</Label>
                <Select
                  name="serviceCategory"
                  value={formData.serviceCategory}
                  onValueChange={(value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      serviceCategory: value,
                    }))
                  }
                  required
                >
                  <SelectTrigger id="serviceCategory">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategoryList.map((category, index) => (
                      <SelectItem key={index} value={category.CATEGORY_NAME}>
                        {category.CATEGORY_NAME}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceIcon">Service SVG Icon</Label>
                <Input
                  id="serviceIcon"
                  name="serviceIcon"
                  placeholder="Paste SVG code here"
                  value={formData.serviceIcon}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceDescription">Service Description</Label>
                <Textarea
                  id="serviceDescription"
                  name="serviceDescription"
                  placeholder="Enter service description"
                  value={formData.serviceDescription}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="learnMore"
                  checked={formData.showLearnMore}
                  onCheckedChange={handleToggleLearnMore}
                />
                <Label htmlFor="learnMore">Add Learn More Link</Label>
              </div>
              {formData.showLearnMore && (
                <div className="space-y-2">
                  <Label htmlFor="learnMoreLink">Learn More Link</Label>
                  <Input
                    id="learnMoreLink"
                    name="learnMoreLink"
                    placeholder="Enter learn more link"
                    value={formData.learnMoreLink}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    // Add any reload logic if needed
                  }}
                  className="w-1/2"
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-1/2 ml-1">
                  Save Service
                </Button>
              </div>
            </form>
          )}
          {serviceList.length > 0 && !showForm && (
            <div className="container mx-auto">
              <DataTable
                columns={columns} // Ensure columns are defined somewhere in your code
                data={serviceList}
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
