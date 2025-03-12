import { useEffect, useState, useRef } from "react";
import api from "@/utility/api";
import Constants from "@/utility/Constants";

export default function TrustedBy({ seo }) {
  const [clients, setClients] = useState([]);
  const [clientHeader, setClientHeader] = useState(null);
  const [tagline, setTagline] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    async function fetchClients() {
      const response = await api.getClientDetails();
      if (response.length > 0) {
        setClients(response);
      } else {
        setClients([]);
      }
    }
    async function fetchClientHeader() {
      const response = await api.getHeaderInfo(Constants.CLIENT_PAGE);
      if (response.length > 0) {
        setClientHeader(response[0].HEADER_TEXT);
        setTagline(response[0].TAG_LINE);
      } else {
        setClientHeader(null);
      }
    }
    fetchClients();
    fetchClientHeader();
  }, []);

  useEffect(() => {
    if (scrollRef.current && clients.length > 0) {
      const scrollContainer = scrollRef.current;
      const scrollContent = scrollContainer.firstChild;

      const animateScroll = () => {
        if (scrollContainer.scrollLeft >= scrollContent.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft += 1;
        }
      };

      const intervalId = setInterval(animateScroll, 20);

      return () => clearInterval(intervalId);
    }
  }, [clients]);

  return (
    <>
      {seo && (
        <Helmet>
          <title>{seo.title}</title>
          <meta name="description" content={seo.description} />
          <meta name="keywords" content={seo.keywords} />
        </Helmet>
      )}
      <section className="py-12 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            {clientHeader && (
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl">
                {clientHeader}
              </h2>
            )}
            {tagline && (
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
                {tagline}
              </p>
            )}
          </div>

          <div className="relative overflow-hidden">
            <div ref={scrollRef} className="overflow-hidden">
              <div className="flex items-center space-x-8 animate-scroll">
                {[...clients, ...clients].map((client, index) => (
                  <div
                    key={`${client.ID}-${index}`}
                    className="flex-shrink-0 h-16 w-40 flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md transition-colors duration-200"
                  >
                    <img
                      src={client.CLIENT_LOGO}
                      alt={`${client.CLIENT_NAME} logo`}
                      width={160}
                      height={64}
                      className="max-h-12 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-gray-50 dark:from-gray-800 to-transparent z-10"></div>
            <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-gray-50 dark:from-gray-800 to-transparent z-10"></div>
          </div>
        </div>
      </section>
    </>
  );
}
