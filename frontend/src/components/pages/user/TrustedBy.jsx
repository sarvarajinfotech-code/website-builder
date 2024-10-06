import { useEffect, useState } from "react";
import api from "@/utility/api";

export default function TrustedBy() {
  const [clients, setClients] = useState([]);
  useEffect(() => {
    async function fetchClients() {
      const response = await api.getClientDetails();
      if (response.length > 0) {
        setClients(response);
      } else {
        setClients([]);
      }
    }
    fetchClients();
  }, []);

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-8">
          TRUSTED BY TEAMS FROM AROUND THE WORLD
        </h2>
        <div
          className={
            "flex items-center justify-center space-x-8 overflow-x-auto "
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
