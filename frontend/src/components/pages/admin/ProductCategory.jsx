import React, { useEffect, useState } from "react";
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FolderPlus, Plus, ArrowUpDown, MoreHorizontal } from "lucide-react";

export default function ProductCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [categoryButtonText, setCategoryButtonText] = useState("Save Category");
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    if (categoryButtonText === "Save Category") {
      const response = await api.saveProductCategoryDetails({
        category_name: categoryName,
      });
      console.log(response);
    } else if (categoryButtonText === "Update category") {
      const response = await api.updateProductCategoryDetails(
        { category_name: categoryName },
        categoryId
      );
      console.log(response);
    }
    reloadPage();
    setShowForm(false);
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
    const resposne = await api.deleteProductCategoryDetails(id);
    console.log(resposne);
    reloadPage();
  };

  const reloadPage = () => {
    fetachCategoryDetails();
    setShowForm(false);
    setCategoryButtonText("Save Category");
    setCategoryId(null);
    setCategoryName("");
  };
  async function fetachCategoryDetails() {
    const response = await api.getProductCategoryDetails();
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
