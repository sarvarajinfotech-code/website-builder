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

    // {
    //   id: "actions",
    //   cell: ({ row }) => {
    //     const payment = row.original;

    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant="ghost" className="h-8 w-8 p-0">
    //             <span className="sr-only">Open menu</span>
    //             <MoreHorizontal className="h-4 w-4" />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align="end" className="bg-white">
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuItem onClick={() => handleProductEdit(row.original)}>
    //             Edit
    //           </DropdownMenuItem>
    //           <DropdownMenuItem
    //             onClick={() => handleProductDelete(row.original.ID)}
    //           >
    //             Delete
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    // },
  ];
  useEffect(() => {
    async function fetchQueries() {
      const response = await api.getGetInTouchEntries();
      if (response.length > 0) {
        setQueries(response);
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
