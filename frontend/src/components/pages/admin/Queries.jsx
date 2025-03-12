import React, { useEffect, useState } from "react";
import { DataTable } from "./commons/DataTable";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Plus, Download } from "lucide-react";
import api from "@/utility/api";
import { exportToExcel } from "@/utility/excelService";

export default function Queries() {
  const [queries, setQueries] = useState([]);

  //this field is important to order the column names and include the columns in excel
  const columnOrder = [
    "ID",
    "email",
    "first_name",
    "last_name",
    "phone_number",
    "query",
    "created_at",
  ];

  const columns = [
    {
      accessorKey: "first_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            First Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "last_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
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
      accessorKey: "query",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Query
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "phone_number",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone Number
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    async function fetchQueries() {
      const response = await api.getGetInTouchEntries();
      if (response.length > 0) {
        const sortedResponse = response.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setQueries(sortedResponse);
      } else {
        setQueries([]);
      }
    }
    fetchQueries();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <DataTable
        columns={columns}
        data={queries}
        icon={<Download />}
        buttonText="Export data"
        onButtonClick={() => {
          exportToExcel(queries, columnOrder, "queries.xlsx");
        }}
      />
    </div>
  );
}
