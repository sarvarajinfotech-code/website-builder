import React, { useEffect, useState } from "react";
import { DataTable } from "./commons/DataTable";
import api from "@/utility/api";
import { ArrowUpDown, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportToExcel } from "@/utility/excelService";

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);

  //this field is important to order the column names and include the columns in excel
  const columnOrder = ["ID", "email"];

  const columns = [
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
    async function fetchSubscribers() {
      const response = await api.getSubscribers();
      if (response.length > 0) {
        setSubscribers(response);
      } else {
        setSubscribers([]);
      }
    }
    fetchSubscribers();
  }, []);
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <DataTable
        columns={columns}
        data={subscribers}
        icon={<Download />}
        buttonText="Export data"
        onButtonClick={() => {
          exportToExcel(subscribers, columnOrder, "subscribers.xlsx");
        }}
      />
    </div>
  );
}
