import { useEffect, useState } from "react";
import api from "@/utility/api";
import Constants from "@/utility/Constants";

export default function TrustedBy() {
  const [clients, setClients] = useState([]);
  const [clientHeader, setClientHeader] = useState(null);
  const [tagline, setTagLine] = useState(null);
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
      const resposne = await api.getHeaderInfo(Constants.CLIENT_PAGE);
      if (resposne.length > 0) {
        setClientHeader(resposne[0].HEADER_TEXT);
        setTagLine(resposne[0].TAG_LINE);
      } else {
        setClientHeader(null);
      }
    }
    fetchClients();
    fetchClientHeader();
  }, []);

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        {clientHeader && (
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-8">
            {clientHeader}
          </h2>
        )}
        {tagline && (
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            {tagline}
          </p>
        )}

        <div
          className={
            "flex items-center justify-center space-x-8 overflow-x-auto mt-6"
          }
        >
          {clients.map((client) => (
            <div
              key={client.ID}
              className="flex-shrink-0 h-12 w-32 flex items-center justify-center bg-white border border-gray-300 rounded-md"
            >
              <img
                src={client.CLIENT_LOGO}
                alt={`${client.CLIENT_NAME} logo`}
                width={128}
                height={48}
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
