import { Check } from "lucide-react";

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
        <div className="flex flex-wrap justify-center gap-8">
          {/* Starter Plan */}
          <button
            onClick={() => handlePlanClick("Starter")}
            className="w-full md:w-80 text-left transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-lg"
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 h-full">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                $9
              </h3>
              <p className="font-semibold mb-6 text-gray-700 dark:text-gray-300">
                Starter
              </p>
              <p className="text-sm mb-6 text-gray-600 dark:text-gray-400">
                Good for anyone who is self-employed and just getting started.
              </p>
              <div className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300">
                Get started
              </div>
              <ul className="mt-6 space-y-4">
                <PricingItem text="Send 10 quotes and invoices" />
                <PricingItem text="Connect up to 2 bank accounts" />
                <PricingItem text="Track up to 15 expenses per month" />
                <PricingItem text="Manual payroll support" />
                <PricingItem text="Export up to 3 reports" />
              </ul>
            </div>
          </button>

          {/* Small Business Plan */}
          <button
            onClick={() => handlePlanClick("Small Business")}
            className="w-full md:w-80 text-left transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-lg"
          >
            <div className="bg-purple-600 rounded-lg shadow-lg p-8 h-full transform scale-105">
              <h3 className="text-2xl font-bold mb-4 text-white">$15</h3>
              <p className="font-semibold mb-6 text-white">Small business</p>
              <p className="text-sm mb-6 text-purple-200">
                Perfect for small / medium sized businesses.
              </p>
              <div className="w-full py-2 px-4 bg-white text-purple-600 rounded-md hover:bg-gray-100 transition duration-300">
                Get started
              </div>
              <ul className="mt-6 space-y-4">
                <PricingItem text="Send 25 quotes and invoices" light />
                <PricingItem text="Connect up to 5 bank accounts" light />
                <PricingItem text="Track up to 50 expenses per month" light />
                <PricingItem text="Automated payroll support" light />
                <PricingItem text="Export up to 12 reports" light />
                <PricingItem text="Bulk reconcile transactions" light />
                <PricingItem text="Track in multiple currencies" light />
              </ul>
            </div>
          </button>

          {/* Enterprise Plan */}
          <button
            onClick={() => handlePlanClick("Enterprise")}
            className="w-full md:w-80 text-left transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 rounded-lg"
          >
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 h-full">
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                $39
              </h3>
              <p className="font-semibold mb-6 text-gray-700 dark:text-gray-300">
                Enterprise
              </p>
              <p className="text-sm mb-6 text-gray-600 dark:text-gray-400">
                For even the biggest enterprise companies.
              </p>
              <div className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300">
                Get started
              </div>
              <ul className="mt-6 space-y-4">
                <PricingItem text="Send unlimited quotes and invoices" />
                <PricingItem text="Connect up to 15 bank accounts" />
                <PricingItem text="Track up to 200 expenses per month" />
                <PricingItem text="Automated payroll support" />
                <PricingItem text="Export up to 25 reports, including TPS" />
              </ul>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}

function PricingItem({ text, light = false }) {
  return (
    <li
      className={`flex items-center ${
        light ? "text-white" : "text-gray-600 dark:text-gray-400"
      }`}
    >
      <Check
        className={`mr-2 h-5 w-5 ${
          light ? "text-purple-200" : "text-purple-600 dark:text-purple-400"
        }`}
      />
      <span className="text-sm">{text}</span>
    </li>
  );
}
