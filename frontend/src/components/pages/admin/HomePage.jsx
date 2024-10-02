import React, { useState, useRef, useEffect } from "react";
import {
  ArrowUpDown,
  MoreHorizontal,
  FolderPlus,
  Plus,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmptyState from "./commons/EmptyState";
import { DataTable } from "./commons/DataTable";
import api from "@/utility/admin/api";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("navigation");
  const [navigationFormData, setNavigationFormData] = useState({
    logo: null,
    darkTheme: false,
  });
  const [showAlert, setShowAlert] = useState(true);
  const [navigationButtonText, setNavigationButtonText] =
    useState("Save Configuration");
  const [naviagationID, setNavigationID] = useState(null);
  const [homePageFormData, setHomePageFormData] = useState({
    backgroundImage: null,
    backgroundOpacity: 100,
    headerText: "",
    headerAlignment: "left",
    taglineText: "",
    taglineAlignment: "left",
    primaryButtonText: "",
    primaryButtonType: "link",
    primaryButtonLink: "",
    secondaryButtonText: "",
    secondaryButtonType: "link",
    secondaryButtonLink: "",
    inSlider: "true",
  });
  const [homePageButtonText, setHomePageButtonText] = useState(
    "Save Home Page Configuration"
  );
  const [homePageID, setHomePageID] = useState(null);
  const [homePageList, setHomePageList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
  const [backgroundPreview, setBackgroundPreview] = useState(null);

  const logoInputRef = useRef(null);
  const backgroundInputRef = useRef(null);

  const [editHomePageInfo, setEditHomePageInfo] = useState(false);
  const [deleteHomePageInfo, setDeleteHomePageInfo] = useState(false);

  const columns = [
    {
      accessorKey: "HEADER_TEXT",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Header
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "HEADER_TEXT_ALIGNMENT",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Header Allignment
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "TAGLINE_TEXT",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tagline
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "TAGLINE_ALIGNMENT",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tagline Allignment
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "PRIMARY_BUTTON_TEXT",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Primary Button
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "PRIMARY_BUTTON_TYPE",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            PRimary Button type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "PRIMARY_BUTTON_LINK",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Primary Button Link
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "SECONDARY_BUTTON_TEXT",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Secondary Button Text
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "SECONDARY_BUTTON_TYPE",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Secondary Button Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "SECONDARY_BUTTON_LINK",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Secondary Button Link
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },

    {
      accessorKey: "SHOW_IN_SLIDER",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Show in slider
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "OPACITY",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Opacity
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "BACKGROUND_IMAGE_PATH",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Image
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },

    // {
    //   accessorKey: "amount",
    //   header: () => <div className="text-right">Amount</div>,
    //   cell: ({ row }) => {
    //     const amount = parseFloat(row.getValue("amount"));
    //     const formatted = new Intl.NumberFormat("en-US", {
    //       style: "currency",
    //       currency: "USD",
    //     }).format(amount);

    //     return <div className="text-right font-medium">{formatted}</div>;
    //   },
    // },

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
                onClick={() => handleHomePageEdit(row.original)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleHomePageDelete(row.original.ID)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNavigationFormData((prevData) => ({ ...prevData, logo: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundPreview(reader.result);
        setHomePageFormData((prevData) => ({
          ...prevData,
          backgroundImage: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleHomePageInputChange = (name, value) => {
    setHomePageFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event, formType) => {
    event.preventDefault();
    if (formType === "navigation") {
      let formdata = new FormData();
      formdata.set("dark_mode", navigationFormData.darkTheme);
      formdata.set("file", navigationFormData.logo);
      if (navigationButtonText === "Save Configuration") {
        const response = await api.saveNavigationSettings(formdata);
        console.log(response);
      } else if (navigationButtonText === "Update Configuration") {
        const response = await api.updateNavigationSettings(
          formdata,
          naviagationID
        );
        console.log(response);
      }
    } else if (formType === "homepage") {
      let formdata = new FormData();
      formdata.set("header_text", homePageFormData.headerText);
      formdata.set("header_text_alignment", homePageFormData.headerAlignment);
      formdata.set("tagline_text", homePageFormData.taglineText);
      formdata.set("tagline_alignment", homePageFormData.taglineAlignment);
      formdata.set("primary_button_text", homePageFormData.primaryButtonText);
      formdata.set("primary_button_type", homePageFormData.primaryButtonType);
      formdata.set("primary_button_link", homePageFormData.primaryButtonLink);
      formdata.set(
        "secondary_button_text",
        homePageFormData.secondaryButtonText
      );
      formdata.set(
        "secondary_button_type",
        homePageFormData.secondaryButtonType
      );
      formdata.set(
        "secondary_button_link",
        homePageFormData.secondaryButtonLink
      );
      formdata.set("show_in_slider", homePageFormData.inSlider);
      formdata.set("opacity", homePageFormData.backgroundOpacity);
      formdata.set("file", homePageFormData.backgroundImage);

      if (homePageButtonText === "Save Home Page Configuration") {
        const response = await api.saveHomePageSettings(formdata);
        console.log(response);
      } else if (homePageButtonText === "Update Home Page Configuration") {
        const response = await api.updateHomePageSettings(formdata, homePageID);
        console.log(response);
      }
    }
    reloadPage();
    setShowForm(false);
  };

  const handleHomePageEdit = async (row) => {
    const image = await api.getImage(row.BACKGROUND_IMAGE_PATH);
    setBackgroundPreview(row.BACKGROUND_IMAGE_PATH);
    setHomePageFormData({
      backgroundImage: image,
      backgroundOpacity: row.OPACITY,
      headerText: row.HEADER_TEXT,
      headerAlignment: row.HEADER_TEXT_ALIGNMENT,
      taglineText: row.TAGLINE_TEXT,
      taglineAlignment: row.TAGLINE_ALIGNMENT,
      primaryButtonText: row.PRIMARY_BUTTON_TEXT,
      primaryButtonType: row.PRIMARY_BUTTON_TYPE,
      primaryButtonLink: row.PRIMARY_BUTTON_LINK,
      secondaryButtonText: row.SECONDARY_BUTTON_TEXT,
      secondaryButtonType: row.SECONDARY_BUTTON_TYPE,
      secondaryButtonLink: row.SECONDARY_BUTTON_LINK,
      inSlider: row.SHOW_IN_SLIDER ? "true" : "false",
    });
    setHomePageID(row.ID);
    setShowForm(true);
    setHomePageButtonText("Update Home Page Configuration");
  };

  const handleHomePageDelete = async (id) => {
    const resposne = await api.deleteHomePageSettings(id);
    console.log(resposne);
    reloadPage();
  };

  const reloadPage = () => {
    fetchHomePageDetails();
    setHomePageFormData({
      backgroundImage: null,
      backgroundOpacity: 100,
      headerText: "",
      headerAlignment: "left",
      taglineText: "",
      taglineAlignment: "left",
      primaryButtonText: "",
      primaryButtonType: "link",
      primaryButtonLink: "",
      secondaryButtonText: "",
      secondaryButtonType: "link",
      secondaryButtonLink: "",
      inSlider: "true",
    });
  };

  async function fetchNavigationDetails() {
    const navigationDetails = await api.getNavigationSettingsDetails();
    if (navigationDetails.length > 0) {
      const image = await api.getImage(navigationDetails[0].LOGO);
      setNavigationFormData(() => ({
        logo: image,
        darkTheme: navigationDetails[0].DARK_MODE,
      }));
      setImagePreview(navigationDetails[0].LOGO);
      setNavigationButtonText("Update Configuration");
      setNavigationID(navigationDetails[0].ID);
    } else {
      setNavigationButtonText("Save Configuration");
    }
  }
  async function fetchHomePageDetails() {
    const homepageDetails = await api.getHomePageDetails();
    if (homepageDetails.length > 0) {
      setHomePageList(homepageDetails);
    } else {
      setHomePageList([]);
    }
  }

  useEffect(() => {
    fetchNavigationDetails();
    fetchHomePageDetails();
  }, []);
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-4xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="navigation">Navigation</TabsTrigger>
          <TabsTrigger value="homepage">Home Page</TabsTrigger>
        </TabsList>
        <TabsContent value="navigation">
          <form
            onSubmit={(e) => handleSubmit(e, "navigation")}
            className="space-y-6 max-w-md mx-auto"
          >
            <div className="space-y-2">
              <Label htmlFor="logo">Logo</Label>
              <Input
                id="logo"
                type="file"
                accept="image/*"
                name="logo"
                onChange={handleLogoChange}
                className="hidden"
                ref={logoInputRef}
              />
              <Button
                type="button"
                onClick={() => logoInputRef.current.click()}
                className="w-full"
              >
                Select Logo
              </Button>
              <div className="mt-2 h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Logo Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <p className="text-gray-500">Select a logo to preview</p>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                Upload your site logo (admin and user page)
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="dark-theme"
                checked={navigationFormData.darkTheme}
                onCheckedChange={(checked) =>
                  setNavigationFormData((prevData) => ({
                    ...prevData,
                    darkTheme: checked,
                  }))
                }
              />
              <Label htmlFor="dark-theme">Enable Dark Theme</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Toggle to enable or disable dark theme for your site
            </p>

            <Button type="submit" className="w-full">
              {navigationButtonText}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="homepage">
          {homePageList.length === 0 && !showForm && (
            <EmptyState
              heading="No Images"
              subheading="Add a image to home page"
              buttonText="New Image"
              onClick={() => {
                setShowForm(true);
              }}
              icon={<FolderPlus className="w-8 h-8" />}
            />
          )}
          {showForm && (
            <form
              onSubmit={(e) => handleSubmit(e, "homepage")}
              className="space-y-6 "
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="headerText">Header Text</Label>
                    <Input
                      id="headerText"
                      value={homePageFormData.headerText}
                      onChange={(e) =>
                        handleHomePageInputChange("headerText", e.target.value)
                      }
                      placeholder="Enter header text"
                      required
                    />
                  </div>
                  <div>
                    <Label>Header Text Alignment</Label>
                    <RadioGroup
                      value={homePageFormData.headerAlignment}
                      onValueChange={(value) =>
                        handleHomePageInputChange("headerAlignment", value)
                      }
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="left" id="headerLeft" />
                        <Label htmlFor="headerLeft">Left</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="center" id="headerCenter" />
                        <Label htmlFor="headerCenter">Center</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="right" id="headerRight" />
                        <Label htmlFor="headerRight">Right</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="taglineText">Tagline Text</Label>
                    <Input
                      id="taglineText"
                      value={homePageFormData.taglineText}
                      onChange={(e) =>
                        handleHomePageInputChange("taglineText", e.target.value)
                      }
                      placeholder="Enter tagline text"
                      required
                    />
                  </div>
                  <div>
                    <Label>Tagline Text Alignment</Label>
                    <RadioGroup
                      value={homePageFormData.taglineAlignment}
                      onValueChange={(value) =>
                        handleHomePageInputChange("taglineAlignment", value)
                      }
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="left" id="taglineLeft" />
                        <Label htmlFor="taglineLeft">Left</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="center" id="taglineCenter" />
                        <Label htmlFor="taglineCenter">Center</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="right" id="taglineRight" />
                        <Label htmlFor="taglineRight">Right</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {/* Primary Button Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Primary Button</h3>
                  <div>
                    <Label htmlFor="primaryButtonText">
                      Primary Button Text
                    </Label>
                    <Input
                      id="primaryButtonText"
                      value={homePageFormData.primaryButtonText}
                      onChange={(e) =>
                        handleHomePageInputChange(
                          "primaryButtonText",
                          e.target.value
                        )
                      }
                      placeholder="Enter primary button text"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="primaryButtonType">
                      Primary Button Type
                    </Label>
                    <Select
                      value={homePageFormData.primaryButtonType}
                      onValueChange={(value) =>
                        handleHomePageInputChange("primaryButtonType", value)
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select button type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="link">Link</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="primaryButtonLink">
                      Primary Button Link
                    </Label>
                    <Input
                      id="primaryButtonLink"
                      value={homePageFormData.primaryButtonLink}
                      onChange={(e) =>
                        handleHomePageInputChange(
                          "primaryButtonLink",
                          e.target.value
                        )
                      }
                      placeholder={
                        homePageFormData.primaryButtonType === "link"
                          ? "Enter URL"
                          : "Enter video URL"
                      }
                      required
                    />
                  </div>
                </div>

                {/* Secondary Button Fields */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Secondary Button</h3>
                  <div>
                    <Label htmlFor="secondaryButtonText">
                      Secondary Button Text
                    </Label>
                    <Input
                      id="secondaryButtonText"
                      value={homePageFormData.secondaryButtonText}
                      onChange={(e) =>
                        handleHomePageInputChange(
                          "secondaryButtonText",
                          e.target.value
                        )
                      }
                      placeholder="Enter secondary button text"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondaryButtonType">
                      Secondary Button Type
                    </Label>
                    <Select
                      value={homePageFormData.secondaryButtonType}
                      onValueChange={(value) =>
                        handleHomePageInputChange("secondaryButtonType", value)
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select button type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="link">Link</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="secondaryButtonLink">
                      Secondary Button Link
                    </Label>
                    <Input
                      id="secondaryButtonLink"
                      value={homePageFormData.secondaryButtonLink}
                      onChange={(e) =>
                        handleHomePageInputChange(
                          "secondaryButtonLink",
                          e.target.value
                        )
                      }
                      placeholder={
                        homePageFormData.secondaryButtonType === "link"
                          ? "Enter URL"
                          : "Enter video URL"
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="showImageInSlider">
                    Show Background Image in Slider
                  </Label>
                  <Select
                    value={homePageFormData.inSlider}
                    onValueChange={(value) =>
                      handleHomePageInputChange("inSlider", value)
                    }
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backgroundOpacity">Background Opacity</Label>
                <Slider
                  id="backgroundOpacity"
                  min={0}
                  max={100}
                  step={5}
                  value={[homePageFormData.backgroundOpacity]}
                  onValueChange={(value) =>
                    handleHomePageInputChange("backgroundOpacity", value[0])
                  }
                />
                <p className="text-sm text-muted-foreground">
                  {homePageFormData.backgroundOpacity}%
                </p>
              </div>

              <div className="space-y-4">
                <Label htmlFor="backgroundImage">Background Image</Label>
                <Input
                  id="backgroundImage"
                  type="file"
                  accept="image/*"
                  onChange={handleBackgroundChange}
                  className="hidden"
                  ref={backgroundInputRef}
                />
                <Button
                  type="button"
                  onClick={() => backgroundInputRef.current.click()}
                  className="w-full"
                >
                  Select Background Image
                </Button>
                <div className="mt-2 h-40 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center">
                  {backgroundPreview ? (
                    <img
                      src={backgroundPreview}
                      alt="Background Preview"
                      className="max-h-full max-w-full object-cover"
                    />
                  ) : (
                    <p className="text-gray-500">
                      Select a background image to preview
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <Button
                  type="outline"
                  className="w-1/2 mt-6"
                  onClick={() => {
                    reloadPage();
                    setShowForm(false);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-1/2 mt-6 ml-1">
                  {homePageButtonText}
                </Button>
              </div>
            </form>
          )}
          {homePageList.length > 0 && !showForm && (
            <div className="container mx-auto">
              <DataTable
                columns={columns}
                data={homePageList}
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
