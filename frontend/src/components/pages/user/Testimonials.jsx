import api from "@/utility/api";
import Constants from "@/utility/Constants";
import { useState, useEffect } from "react";

export default function Testimonials() {
  const [headerText, setHeaderText] = useState(null);
  const [tagline, setTagLine] = useState(null);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    async function fetchHeaderText() {
      const response = await api.getHeaderInfo(Constants.TESTIMONIALS);
      if (response.length > 0) {
        setHeaderText(response[0].HEADER_TEXT);
        setTagLine(response[0].TAG_LINE);
      }
    }

    async function fetchTestimonials() {
      const response = await api.getTestimonialsDetails();
      if (response.length > 0) {
        setTestimonials(response);
      } else {
        setTestimonials([]);
      }
    }
    fetchHeaderText();
    fetchTestimonials();
  }, []);
  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {headerText && (
          <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-2">
            {headerText}
          </h2>
        )}
        {tagline && (
          <p className="text-xl text-center text-gray-500 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
            {tagline}
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.ID}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 relative overflow-hidden ${
                index % 3 === 1 ? "md:translate-y-4" : ""
              }`}
            >
              <div className="absolute top-4 right-4 w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full opacity-10"></div>
              <p className="text-gray-600 dark:text-gray-300 mb-8 relative z-10">
                {testimonial.REVIEW}
              </p>
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {testimonial.PERSON_NAME}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {testimonial.DESIGNATION}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <img
                    src={testimonial.PERSON_PHOTO}
                    alt={testimonial.PERSON_NAME}
                    width={56}
                    height={56}
                    className="rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-avatar.png";
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
