import React, { useState, useEffect } from "react";
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
import { FolderPlus, Plus, ArrowUpDown, MoreHorizontal } from "lucide-react";
import Constants from "@/utility/admin/Constants";
import api from "@/utility/admin/api";
import EmptyState from "./commons/EmptyState";
import { DataTable } from "./commons/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Pricing() {
  const [activeTab, setActiveTab] = useState("header");
  const [headerText, setHeaderText] = useState("");
  const [tagline, setTagline] = useState("");
  const [headerTextButton, setHeaderTextButton] = useState("Save Header");
  const [headerId, setHeaderId] = useState(null);
  const [planType, setPlanType] = useState("");
  const [planTypeID, setPlanTypeID] = useState(null);
  const [planTypeList, setplanTypeList] = useState([]);
  const [planTypeButtonText, setPlanTypeButtonText] = useState("Save Plan");
  const [showPlanTypeForm, setShowPlanTypeForm] = useState(false);
  const [pricingData, setPricingData] = useState({
    priceTagLine: "",
    currencyType: "",
    price: "0.00",
    featuresIncluded: "",
    featuresNotIncluded: "",
    ctaButtonText: "",
    ctaButtonLink: "",
    offer: "",
    offerPrice: "0.00",
    planType: "",
  });
  const [priceButtonText, setPriceButtonText] = useState("Save Price");
  const [showPiceForm, setShowPriceForm] = useState(false);
  const [priceList, setPrinceList] = useState([]);
  const [priceId, setPriceId] = useState(null);

  const planTypeColumns = [
    {
      accessorKey: "PLAN_TYPE",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Plan Type
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
                onClick={() => handlePlanTypeEdit(row.original)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePlanTypeDelete(row.original.ID)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const priceColumns = [
    {
      accessorKey: "PLAN_TYPE",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Plan Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "PRICE_TAGLINE",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price Tagline
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "PRICE",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "CURRENCY_TYPE",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Current Type
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "OFFER",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Offer
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "OFFER_PRICE",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Offer Price
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "FEATURES_INCLUDED",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Features Included
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "FEATURES_EXCLUDED",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Features not Included
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "CTA_BUTTON_TEXT",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            CTA Button Text
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "CTA_BUTTON_LINK",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            CTA Button Link
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
              <DropdownMenuItem onClick={() => handlePriceEdit(row.original)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handlePriceDelete(row.original.ID)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPricingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCurrencyChange = (value) => {
    setPricingData((prev) => ({ ...prev, currencyType: value }));
  };

  const handleHeaderSubmit = async (e) => {
    e.preventDefault();
    if (headerTextButton === "Save Header") {
      let payload = {
        header_text: headerText,
        tagline: tagline,
        page: Constants.PRICING_PAGE,
      };
      const response = await api.saveHeaderInfo(payload);
      console.log(response);
    } else if (headerTextButton === "Update Header") {
      let payload = {
        header_text: headerText,
        tagline: tagline,
        page: Constants.PRICING_PAGE,
      };
      const response = await api.updateHeaderInfo(payload, headerId);
    }
  };

  const handlePlanTypeEdit = async (row) => {
    setPlanType(row.PLAN_TYPE);
    setPlanTypeID(row.ID);
    setShowPlanTypeForm(true);
    setPlanTypeButtonText("Update Plan");
  };

  const handlePlanTypeDelete = async (id) => {
    const resposne = await api.deletePricingPlanDetails(id);
    console.log(resposne);
    reloadPlanTypePage();
  };

  const reloadPlanTypePage = () => {
    setPlanTypeButtonText("Save Plan");
    setPlanType("");
    setPlanTypeID(null);
    fetchPlanDetails();
    setShowPlanTypeForm(false);
  };

  const reloadPricePage = () => {
    setPriceButtonText("Save Price");
    fetchPriceDetails();
    setShowPriceForm(false);
    setPricingData({
      priceTagLine: "",
      currencyType: "",
      price: "0.00",
      featuresIncluded: "",
      featuresNotIncluded: "",
      ctaButtonText: "",
      ctaButtonLink: "",
      offer: "",
      offerPrice: "0.00",
      planType: "",
    });
  };

  const handlePlanSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      plan_type: planType,
    };
    if (planTypeButtonText === "Save Plan") {
      const response = await api.savePricingPlanDetails(payload);
      console.log(response);
    } else if (planTypeButtonText === "Update Plan") {
      const response = await api.updatePricingPlanDetails(payload, planTypeID);
      console.log(response);
    }
    reloadPlanTypePage();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      price_tagline: pricingData.priceTagLine,
      plan_type: pricingData.planType,
      currency_type: pricingData.currencyType,
      price: pricingData.price,
      offer: pricingData.offer === "Yes" ? true : false,
      offer_price: pricingData.offerPrice,
      features_included: pricingData.featuresIncluded,
      features_excluded: pricingData.featuresNotIncluded,
      cta_button_text: pricingData.ctaButtonText,
      cta_button_link: pricingData.ctaButtonLink,
    };
    if (priceButtonText === "Save Price") {
      const response = await api.savePricingDetails(payload);
      console.log(response);
    } else if (priceButtonText === "Update Price") {
      const response = await api.updatePricingDetails(payload, priceId);
      console.log(response);
    }
    reloadPricePage();
  };

  const handlePriceEdit = async (row) => {
    setPricingData({
      priceTagLine: row.PRICE_TAGLINE,
      currencyType: row.CURRENCY_TYPE,
      price: row.PRICE,
      featuresIncluded: row.FEATURES_INCLUDED,
      featuresNotIncluded: row.FEATURES_EXCLUDED,
      ctaButtonText: row.CTA_BUTTON_TEXT,
      ctaButtonLink: row.CTA_BUTTON_LINK,
      offer: row.OFFER ? "Yes" : "No",
      offerPrice: row.OFFER_PRICE,
      planType: row.PLAN_TYPE,
    });
    setPriceId(row.ID);
    setShowPriceForm(true);
    setPriceButtonText("Update Price");
  };

  const handlePriceDelete = async (id) => {
    const resposne = await api.deletePricingDetails(id);
    console.log(resposne);
    reloadPricePage();
  };

  async function fetchPlanDetails() {
    const response = await api.getPricingPlanDetails();
    if (response.length > 0) {
      setplanTypeList(response);
    } else {
      setplanTypeList([]);
    }
  }

  async function fetchPriceDetails() {
    const resposne = await api.getPricingDetails();
    if (resposne.length > 0) {
      setPrinceList(resposne);
    } else {
      setPrinceList([]);
    }
  }

  useEffect(() => {
    async function fetchHeaderDetails() {
      const response = await api.getHeaderInfo(Constants.PRICING_PAGE);
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
    fetchPlanDetails();
    fetchPriceDetails();
  }, []);

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
              {headerTextButton}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="plan" className="mt-6">
          {planTypeList.length === 0 && !showPlanTypeForm && (
            <EmptyState
              heading="No Plan Types"
              subheading="Add a plan type"
              buttonText="New plan"
              onClick={() => {
                setShowPlanTypeForm(true);
              }}
              icon={<FolderPlus className="w-8 h-8" />}
            />
          )}
          {showPlanTypeForm && (
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
              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => {
                    setShowPlanTypeForm(false);
                    reloadPlanTypePage();
                  }}
                  className=" w-1/2"
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-1/2 ml-1">
                  {planTypeButtonText}
                </Button>
              </div>
            </form>
          )}
          {planTypeList.length > 0 && !showPlanTypeForm && (
            <div className="container mx-auto">
              <DataTable
                columns={planTypeColumns}
                data={planTypeList}
                icon={<Plus />}
                buttonText="Add New Item"
                onButtonClick={() => {
                  setShowPlanTypeForm(true);
                }}
              />
            </div>
          )}
        </TabsContent>
        <TabsContent value="price" className="mt-6">
          {priceList.length === 0 && !showPiceForm && (
            <EmptyState
              heading="No Prices"
              subheading="Add a price"
              buttonText="New Price"
              onClick={() => {
                setShowPriceForm(true);
              }}
              icon={<FolderPlus className="w-8 h-8" />}
            />
          )}
          {showPiceForm && (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 max-w-md mx-auto"
            >
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
                    {planTypeList.map((plan, index) => (
                      <SelectItem key={index} value={plan.PLAN_TYPE}>
                        {plan.PLAN_TYPE}
                      </SelectItem>
                    ))}
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
                    <SelectItem value="NZD">
                      New Zealand Dollar (NZ$)
                    </SelectItem>
                    <SelectItem value="PEN">Peruvian Sol (S/)</SelectItem>
                    <SelectItem value="PHP">Philippine Peso (₱)</SelectItem>
                    <SelectItem value="PKR">Pakistani Rupee (₨)</SelectItem>
                    <SelectItem value="RUB">Russian Ruble (₽)</SelectItem>
                    <SelectItem value="SEK">Swedish Krona (kr)</SelectItem>
                    <SelectItem value="SGD">Singapore Dollar (S$)</SelectItem>
                    <SelectItem value="THB">Thai Baht (฿)</SelectItem>
                    <SelectItem value="TRY">Turkish Lira (₺)</SelectItem>
                    <SelectItem value="USD">
                      United States Dollar ($)
                    </SelectItem>
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
                    // // Reset offerPrice if the offer is not selected
                    if (value === "No") {
                      setPricingData({
                        ...pricingData,
                        offerPrice: "0.00",
                        offer: "No",
                      });
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
              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => {
                    setShowPriceForm(false);
                    reloadPricePage();
                  }}
                  className=" w-1/2"
                >
                  Cancel
                </Button>
                <Button type="submit" className="w-1/2 ml-1">
                  {priceButtonText}
                </Button>
              </div>
            </form>
          )}

          {priceList.length > 0 && !showPiceForm && (
            <div className="container mx-auto">
              <DataTable
                columns={priceColumns}
                data={priceList}
                icon={<Plus />}
                buttonText="Add New Item"
                onButtonClick={() => {
                  setShowPriceForm(true);
                }}
              />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
