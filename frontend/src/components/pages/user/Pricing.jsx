import { Check, X } from "lucide-react";

export default function Pricing() {
  const handlePlanClick = () => {
    // console.log(`Selected plan: ${plan}`);
    // Here you would typically handle the selection, e.g., navigate to a signup page
  };

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Simple pricing, for everyone.
        </h2>
        <p className="text-xl text-center mb-12 text-gray-600 dark:text-gray-400">
          It doesn't matter what size your business is, our software won't work
          well for you.
        </p>
        <div className="flex flex-wrap justify-center gap-4 lg:gap-8">
          <PricingCard
            price="$9"
            name="Starter"
            description="Good for anyone who is self-employed and just getting started."
            features={[
              { text: "Send 10 quotes and invoices", included: true },
              { text: "Connect up to 2 bank accounts", included: true },
              { text: "Track up to 15 expenses per month", included: true },
              { text: "Manual payroll support", included: true },
              { text: "Export up to 3 reports", included: true },
              { text: "Automated payroll support", included: false },
              { text: "Export up to 12 reports", included: false },
            ]}
          />

          <PricingCard
            price="$15"
            name="Small business"
            description="Perfect for small / medium sized businesses."
            features={[
              { text: "Send 25 quotes and invoices", included: true },
              { text: "Connect up to 5 bank accounts", included: true },
              { text: "Track up to 50 expenses per month", included: true },
              { text: "Automated payroll support", included: true },
              { text: "Export up to 12 reports", included: true },
              { text: "Bulk reconcile transactions", included: true },
              { text: "Track in multiple currencies", included: true },
              { text: "Export up to 25 reports", included: false },
            ]}
            highlighted={true}
          />

          <PricingCard
            price="$25"
            name="Professional"
            description="For professionals with a growing client base."
            features={[
              { text: "Send 50 quotes and invoices", included: true },
              { text: "Connect up to 10 bank accounts", included: true },
              { text: "Track up to 100 expenses per month", included: true },
              { text: "Automated payroll support", included: true },
              { text: "Export up to 20 reports", included: true },
              { text: "Bulk reconcile transactions", included: true },
              { text: "Track in multiple currencies", included: true },
              { text: "Custom report builder", included: false },
            ]}
          />

          <PricingCard
            price="$39"
            name="Enterprise"
            description="For even the biggest enterprise companies."
            features={[
              { text: "Send unlimited quotes and invoices", included: true },
              { text: "Connect up to 15 bank accounts", included: true },
              { text: "Track up to 200 expenses per month", included: true },
              { text: "Automated payroll support", included: true },
              {
                text: "Export up to 25 reports, including TPS",
                included: true,
              },
              { text: "Bulk reconcile transactions", included: true },
              { text: "Track in multiple currencies", included: true },
              { text: "Custom report builder", included: true },
            ]}
          />
        </div>
      </div>
    </section>
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
      className={`w-full sm:w-64 md:w-72 lg:w-56 xl:w-64 text-left transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-lg ${
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
        <h3 className="text-2xl font-bold mb-4">{price}</h3>
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
