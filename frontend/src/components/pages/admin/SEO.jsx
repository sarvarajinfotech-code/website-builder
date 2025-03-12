"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Save, RefreshCw } from "lucide-react";
import api from "@/utility/api";
import { useToast } from "@/hooks/use-toast";
import { AlertCircle, CheckCircle } from "lucide-react";

// Section component
const Section = ({ section, isExpanded, onToggle }) => {
  const [expanded, setExpanded] = useState(isExpanded || false);
  const [loading, setLoading] = useState(false);
  const [seoDetails, setSeoDetails] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    keywords: "",
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setExpanded(isExpanded);
  }, [isExpanded]);

  useEffect(() => {
    if (expanded && !seoDetails && !loading) {
      setLoading(true);
      api
        .getSEOBySection(section.PAGE_NAME)
        .then((response) => {
          const data = response;
          setSeoDetails(data);
          console.log(data);
          if (data) {
            setFormData({
              title: data.title || "",
              description: data.description || "",
              keywords: data.keywords || "",
            });
          }
        })
        .finally(() => setLoading(false));
    }
  }, [expanded, section.PAGE_NAME, seoDetails]);

  const toggleExpand = () => {
    const newExpandedState = !expanded;
    setExpanded(newExpandedState);
    if (onToggle) {
      onToggle(section.PAGE_NAME, newExpandedState);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.keywords.trim()) newErrors.keywords = "Keywords are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSaving(true);
    setMessage("");

    const apiCall = seoDetails
      ? api.updateSEOBySection(section.PAGE_NAME, {
          ...formData,
          section: section.PAGE_NAME,
        })
      : api.saveSEO({ ...formData, section: section.PAGE_NAME });

    apiCall
      .then((response) => {
        setSeoDetails(formData);
        setMessage(response.message);
        toast({
          title: (
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>{seoDetails ? "Updated" : "Saved"} SEO details</span>
            </div>
          ),
        });
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: (
            <div className="flex items-center gap-2 text-white">
              <AlertCircle className="h-5 w-5" />
              <span>
                Error: Failed to {seoDetails ? "update" : "save"} SEO details
              </span>
            </div>
          ),
        });
      })
      .finally(() => setSaving(false));
  };

  return (
    <div className="mb-4 border rounded-lg overflow-hidden">
      <div
        className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
        onClick={toggleExpand}
      >
        <h3 className="font-medium text-gray-800">{section.PAGE_NAME}</h3>
        <button className="text-gray-500 hover:text-gray-700">
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {expanded && (
        <div className="p-4 border-t">
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-800"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter SEO title"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  rows="3"
                  placeholder="Enter SEO description"
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Keywords
                </label>
                <input
                  type="text"
                  name="keywords"
                  value={formData.keywords}
                  onChange={handleInputChange}
                  className={`w-full p-2 border rounded-md ${
                    errors.keywords ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter keywords separated by commas"
                />
                {errors.keywords && (
                  <p className="mt-1 text-sm text-red-500">{errors.keywords}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {message && (
                    <span className="text-sm text-green-600">{message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="ml-auto inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {saving ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2 h-4 w-4 border-2 border-t-transparent border-white rounded-full"></span>
                      Saving...
                    </span>
                  ) : seoDetails ? (
                    <span className="flex items-center">
                      <RefreshCw size={16} className="mr-2" />
                      Update
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Save size={16} className="mr-2" />
                      Save
                    </span>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default function SEO() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});
  const [allExpanded, setAllExpanded] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .getPathDetails()
      .then((response) => {
        const data = response;
        setSections(data);
        // Initialize expanded sections state
        const initialExpandedState = {};
        data.forEach((section) => {
          initialExpandedState[section.PAGE_NAME] = false;
        });
        setExpandedSections(initialExpandedState);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSectionToggle = (sectionId, isExpanded) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: isExpanded,
    }));
  };

  const toggleAllSections = () => {
    const newExpandedState = !allExpanded;
    setAllExpanded(newExpandedState);

    const updatedExpandedSections = {};
    sections.forEach((section) => {
      updatedExpandedSections[section.PAGE_NAME] = newExpandedState;
    });
    setExpandedSections(updatedExpandedSections);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">SEO Management</h2>
        <button
          onClick={toggleAllSections}
          className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          {allExpanded ? (
            <>
              <ChevronUp size={16} className="mr-1" />
              Collapse All
            </>
          ) : (
            <>
              <ChevronDown size={16} className="mr-1" />
              Expand All
            </>
          )}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800"></div>
        </div>
      ) : (
        <div>
          {sections.map((section) => (
            <Section
              key={section.PAGE_NAME}
              section={section}
              isExpanded={expandedSections[section.PAGE_NAME]}
              onToggle={handleSectionToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
}
