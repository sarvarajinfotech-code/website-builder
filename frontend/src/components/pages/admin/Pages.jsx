"use client";

import { useState } from "react";
import { Search, Lock } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const initialPages = [
  { id: "1", name: "Home", url: "/", visible: true, disabled: true },
  { id: "2", name: "Clients", url: "/clients", visible: true, disabled: false },
  { id: "3", name: "Team", url: "/team", visible: true, disabled: false },
  {
    id: "4",
    name: "Testimonials",
    url: "/testimonials",
    visible: true,
    disabled: false,
  },
  {
    id: "5",
    name: "Why Choose Us",
    url: "/why-choose-us",
    visible: true,
    disabled: false,
  },
  { id: "6", name: "Pricing", url: "/pricing", visible: true, disabled: false },
  {
    id: "7",
    name: "Products",
    url: "/products",
    visible: true,
    disabled: false,
  },
  {
    id: "8",
    name: "Services",
    url: "/services",
    visible: true,
    disabled: false,
  },
  { id: "9", name: "Blogs", url: "/blogs", visible: true, disabled: false },
  { id: "10", name: "About", url: "/about", visible: true, disabled: false },
  {
    id: "11",
    name: "Contact",
    url: "/contact",
    visible: true,
    disabled: false,
  },
  {
    id: "12",
    name: "Features",
    url: "/features",
    visible: true,
    disabled: false,
  },
  { id: "13", name: "FAQ", url: "/faq", visible: true, disabled: false },
  {
    id: "14",
    name: "Dynamic",
    url: "/dynamic",
    visible: true,
    disabled: false,
  },
  { id: "15", name: "Footer", url: "/footer", visible: true, disabled: true },
];

export default function Pages() {
  const [pages, setPages] = useState(initialPages);
  const [search, setSearch] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const filteredPages = pages.filter((page) =>
    page.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = (id) => {
    setPages(
      pages.map((page) =>
        page.id === id && !page.disabled
          ? { ...page, visible: !page.visible }
          : page
      )
    );
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setPages(
      pages.map((page) =>
        page.disabled ? page : { ...page, visible: newSelectAll }
      )
    );
  };

  const handleSaveConfiguration = () => {
    console.log("Current Page Configuration:", pages);
  };

  const enabledPages = pages.filter((page) => !page.disabled);
  const allEnabled = enabledPages.every((page) => page.visible);
  const someEnabled = enabledPages.some((page) => page.visible);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Page Configuration</h1>
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search pages"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 w-[300px]"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="selectAll"
              checked={allEnabled}
              onCheckedChange={handleSelectAll}
              aria-label="Toggle visibility for all non-disabled pages"
            />
            <label
              htmlFor="selectAll"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Select All
            </label>
          </div>
        </div>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Page Name</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="text-right">Visibility</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPages.map((page) => (
                <TableRow
                  key={page.id}
                  className={page.disabled ? "opacity-50" : ""}
                >
                  <TableCell className="font-medium">
                    {page.name}
                    {page.disabled && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Lock className="inline-block ml-2 h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent className="bg-white text-black p-2 rounded shadow-lg">
                            <p>This page cannot be modified</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </TableCell>
                  <TableCell>{page.url}</TableCell>
                  <TableCell className="text-right">
                    <Switch
                      checked={page.visible}
                      onCheckedChange={() => handleToggle(page.id)}
                      disabled={page.disabled}
                      aria-label={`Toggle visibility for ${page.name}`}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveConfiguration}>Save Configuration</Button>
        </div>
      </div>
    </div>
  );
}
