import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/utility/api";
import EmptyState from "./commons/EmptyState";
import { DataTable } from "./commons/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FolderPlus,
  Plus,
  ArrowUpDown,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function BlogCategory() {
  const { toast } = useToast();

  const [categoryName, setCategoryName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryButtonText, setCategoryButtonText] = useState("Save Category");

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (categoryButtonText === "Save Category") {
      await api
        .saveBlogCategoryDetails({
          category_name: categoryName,
        })
        .then(() => {
          toast({
            title: (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Added New Blog Category</span>
              </div>
            ),
          });
          reloadPage();
          setShowForm(false);
        })
        .catch(() => {
          toast({
            variant: "destructive",
            title: (
              <div className="flex items-center gap-2 text-white">
                <AlertCircle className="h-5 w-5" />
                <span>Error: Failed to add Blog Category</span>
              </div>
            ),
          });
        });
    } else if (categoryButtonText === "Update category") {
      await api
        .updateBlogCategoryDetails({ category_name: categoryName }, categoryId)
        .then(() => {
          toast({
            title: (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Updated Blog Category</span>
              </div>
            ),
          });
          reloadPage();
          setShowForm(false);
        })
        .catch(() => {
          toast({
            variant: "destructive",
            title: (
              <div className="flex items-center gap-2 text-white">
                <AlertCircle className="h-5 w-5" />
                <span>Error: Failed to update Blog Category</span>
              </div>
            ),
          });
        });
    }
  };

  const columns = [
    {
      accessorKey: "CATEGORY_NAME",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
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
                onClick={() => handleCategoryEdit(row.original)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleCategoryDelete(row.original.ID)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleCategoryEdit = async (row) => {
    setCategoryName(row.CATEGORY_NAME);
    setCategoryId(row.ID);
    setCategoryButtonText("Update category");
    setShowForm(true);
  };

  const handleCategoryDelete = async (id) => {
    await api
      .deleteBlogCategoryDetails(id)
      .then(() => {
        toast({
          title: (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Deleted Blog Category</span>
            </div>
          ),
        });
        reloadPage();
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: (
            <div className="flex items-center gap-2 text-white">
              <AlertCircle className="h-5 w-5" />
              <span>Error: Failed to delte Blog Category</span>
            </div>
          ),
        });
      });
  };

  const reloadPage = () => {
    fetachCategoryDetails();
    setShowForm(false);
    setCategoryButtonText("Save Category");
    setCategoryId(null);
    setCategoryName("");
  };
  async function fetachCategoryDetails() {
    const response = await api.getBlogCategoryDetails();
    if (response.length > 0) {
      setCategoryList(response);
    } else {
      setCategoryList([]);
    }
  }
  useEffect(() => {
    fetachCategoryDetails();
  }, []);
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {categoryList.length === 0 && !showForm && (
        <EmptyState
          heading="No Category added"
          subheading="Add a Category"
          buttonText="New Category"
          onClick={() => {
            setShowForm(true);
          }}
          icon={<FolderPlus className="w-8 h-8" />}
        />
      )}
      {showForm && (
        <form
          onSubmit={handleCategorySubmit}
          className="space-y-6 max-w-md mx-auto"
        >
          <div className="space-y-2">
            <Label htmlFor="categoryName">Category Name</Label>
            <Input
              id="categoryName"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {categoryButtonText}
          </Button>
        </form>
      )}
      {categoryList.length > 0 && !showForm && (
        <div className="container mx-auto">
          <DataTable
            columns={columns}
            data={categoryList}
            icon={<Plus />}
            buttonText="Add New Item"
            onButtonClick={() => {
              setShowForm(true);
            }}
          />
        </div>
      )}
    </div>
  );
}
