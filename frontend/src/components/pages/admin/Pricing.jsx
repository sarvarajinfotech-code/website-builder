import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Pricing() {
  const [activeTab, setActiveTab] = useState("header");
  const [headerText, setHeaderText] = useState("");
  const [tagline, setTagline] = useState("");
  const [planType, setPlanType] = useState("");
  const [pricingData, setPricingData] = useState({
    priceTagLine: "",
    currencyType: "",
    price: "",
    featuresIncluded: "",
    featuresNotIncluded: "",
    ctaButtonText: "",
    ctaButtonLink: "",
    offer: "",
    offerPrice: "",
    planType: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPricingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrencyChange = (value) => {
    setPricingData((prev) => ({ ...prev, currencyType: value }));
  };

  const handleHeaderSubmit = (e) => {
    e.preventDefault();
    console.log("Header submitted:", { headerText, tagline });
    // Add your header submission logic here
  };

  const handlePlanSubmit = (e) => {
    e.preventDefault();
    console.log("Plan type submitted:", { planType });
    // Add your header submission logic here
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert comma-separated features to arrays
    const featuresIncludedArray = pricingData.featuresIncluded
      .split(",")
      .map((feature) => feature.trim());
    const featuresNotIncludedArray = pricingData.featuresNotIncluded
      .split(",")
      .map((feature) => feature.trim());

    const submissionData = {
      ...pricingData,
      featuresIncluded: featuresIncludedArray,
      featuresNotIncluded: featuresNotIncludedArray,
    };

    console.log("Pricing data submitted:", submissionData);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full max-w-3xl mx-auto"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="header">Pricing Header</TabsTrigger>
          <TabsTrigger value="plan">Add Plan</TabsTrigger>
          <TabsTrigger value="price">Add Price</TabsTrigger>
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
        <TabsContent value="plan" className="mt-6">
          <form
            onSubmit={handlePlanSubmit}
            className="space-y-6 max-w-md mx-auto"
          >
            <div>
              <Label htmlFor="headerText">Plan Type</Label>
              <Input
                id="planType"
                value={planType}
                onChange={(e) => setPlanType(e.target.value)}
                placeholder="Enter Plan type"
              />
            </div>

            <Button type="submit" className="w-full">
              Save Plan
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="price" className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
            <div className="space-y-2">
              <Label htmlFor="planType">Plan Type</Label>
              <Select
                id="planType"
                value={pricingData.planType}
                onValueChange={(value) =>
                  handleInputChange({ target: { name: "planType", value } })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select plan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priceTagLine">Price TagLine</Label>
              <Input
                id="priceTagLine"
                name="priceTagLine"
                value={pricingData.priceTagLine}
                onChange={handleInputChange}
                placeholder="Enter price Tagline"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currencyType">Currency Type</Label>
              <Select
                value={pricingData.currencyType}
                onValueChange={handleCurrencyChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {/* Add currency options here */}
                  <SelectItem value="ARS">Argentine Peso ($)</SelectItem>
                  <SelectItem value="AUD">Australian Dollar (A$)</SelectItem>
                  <SelectItem value="BRL">Brazilian Real (R$)</SelectItem>
                  <SelectItem value="CAD">Canadian Dollar (C$)</SelectItem>
                  <SelectItem value="CHF">Swiss Franc (CHF)</SelectItem>
                  <SelectItem value="CLP">Chilean Peso ($)</SelectItem>
                  <SelectItem value="COP">Colombian Peso ($)</SelectItem>
                  <SelectItem value="CZK">Czech Koruna (Kč)</SelectItem>
                  <SelectItem value="DKK">Danish Krone (kr)</SelectItem>
                  <SelectItem value="EUR">Euro (€)</SelectItem>
                  <SelectItem value="GBP">British Pound (£)</SelectItem>
                  <SelectItem value="HUF">Hungarian Forint (Ft)</SelectItem>
                  <SelectItem value="HKD">Hong Kong Dollar (HK$)</SelectItem>
                  <SelectItem value="ILS">Israeli New Shekel (₪)</SelectItem>
                  <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                  <SelectItem value="JPY">Japanese Yen (¥)</SelectItem>
                  <SelectItem value="MYR">Malaysian Ringgit (RM)</SelectItem>
                  <SelectItem value="MXN">Mexican Peso ($)</SelectItem>
                  <SelectItem value="NOK">Norwegian Krone (kr)</SelectItem>
                  <SelectItem value="NZD">New Zealand Dollar (NZ$)</SelectItem>
                  <SelectItem value="PEN">Peruvian Sol (S/)</SelectItem>
                  <SelectItem value="PHP">Philippine Peso (₱)</SelectItem>
                  <SelectItem value="PKR">Pakistani Rupee (₨)</SelectItem>
                  <SelectItem value="RUB">Russian Ruble (₽)</SelectItem>
                  <SelectItem value="SEK">Swedish Krona (kr)</SelectItem>
                  <SelectItem value="SGD">Singapore Dollar (S$)</SelectItem>
                  <SelectItem value="THB">Thai Baht (฿)</SelectItem>
                  <SelectItem value="TRY">Turkish Lira (₺)</SelectItem>
                  <SelectItem value="USD">United States Dollar ($)</SelectItem>
                  <SelectItem value="VND">Vietnamese Dong (₫)</SelectItem>
                  <SelectItem value="ZAR">South African Rand (R)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                value={pricingData.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                type="number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="offer">Do you want to give an offer?</Label>
              <Select
                id="offer"
                value={pricingData.offer}
                onValueChange={(value) => {
                  handleInputChange({ target: { name: "offer", value } });
                  // Reset offerPrice if the offer is not selected
                  if (value === "No") {
                    setPricingData({ ...pricingData, offerPrice: "" });
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select yes or no" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {pricingData.offer === "Yes" && (
              <div className="space-y-2">
                <Label htmlFor="offerPrice">Offer Price</Label>
                <Input
                  id="offerPrice"
                  name="offerPrice"
                  value={pricingData.offerPrice}
                  onChange={handleInputChange}
                  placeholder="Enter offer price"
                  type="number"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="featuresIncluded">
                Features Included (comma-separated)
              </Label>
              <Textarea
                id="featuresIncluded"
                name="featuresIncluded"
                value={pricingData.featuresIncluded}
                onChange={handleInputChange}
                placeholder="Enter features included, separated by commas"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuresNotIncluded">
                Features Not Included (comma-separated)
              </Label>
              <Textarea
                id="featuresNotIncluded"
                name="featuresNotIncluded"
                value={pricingData.featuresNotIncluded}
                onChange={handleInputChange}
                placeholder="Enter features not included, separated by commas"
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ctaButtonText">CTA Button Text</Label>
              <Input
                id="ctaButtonText"
                name="ctaButtonText"
                value={pricingData.ctaButtonText}
                onChange={handleInputChange}
                placeholder="Enter CTA button text"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ctaButtonLink">CTA Button Link</Label>
              <Input
                id="ctaButtonLink"
                name="ctaButtonLink"
                value={pricingData.ctaButtonLink}
                onChange={handleInputChange}
                placeholder="Enter CTA button link"
              />
            </div>

            <Button type="submit" className="w-full">
              Save Pricing
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
