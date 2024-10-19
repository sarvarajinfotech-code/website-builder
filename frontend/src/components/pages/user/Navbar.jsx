import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import api from "@/utility/api";

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

  const [pages, setPages] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    async function fetchPages() {
      const response = await api.getPathDetails();
      if (response.length > 0) {
        const visiblePages = response.filter((page) => page.SHOW);
        setPages(visiblePages);
      } else {
        setPages([]);
      }
    }
    fetchPages();
  }, []);

  const visibleLimit = 5;
  const visiblePages = pages.slice(0, visibleLimit);
  const dropdownPages = pages.slice(visibleLimit);

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center p-4 bg-gradient-to-b from-white to-white/95 dark:from-gray-900 dark:to-gray-900/95 shadow-md transition-colors duration-300">
      <div className="flex items-center">
        <Link to="/">
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
        </Link>
      </div>

      <ul className="hidden md:flex space-x-6">
        {visiblePages.map((page) => (
          <li key={page.ID}>
            <Link
              to={page.PAGE_PATH}
              className={`${
                isActive(page.PAGE_PATH)
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-700 dark:text-gray-300"
              } hover:text-purple-600 dark:hover:text-purple-400`}
            >
              {page.PAGE_NAME}
            </Link>
          </li>
        ))}
        {dropdownPages.length > 0 && (
          <li
            className="relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span className="flex items-center cursor-pointer text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
              Pages
              <svg
                className={`ml-2 h-4 w-4 transform transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06 0L10 10.92l3.71-3.71a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
            {isDropdownOpen && (
              <ul className="absolute left-0 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                {dropdownPages.map((page) => (
                  <li key={page.ID}>
                    <Link
                      to={page.PAGE_PATH}
                      className={`block px-4 py-2 ${
                        isActive(page.PAGE_PATH)
                          ? "text-purple-600 dark:text-purple-400"
                          : "text-gray-700 dark:text-gray-300"
                      } hover:text-purple-600 dark:hover:text-purple-400`}
                    >
                      {page.PAGE_NAME}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        )}
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
            {pages.map((page) => (
              <li key={page.ID}>
                <Link
                  to={page.PAGE_PATH}
                  className={`${
                    isActive(page.PAGE_PATH)
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-gray-700 dark:text-gray-300"
                  } hover:text-purple-600 dark:hover:text-purple-400`}
                >
                  {page.PAGE_NAME}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
