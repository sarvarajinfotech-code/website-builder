import api from "@/utility/api";
import Constants from "@/utility/Constants";
import { useEffect, useState } from "react";

export default function WhyChooseUs({ seo }) {
  const [headerText, setHeaderText] = useState(null);
  const [tagline, setTagline] = useState(null);
  const [reasonList, setReasonList] = useState([]);

  useEffect(() => {
    async function fetchReasonDetails() {
      const response = await api.getReasonsDetails();
      if (response.length > 0) {
        setReasonList(response);
      } else {
        setReasonList([]);
      }
    }
    async function fetchHeader() {
      const resposne = await api.getHeaderInfo(Constants.WHY_CHOOSE_US);
      if (resposne.length > 0) {
        setHeaderText(resposne[0].HEADER_TEXT);
        setTagline(resposne[0].TAG_LINE);
      } else {
        setHeaderText(null);
      }
    }
    fetchHeader();
    fetchReasonDetails();
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
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="container mx-auto px-4 py-16">
          <header className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">{headerText}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {tagline}
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasonList.map((reason) => (
              <div
                key={reason.ID}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={reason.IMAGE}
                  alt={reason.HEADER}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {reason.HEADER}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {reason.EXPLANATION}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
