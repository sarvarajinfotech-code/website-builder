import { useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import Banner from "./Banner";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
import TrustedBy from "./TrustedBy";
import Team from "./Team";
import Footer from "./Footer";

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <Banner />
      <div className="relative bg-white dark:bg-gray-900 min-h-screen">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1500&q=80"
            alt="Office background"
            className="w-full h-full object-cover opacity-20 dark:opacity-5"
          />
        </div>
        <div className="relative z-10">
          <nav className="flex justify-between items-center p-4">
            <div className="text-purple-600 dark:text-purple-400 text-2xl font-bold">
              ▲
            </div>
            <ul className="hidden md:flex space-x-6">
              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Product
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Marketplace
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Company
                </a>
              </li>
            </ul>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={toggleMenu}
                className="md:hidden text-gray-700 dark:text-gray-300"
              >
                <Menu size={24} />
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div
            className={`fixed inset-y-0 left-0 transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out z-20 md:hidden`}
          >
            <div className="p-4">
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 text-gray-700 dark:text-gray-300"
              >
                <X size={24} />
              </button>
              <ul className="mt-8 space-y-4">
                <li>
                  <a
                    href="#"
                    className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Product
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Marketplace
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Company
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <main className="container mx-auto px-4 py-16 text-center">
            <div className="mb-4">
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs font-semibold px-2.5 py-0.5 rounded">
                Announcing our next round of funding.{" "}
                <a href="#" className="underline">
                  Read more →
                </a>
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Data to enrich your
              <br />
              online business
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua.
            </p>
            <div className="rounded-lg flex justify-center space-x-4">
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg">
                Get started
              </button>
              <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg">
                Learn more →
              </button>
            </div>
          </main>
        </div>
      </div>
      <TrustedBy />
      <Team />
      <Testimonials />
      <Pricing />
      <Footer />
    </div>
  );
}
