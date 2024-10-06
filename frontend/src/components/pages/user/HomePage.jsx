"use client";

import { useEffect, useState } from "react";
import {
  Moon,
  Sun,
  Menu,
  X,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Banner from "./Banner";
import Pricing from "./Pricing";
import Testimonials from "./Testimonials";
import TrustedBy from "./TrustedBy";
import Team from "./Team";
import Products from "./Products";
import Footer from "./Footer";
import FloatingIcon from "./Floating";
import api from "@/utility/api";
import VideoPopover from "./VideoPopover";

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPopoverOpen, setIsVideoPopoverOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [sliderItems, setSliderItems] = useState([]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + sliderItems.length) % sliderItems.length
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderItems.length);
  };

  const handleButtonClick = (button) => {
    if (button.isVideo) {
      setCurrentVideoUrl(button.link);
      setIsVideoPopoverOpen(true);
    } else {
      window.open(button.link, "_blank");
    }
  };

  useEffect(() => {
    if (sliderItems.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderItems.length);
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [currentSlide]);

  useEffect(() => {
    async function fetchTitleAndFavicon() {
      const response = await api.getFaviconDetails();
      if (response.length > 0) {
        document.title = response[0].TITLE;
        const favicon = document.getElementById("favicon");
        if (favicon) {
          favicon.href = response[0].FAVICON_PATH;
        }
      } else {
        document.title = "website";
        const favicon = document.getElementById("favicon");
        if (favicon) {
          favicon.href = "/";
        }
      }
    }

    async function fetchHomePageDetails() {
      const response = await api.getHomePageDetails();
      if (response.length > 0) {
        const filteredSliderItems = response
          .filter((item) => item.SHOW_IN_SLIDER) // Only include items where SHOW_IN_SLIDER is true
          .map((item) => ({
            backgroundImage: item.BACKGROUND_IMAGE_PATH,
            headerText: item.HEADER_TEXT,
            tagline: item.TAGLINE_TEXT,
            primaryButton: {
              text: item.PRIMARY_BUTTON_TEXT,
              link: item.PRIMARY_BUTTON_LINK,
              isVideo: item.PRIMARY_BUTTON_TYPE === "video",
            },
            secondaryButton: {
              text: item.SECONDARY_BUTTON_TEXT,
              link: item.SECONDARY_BUTTON_LINK,
              isVideo: item.SECONDARY_BUTTON_TYPE === "video",
            },
            opacity: item.OPACITY / 100,
            alignment: item.HEADER_TEXT_ALIGNMENT,
          }));

        setSliderItems(filteredSliderItems);
      } else {
        setSliderItems([]);
      }
    }
    fetchTitleAndFavicon();
    fetchHomePageDetails();
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
      <Banner />
      <div className="relative bg-white dark:bg-gray-900 min-h-screen">
        <div className="absolute inset-0 z-0">
          {sliderItems.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
              aria-hidden={index !== currentSlide}
            >
              <img
                src={item.backgroundImage}
                alt={`Background ${index + 1}`}
                className="w-full h-full object-cover"
                style={{
                  opacity: item.opacity,
                }}
              />
            </div>
          ))}
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
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Blogs
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
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Team
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Blogs
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative min-h-[calc(100vh-4rem)]">
            <main className="container mx-auto px-4 py-16 flex flex-col justify-center min-h-[calc(100vh-4rem)]">
              {sliderItems.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    index === currentSlide ? "block" : "hidden"
                  } transition-opacity duration-500 ease-in-out`}
                >
                  <div
                    className={`flex ${
                      item.alignment === "left"
                        ? "justify-start"
                        : item.alignment === "right"
                        ? "justify-end"
                        : "justify-center"
                    }`}
                  >
                    <div
                      className={`w-full max-w-2xl ${
                        item.alignment === "center"
                          ? "text-center"
                          : item.alignment === "right"
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                        {item.headerText}
                      </h1>
                      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                        {item.tagline}
                      </p>
                      <div
                        className={`flex ${
                          item.alignment === "center"
                            ? "justify-center"
                            : item.alignment === "right"
                            ? "justify-end"
                            : "justify-start"
                        } space-x-4`}
                      >
                        <button
                          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg flex items-center"
                          onClick={() => handleButtonClick(item.primaryButton)}
                        >
                          {item.primaryButton.isVideo && (
                            <Play className="mr-2" size={20} />
                          )}
                          {item.primaryButton.text}
                        </button>
                        <button
                          className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg flex items-center"
                          onClick={() =>
                            handleButtonClick(item.secondaryButton)
                          }
                        >
                          {item.secondaryButton.isVideo && (
                            <Play className="mr-2" size={20} />
                          )}
                          {item.secondaryButton.text}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </main>

            {/* Slider controls */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {sliderItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goToPrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
      <FloatingIcon />
      <TrustedBy />
      <Team />
      <Testimonials />
      <Pricing />
      <Products />
      <Footer />
      <VideoPopover
        isOpen={isVideoPopoverOpen}
        onClose={() => setIsVideoPopoverOpen(false)}
        videoUrl={currentVideoUrl}
      />
    </div>
  );
}
