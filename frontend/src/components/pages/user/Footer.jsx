import { useEffect, useState } from "react";
import { Facebook, Instagram, Twitter, Github, Youtube } from "lucide-react";
import api from "@/utility/api";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [footerTagline, setFooterTagline] = useState(null);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [newslettHeaderText, setNewsletterHeaderText] = useState(null);
  const [newsletterTagline, setNewsletterTagline] = useState(null);
  const [copyRightText, setCopyRightText] = useState(null);
  const [sections, setSections] = useState([]);

  const handleSubmit = () => {
    e.preventDefault();
    // Here you would typically handle the newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
  };

  useEffect(() => {
    async function fetchFooterMetaData() {
      const response = await api.getFooterHeaderInfo();
      if (response.length > 0) {
        setFooterTagline(response[0].TAGLINE);
        setShowNewsletter(response[0].SHOW_NEWSLETTER);
        setNewsletterHeaderText(response[0].NEWSLETTER_HEADER_TEXT);
        setNewsletterTagline(response[0].TAGLINE);
        setCopyRightText(response[0].COPYRIGHT_TEXT);
      } else {
        setFooterTagline(null);
        setShowNewsletter(false);
        setNewsletterHeaderText(null);
        setNewsletterTagline(null);
        setCopyRightText(null);
      }
    }

    async function fetchSectionDetails() {
      const resposne = await api.getFooterSectionInfo();
      if (resposne.length > 0) {
        const sections = resposne.reduce((acc, item) => {
          const { SECTION_HEADER, SECTION_ITEM_NAME, LINK } = item;
          if (!acc[SECTION_HEADER]) {
            acc[SECTION_HEADER] = {
              title: SECTION_HEADER,
              links: [],
            };
          }
          acc[SECTION_HEADER].links.push({
            name: SECTION_ITEM_NAME,
            link: LINK,
          });

          return acc;
        }, {});
        const result = Object.values(sections);
        setSections(result);
      }
    }

    fetchFooterMetaData();
    fetchSectionDetails();
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <a
              href="/"
              className="text-purple-500 text-3xl font-bold mb-4 inline-block"
            >
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-8 h-8"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              </svg>
            </a>
            {footerTagline && <p className="mb-4 text-sm">{footerTagline}</p>}
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.link} className="hover:text-white">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {showNewsletter && (
          <div className="border-t border-gray-800 pt-8 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div className="mb-4 md:mb-0">
                {newslettHeaderText && (
                  <h3 className="text-lg font-semibold mb-2">
                    {newslettHeaderText}
                  </h3>
                )}
                {newsletterTagline && (
                  <p className="text-sm text-gray-400">{newsletterTagline}</p>
                )}
              </div>
              <form onSubmit={handleSubmit} className="w-full md:w-auto">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-gray-800 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-64"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-auto"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {copyRightText && (
          <div className="flex items-center justify-center mt-8 pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-400">
              &copy; 2024 Your Company, Inc. All rights reserved.
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
