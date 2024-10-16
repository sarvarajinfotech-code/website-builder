import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDown, ChevronUp } from "lucide-react";
import api from "@/utility/api";

export default function FAQComponent() {
  const [faqData, setFaqData] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    async function fetchFAQData() {
      const response = await api.getFAQDetails();
      if (response.length > 0) {
        setFaqData(response);
      } else {
        setFaqData([]);
      }
    }

    fetchFAQData();
  }, []);

  const toggleItem = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };
  return (
    <div className="bg-white dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full mx-auto p-4 text-gray-900 dark:text-gray-100">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={item.ID}
              className="border-b border-gray-200 dark:border-gray-700 pb-4"
            >
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleItem(index)}
                aria-expanded={expandedIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium">{item.QUESTION}</span>
                {expandedIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
              {expandedIndex === index && (
                <div
                  id={`faq-answer-${index}`}
                  className="mt-2 text-gray-600 dark:text-gray-300"
                >
                  {item.ANSWER}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
