"use client";

import { useEffect, useState } from "react";
import Banner from "./Banner";
import Navbar from "./Navbar";
import Footer from "./Footer";
import api from "@/utility/api";
import FloatingIcon from "./Floating";
import { Helmet } from "react-helmet-async";

export default function HomePage({
  isDarkMode,
  showDarkMode,
  setShowDarkMode,
  setIsDarkMode,
  children,
  seo,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logo, setLogo] = useState("");

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

    async function fetchNavigationDetails() {
      const response = await api.getNavigationSettingsDetails();
      if (response.length > 0) {
        setLogo(response[0].LOGO);
        setShowDarkMode(response[0].DARK_MODE);
      }
    }
    fetchNavigationDetails();
    fetchTitleAndFavicon();
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
      <div className={`min-h-screen ${isDarkMode ? "dark" : ""}`}>
        <Banner />
        <Navbar
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          showDarkMode={showDarkMode}
          toggleMenu={toggleMenu}
          isMenuOpen={isMenuOpen}
          logo={logo}
        />
        {children}
        <FloatingIcon />

        <Footer />
      </div>
    </>
  );
}
