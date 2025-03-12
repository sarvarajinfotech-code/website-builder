import { useEffect, useState } from "react";
import Constants from "@/utility/Constants";
import api from "@/utility/api";
import { Helmet } from "react-helmet-async";

export default function Component({ seo }) {
  const [headerText, setHeaderText] = useState(null);
  const [tagline, setTagLine] = useState(null);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter(
          (service) => service.SERVICE_CATEGORY === activeCategory
        );

  useEffect(() => {
    async function fetchHeaderText() {
      const response = await api.getHeaderInfo(Constants.SERVICES);
      if (response.length > 0) {
        setHeaderText(response[0].HEADER_TEXT);
        setTagLine(response[0].TAG_LINE);
      }
    }

    async function fetchServices() {
      const response = await api.getServiceDetails();
      if (response.length > 0) {
        setServices(response);
        setCategories([
          "All",
          ...new Set(response.map((service) => service.SERVICE_CATEGORY)),
        ]);
      } else {
        setServices([]);
      }
    }
    fetchHeaderText();
    fetchServices();
  }, []);

  return (
    <>
      {seo && (
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <meta name="keywords" content={seo.keywords} />
        </Helmet>
      )}
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-50 dark:opacity-20">
          <div className="absolute inset-0 bg-grid-gray-900/[0.2] dark:bg-grid-gray-100/[0.2] bg-[size:50px_50px]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-96 w-96 rounded-full bg-purple-500 mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
            <div className="h-96 w-96 rounded-full bg-yellow-500 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
            <div className="h-96 w-96 rounded-full bg-pink-500 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {headerText && (
            <h1 className="text-4xl font-bold mb-4">{headerText}</h1>
          )}
          {tagline && <p className="text-xl mb-8">{tagline}</p>}

          <div className="mb-8">
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full ${
                    activeCategory === category
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => {
                    setActiveCategory(category);
                    console.log(category);
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <div
                key={service.ID}
                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg"
              >
                <div className="bg-purple-600 p-2 w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white">
                  <div
                    dangerouslySetInnerHTML={{ __html: service.SVG_ICON }}
                    className="w-full h-full flex items-center justify-center"
                  ></div>
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {service.SERVICE_NAME}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {service.SERVICE_DESCRIPTION}
                </p>
                {service.LEARN_MORE && (
                  <a
                    href={service.LEARN_MORE_LINK}
                    className="text-purple-600 dark:text-purple-400 hover:underline"
                  >
                    Learn more →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
