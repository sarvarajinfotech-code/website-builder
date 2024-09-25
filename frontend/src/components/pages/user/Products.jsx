import { useState } from "react";
import {
  Inbox,
  Users,
  ShieldAlert,
  Zap,
  Headphones,
  BarChart,
} from "lucide-react";

const products = [
  {
    icon: <Inbox className="w-8 h-8" />,
    title: "Unlimited inboxes",
    description:
      "Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.",
    category: "Communication",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Manage team members",
    description:
      "Vero eum voluptatem aliquid nostrum voluptatem. Vitae esse natus. Earum nihil deserunt eos quasi cupiditate. A inventore et molestiae natus.",
    category: "Communication",
  },
  {
    icon: <ShieldAlert className="w-8 h-8" />,
    title: "Spam report",
    description:
      "Et quod quaerat dolorem quaerat architecto aliquam accusantium. Ex adipisci et doloremque autem quia quam. Quis eos molestiae at iure impedit.",
    category: "Security",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Fast response times",
    description:
      "Ipsum voluptates quia dolor quidem dolorum. Sed voluptatem quis nesciunt impedit. Qui consequatur quia voluptas consequatur non fugit.",
    category: "Performance",
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "24/7 Support",
    description:
      "Aut repellendus et officiis dolor possimus. Deserunt velit quasi sunt fuga error labore quia ipsum. Commodi autem voluptatem nam.",
    category: "Support",
  },
  {
    icon: <BarChart className="w-8 h-8" />,
    title: "Analytics dashboard",
    description:
      "Qui vel ut aut consequuntur amet accusamus. Qui omnis culpa. Unde tenetur necessitatibus rem. Nostrum aut expedita ad illum qui impedit eum.",
    category: "Analytics",
  },
];

const categories = [
  "All",
  ...new Set(products.map((product) => product.category)),
];

export default function Component() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
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
        <h1 className="text-4xl font-bold mb-4">
          Stay on top of customer support
        </h1>
        <p className="text-xl mb-8">
          Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
          voluptatum cupiditate veritatis in accusamus quisquam.
        </p>

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
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg"
            >
              <div className="bg-purple-600 p-2 w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white">
                {product.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {product.description}
              </p>
              <a
                href="#"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                Learn more →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
