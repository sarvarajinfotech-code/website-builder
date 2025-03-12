import api from "@/utility/api";
import Constants from "@/utility/Constants";
import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

export default function Pricing({ seo }) {
  const [headerText, setHeaderText] = useState(null);
  const [tagline, setTagline] = useState(null);
  const [pricingPlans, setPricingPlans] = useState([]);

  useEffect(() => {
    async function fetchPricingDetails() {
      const response = await api.getPricingDetails();
      if (response.length > 0) {
        setPricingPlans(response);
      } else {
        setPricingPlans([]);
      }
    }
    async function fetchPriceHeader() {
      const resposne = await api.getHeaderInfo(Constants.PRICING_PAGE);
      if (resposne.length > 0) {
        setHeaderText(resposne[0].HEADER_TEXT);
        setTagline(resposne[0].TAG_LINE);
      } else {
        setHeaderText(null);
      }
    }
    fetchPricingDetails();
    fetchPriceHeader();
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
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          {headerText && (
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              {headerText}
            </h2>
          )}
          {tagline && (
            <p className="text-xl text-center mb-12 text-gray-600 dark:text-gray-400">
              {tagline}
            </p>
          )}

          <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
            {pricingPlans.map((plan) => (
              <PricingCard
                key={plan.ID}
                price={new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: plan.CURRENCY_TYPE,
                }).format(plan.PRICE)}
                name={plan.PLAN_TYPE}
                description={plan.PRICE_TAGLINE}
                features={[
                  ...(plan.FEATURES_INCLUDED
                    ? plan.FEATURES_INCLUDED.split(", ").map((feature) => ({
                        text: feature,
                        included: true,
                      }))
                    : []),
                  ...(plan.FEATURES_EXCLUDED
                    ? plan.FEATURES_EXCLUDED.split(", ").map((feature) => ({
                        text: feature,
                        included: false,
                      }))
                    : []),
                ]}
                highlighted={plan.HIGHLIGHTED_PLAN === "yes"}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PricingCard({
  price,
  name,
  description,
  features,
  highlighted = false,
}) {
  return (
    <div
      className={`w-full sm:w-72 md:w-80 lg:w-64 xl:w-72 text-left transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-lg ${
        highlighted ? "z-10" : ""
      }`}
    >
      <div
        className={`${
          highlighted
            ? "bg-purple-600 text-white"
            : "bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        } rounded-lg shadow-lg p-6 h-full ${
          highlighted ? "transform scale-105" : ""
        }`}
      >
        <h3 className="text-2xl font-bold mb-4">{price}</h3>{" "}
        {/* Keeping the original font size */}
        <p
          className={`font-semibold mb-6 ${
            highlighted ? "text-purple-200" : "text-gray-700 dark:text-gray-300"
          }`}
        >
          {name}
        </p>
        <p
          className={`text-sm mb-6 ${
            highlighted ? "text-purple-200" : "text-gray-600 dark:text-gray-400"
          }`}
        >
          {description}
        </p>
        <button
          className={`w-full py-2 px-4 rounded-md transition duration-300 ${
            highlighted
              ? "bg-white text-purple-600 hover:bg-gray-100"
              : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          Get started
        </button>
        <ul className="mt-6 space-y-2">
          {features.map((feature, index) => (
            <PricingItem
              key={index}
              text={feature.text}
              included={feature.included}
              light={highlighted}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function PricingItem({ text, included, light = false }) {
  return (
    <li
      className={`flex items-center ${
        light ? "text-white" : "text-gray-600 dark:text-gray-400"
      }`}
    >
      {included ? (
        <Check
          className={`mr-2 h-5 w-5 ${
            light ? "text-purple-200" : "text-purple-600 dark:text-purple-400"
          }`}
        />
      ) : (
        <X
          className={`mr-2 h-5 w-5 ${
            light ? "text-purple-200" : "text-red-500 dark:text-red-400"
          }`}
        />
      )}
      <span className="text-sm">{text}</span>
    </li>
  );
}
