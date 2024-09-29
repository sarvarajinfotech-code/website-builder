import React, { useState, useRef } from "react";
import {
  ArrowUpDown,
  MoreHorizontal,
  FolderPlus,
  Plus,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

const data = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
];

export const columns = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
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
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("navigation");
  const [navigationFormData, setNavigationFormData] = useState({
    logo: null,
    darkTheme: false,
  });
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
    inSlider: "no",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [backgroundPreview, setBackgroundPreview] = useState(null);
  const logoInputRef = useRef(null);
  const backgroundInputRef = useRef(null);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(navigationFormData);
  // };

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

  const handleSubmit = (event, formType) => {
    event.preventDefault();
    if (formType === "navigation") {
      console.log("Navigation Form Data:", navigationFormData);
    } else {
      console.log("Home Page Form Data:", homePageFormData);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setShowWarning(false);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleNewSlide = () => {
    // Logic to create a new project
    console.log("Creating a new project");
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* <EmptyState
        heading="No Images"
        subheading="Add a image to home page"
        buttonText="New Image"
        onClick={handleNewSlide}
        icon={<FolderPlus className="w-8 h-8" />}
      /> */}
      {/* <div className="container mx-auto">
        <DataTable
          columns={columns}
          data={data}
          icon={<Plus />} // Pass the icon here
          buttonText="Add New Item" // Button text
          onButtonClick={() => console.log("Button clicked")} // Click handler
        />
      </div> */}
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
              Save Configuration
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="homepage">
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
                  <Label htmlFor="primaryButtonText">Primary Button Text</Label>
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
                  />
                </div>
                <div>
                  <Label htmlFor="primaryButtonType">Primary Button Type</Label>
                  <Select
                    value={homePageFormData.primaryButtonType}
                    onValueChange={(value) =>
                      handleHomePageInputChange("primaryButtonType", value)
                    }
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
                  <Label htmlFor="primaryButtonLink">Primary Button Link</Label>
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

            <Button type="submit" className="w-full mt-6">
              Save Home Page Configuration
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
