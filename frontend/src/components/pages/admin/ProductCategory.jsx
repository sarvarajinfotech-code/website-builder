import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProductCategory() {
  const [categoryName, setCategoryName] = useState("");
  const handleCategorySubmit = (e) => {
    e.preventDefault();
    console.log("Category submitted");
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
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
          />
        </div>
        <Button type="submit" className="w-full">
          Save Category
        </Button>
      </form>
    </div>
  );
}
