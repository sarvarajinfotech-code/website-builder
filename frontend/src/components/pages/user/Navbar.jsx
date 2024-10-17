import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Navbar({
  isDarkMode,
  toggleDarkMode,
  toggleMenu,
  isMenuOpen,
  logo,
  showDarkMode,
}) {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center p-4 bg-gradient-to-b from-white to-white/95 dark:from-gray-900 dark:to-gray-900/95 shadow-md transition-colors duration-300">
      <div className="flex items-center">
        {logo ? (
          <img
            src={logo}
            alt="Logo"
            className="w-auto h-auto max-w-[150px] max-h-[60px] object-contain"
          />
        ) : (
          <img
            src="/logo_1.png"
            alt="Default Logo"
            className="w-auto h-auto max-w-[150px] max-h-[60px] object-contain"
          />
        )}
      </div>

      <ul className="hidden md:flex space-x-6">
        <li>
          <Link
            to="/"
            className={`${
              isActive("/")
                ? "text-purple-600 dark:text-purple-400"
                : "text-gray-700 dark:text-gray-300"
            } hover:text-purple-600 dark:hover:text-purple-400`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/products"
            className={`${
              isActive("/products")
                ? "text-purple-600 dark:text-purple-400"
                : "text-gray-700 dark:text-gray-300"
            } hover:text-purple-600 dark:hover:text-purple-400`}
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            to="/pricing"
            className={`${
              isActive("/pricing")
                ? "text-purple-600 dark:text-purple-400"
                : "text-gray-700 dark:text-gray-300"
            } hover:text-purple-600 dark:hover:text-purple-400`}
          >
            Pricing
          </Link>
        </li>
        <li>
          <Link
            to="/team"
            className={`${
              isActive("/team")
                ? "text-purple-600 dark:text-purple-400"
                : "text-gray-700 dark:text-gray-300"
            } hover:text-purple-600 dark:hover:text-purple-400`}
          >
            Team
          </Link>
        </li>
        <li>
          <Link
            to="/blogs"
            className={`${
              isActive("/blogs")
                ? "text-purple-600 dark:text-purple-400"
                : "text-gray-700 dark:text-gray-300"
            } hover:text-purple-600 dark:hover:text-purple-400`}
          >
            Blogs
          </Link>
        </li>
        {/* Add other links similarly */}
      </ul>
      <div className="flex items-center space-x-4">
        {showDarkMode && (
          <>
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
          </>
        )}
      </div>
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
              <Link
                to="/"
                className={`${
                  isActive("/")
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-700 dark:text-gray-300"
                } hover:text-purple-600 dark:hover:text-purple-400`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={`${
                  isActive("/products")
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-700 dark:text-gray-300"
                } hover:text-purple-600 dark:hover:text-purple-400`}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/pricing"
                className={`${
                  isActive("/pricing")
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-700 dark:text-gray-300"
                } hover:text-purple-600 dark:hover:text-purple-400`}
              >
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/team"
                className={`${
                  isActive("/team")
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-700 dark:text-gray-300"
                } hover:text-purple-600 dark:hover:text-purple-400`}
              >
                Team
              </Link>
            </li>
            <li>
              <Link
                to="/blogs"
                className={`${
                  isActive("/blogs")
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-700 dark:text-gray-300"
                } hover:text-purple-600 dark:hover:text-purple-400`}
              >
                Blogs
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
