import React, { useEffect, useState } from "react";
import { DataTable } from "./commons/DataTable";
import api from "@/utility/api";
import { ArrowUpDown, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { exportToExcel } from "@/utility/excelService";

export default function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);

  //this field is important to order the column names and include the columns in excel
  const columnOrder = ["ID", "email", "created_at"];

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
    async function fetchSubscribers() {
      const response = await api.getSubscribers();
      if (response.length > 0) {
        // Sort by created_at in descending order by default
        response.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
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
