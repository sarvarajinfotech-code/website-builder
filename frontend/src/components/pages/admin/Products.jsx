import React, { useState } from "react";
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

export default function Products() {
  const [activeTab, setActiveTab] = useState("header");
  const [headerText, setHeaderText] = useState("");
  const [tagline, setTagline] = useState("");
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    productIcon: "",
    productDescription: "",
    learnMoreLink: "",
    showLearnMore: false,
  });

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

  const handleProductSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleHeaderSubmit = (e) => {
    e.preventDefault();
    console.log("Header submitted:", { headerText, tagline });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {" "}
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
              Save Header
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="product" className="mt-6">
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
              >
                <SelectTrigger id="productCategory">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="category1">Category 1</SelectItem>
                  <SelectItem value="category2">Category 2</SelectItem>
                  <SelectItem value="category3">Category 3</SelectItem>
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
            <Button type="submit" className="w-full">
              Save Product
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
