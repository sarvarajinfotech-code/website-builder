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

export default function Products() {
  const [activeTab, setActiveTab] = useState("header");
  const [headerText, setHeaderText] = useState("");
  const [tagline, setTagline] = useState("");
  const [headerTextButton, setHeaderTextButton] = useState("Save Header");
  const [headerId, setHeaderId] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    productIcon: "",
    productDescription: "",
    learnMoreLink: "",
    showLearnMore: false,
  });
  const [productList, setProductList] = useState([]);
  const [productId, setProductId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [productCategoryList, setProductCategoryList] = useState([]);
  const [productButtonText, setProductButtonText] = useState("Save Product");

  const columns = [
    {
      accessorKey: "PRODUCT_CATEGORY",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "PRODUCT_NAME",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "PRODUCT_DESCRIPTION",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product Description
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
              <DropdownMenuItem onClick={() => handleProductEdit(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleProductDelete(row.original.ID)}
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
    setProductButtonText("Save Product");
    fetchProductDetails();
    setFormData({
      productName: "",
      productCategory: "",
      productIcon: "",
      productDescription: "",
      learnMoreLink: "",
      showLearnMore: false,
    });
    setProductId(null);
    setShowForm(false);
  };

  const handleProductEdit = (row) => {
    setFormData({
      productName: row.PRODUCT_NAME,
      productCategory: row.PRODUCT_CATEGORY,
      productIcon: row.SVG_ICON,
      productDescription: row.PRODUCT_DESCRIPTION,
      learnMoreLink: row.LEARN_MORE_LINK,
      showLearnMore: row.LEARN_MORE,
    });
    setShowForm(true);
    setProductId(row.ID);
    setProductButtonText("Update Product");
  };
  const handleProductDelete = async (id) => {
    const resposne = await api.deleteProductDetails(id);
    console.log(resposne);
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

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      product_name: formData.productName,
      product_category: formData.productCategory,
      svg_icon: formData.productIcon,
      product_description: formData.productDescription,
      learn_more: formData.showLearnMore,
      learn_more_link: formData.learnMoreLink ? formData.learnMoreLink : "",
    };
    if (productButtonText === "Save Product") {
      const resposne = await api.saveProductDetails(payload);
      console.log(resposne);
    } else if (productButtonText === "Update Product") {
      const response = await api.updateProductDetails(payload, productId);
      console.log(response);
    }
    reloadPage();
  };

  const handleHeaderSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      header_text: headerText,
      tagline: tagline,
      page: Constants.PRODUCTS,
    };
    if (headerTextButton === "Save Header") {
      const response = await api.saveHeaderInfo(payload);
      console.log(response);
    } else if (headerTextButton === "Update Header") {
      const response = await api.updateHeaderInfo(payload, headerId);
    }
  };

  async function fetchProductDetails() {
    const response = await api.getProductDetails();
    if (response.length > 0) {
      setProductList(response);
    } else {
      setProductList([]);
    }
  }
  useEffect(() => {
    async function fetchHeaderDetails() {
      const response = await api.getHeaderInfo(Constants.PRODUCTS);
      if (response.length > 0) {
        setHeaderTextButton("Update Header");
        setHeaderText(response[0].HEADER_TEXT);
        setTagline(response[0].TAG_LINE);
        setHeaderId(response[0].ID);
      } else {
        setHeaderTextButton("Save Header");
      }
    }
    async function fetchProductCategoryDetails() {
      const respone = await api.getProductCategoryDetails();
      if (respone.length > 0) {
        setProductCategoryList(respone);
      } else {
        setProductCategoryList([]);
      }
    }
    fetchHeaderDetails();
    fetchProductDetails();
    fetchProductCategoryDetails();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-3xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="header">Product Header</TabsTrigger>
          <TabsTrigger value="product">Add Product</TabsTrigger>
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
          {productList.length === 0 && !showForm && (
            <EmptyState
              heading="No product"
              subheading="Add a product"
              buttonText="New product"
              onClick={() => {
                setShowForm(true);
              }}
              icon={<FolderPlus className="w-8 h-8" />}
            />
          )}
          {showForm && (
            <form
              onSubmit={handleProductSubmit}
              className="space-y-6 max-w-md mx-auto"
            >
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  name="productName"
                  placeholder="Enter product name"
                  value={formData.productName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productCategory">Product Category</Label>
                <Select
                  name="productCategory"
                  value={formData.productCategory}
                  onValueChange={(value) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      productCategory: value,
                    }))
                  }
                  required
                >
                  <SelectTrigger id="productCategory">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {productCategoryList.map((category, index) => (
                      <SelectItem key={index} value={category.CATEGORY_NAME}>
                        {category.CATEGORY_NAME}
                      </SelectItem>
                    ))}
                    {/* <SelectItem value="category1">Category 1</SelectItem>
                    <SelectItem value="category2">Category 2</SelectItem>
                    <SelectItem value="category3">Category 3</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="productIcon">Product SVG Icon</Label>
                <Input
                  id="productIcon"
                  name="productIcon"
                  placeholder="Paste SVG code here"
                  value={formData.productIcon}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productDescription">Product Description</Label>
                <Textarea
                  id="productDescription"
                  name="productDescription"
                  placeholder="Enter product description"
                  value={formData.productDescription}
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
                    reloadPage();
                  }}
                  className=" w-1/2"
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-1/2 ml-1">
                  {productButtonText}
                </Button>
              </div>
            </form>
          )}
          {productList.length > 0 && !showForm && (
            <div className="container mx-auto">
              <DataTable
                columns={columns}
                data={productList}
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
