"use client";

import { useEffect, useState } from "react";
import { Search, Lock, AlertCircle, CheckCircle } from "lucide-react";
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
import api from "@/utility/api";
import { useToast } from "@/hooks/use-toast";

export default function Pages() {
  const { toast } = useToast();

  const [pages, setPages] = useState([]);
  const [search, setSearch] = useState("");
  const [selectAll, setSelectAll] = useState(false);

  const filteredPages = pages.filter((page) =>
    page.PAGE_NAME.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = (id) => {
    setPages(
      pages.map((page) =>
        page.ID === id && !page.DISABLED ? { ...page, SHOW: !page.SHOW } : page
      )
    );
  };

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setPages(
      pages.map((page) =>
        page.DISABLED ? page : { ...page, SHOW: newSelectAll }
      )
    );
  };

  function toLowerCaseKeys(obj) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[key.toLowerCase()] = obj[key];
      return acc;
    }, {});
  }

  const handleSaveConfiguration = async () => {
    const lowerCasedPayload = pages.map((item) => toLowerCaseKeys(item));
    api
      .bulkUpdatePathDetails(lowerCasedPayload)
      .then((response) => {
        toast({
          title: (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Updated page configuration</span>
            </div>
          ),
        });
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: (
            <div className="flex items-center gap-2 text-white">
              <AlertCircle className="h-5 w-5" />
              <span>Error: Failed to update page configuration</span>
            </div>
          ),
        });
      });
  };

  const enabledPages = pages.filter((page) => !page.DISABLED);
  const allEnabled = enabledPages.every((page) => page.SHOW);

  useEffect(() => {
    async function fechPages() {
      const response = await api.getPathDetails();
      if (response.length > 0) {
        setPages(response);
      } else {
        setPages([]);
      }
    }
    fechPages();
  }, []);

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
                  key={page.ID}
                  className={page.DISABLED ? "opacity-50" : ""}
                >
                  <TableCell className="font-medium">
                    {page.PAGE_NAME}
                    {page.DISABLED && (
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
                  <TableCell>{page.PAGE_PATH}</TableCell>
                  <TableCell className="text-right">
                    <Switch
                      checked={page.SHOW}
                      onCheckedChange={() => handleToggle(page.ID)}
                      disabled={page.DISABLED}
                      aria-label={`Toggle visibility for ${page.PAGE_NAME}`}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSaveConfiguration}>
            Update Configuration
          </Button>
        </div>
      </div>
    </div>
  );
}
