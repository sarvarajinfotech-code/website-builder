"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/utility/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, ArrowUpDown, MoreHorizontal, FolderPlus } from "lucide-react";
import EmptyState from "./commons/EmptyState";
import { DataTable } from "./commons/DataTable";

export default function FAQ() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [faqId, setFaqId] = useState(null);
  const [faqList, setFaqList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [faqButtonText, setFaqButtonText] = useState("Save FAQ");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const faqData = {
      question: question,
      answer: answer,
    };
    if (faqButtonText === "Save FAQ") {
      const response = await api.saveFAQDetails(faqData);
      console.log(response);
    } else if (faqButtonText === "Update FAQ") {
      const response = await api.updateFAQDetails(faqData, faqId);
      console.log(response);
    }
    reloadPage();
  };

  const columns = [
    {
      accessorKey: "QUESTION",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Question
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "ANSWER",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Answer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const faq = row.original;

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
              <DropdownMenuItem onClick={() => handleFAQEdit(faq)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFAQDelete(faq.ID)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleFAQEdit = async (row) => {
    setQuestion(row.QUESTION);
    setAnswer(row.ANSWER);
    setFaqId(row.ID);
    setFaqButtonText("Update FAQ");
    setShowForm(true);
  };

  const handleFAQDelete = async (id) => {
    const response = await api.deleteFAQDetails(id);
    console.log(response);
    reloadPage();
  };

  const reloadPage = () => {
    setQuestion("");
    setAnswer("");
    setFaqId(null);
    setShowForm(false);
    fetchFAQDetails();
    setFaqButtonText("Save FAQ");
  };

  async function fetchFAQDetails() {
    const response = await api.getFAQDetails();
    if (response.length > 0) {
      setFaqList(response);
    } else {
      setFaqList([]);
    }
  }

  useEffect(() => {
    fetchFAQDetails();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {faqList.length === 0 && !showForm && (
        <EmptyState
          heading="No FAQs"
          subheading="Add a FAQ"
          buttonText="New FAQ"
          onClick={() => setShowForm(true)}
          icon={<FolderPlus className="w-8 h-8" />}
        />
      )}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          {/* Question Input */}
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Input
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question"
              required
            />
          </div>

          {/* Answer Input */}
          <div className="space-y-2">
            <Label htmlFor="answer">Answer</Label>
            <Input
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter your answer"
              required
            />
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              onClick={() => {
                setShowForm(false);
                reloadPage();
              }}
              className="w-1/2"
            >
              Cancel
            </Button>
            <Button type="submit" className="w-1/2 ml-1">
              {faqButtonText}
            </Button>
          </div>
        </form>
      )}
      {faqList.length > 0 && !showForm && (
        <div className="container mx-auto">
          <DataTable
            columns={columns}
            data={faqList}
            icon={<Plus />}
            buttonText="Add New Item"
            onButtonClick={() => setShowForm(true)}
          />
        </div>
      )}
    </div>
  );
}
