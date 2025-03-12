import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/utility/api";

export default function Footer() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [footerTagline, setFooterTagline] = useState(null);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [newslettHeaderText, setNewsletterHeaderText] = useState(null);
  const [newsletterTagline, setNewsletterTagline] = useState(null);
  const [copyRightText, setCopyRightText] = useState(null);
  const [sections, setSections] = useState([]);
  const [mediaDetails, setMediaDetails] = useState([]);
  const [logo, setLogo] = useState("");
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let payload = { email: email };
    api.saveSubscriber(payload).then(() => {
      setEmail("");
      setSubmissionSuccess(true);
      setTimeout(() => setSubmissionSuccess(false), 3000);
      sendMailToAdmin(payload);
    });
  };

  const sendMailToAdmin = async (payload) => {
    const resposne = await api.sendSubscriberMail(payload);
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

    async function fetchSocialMediaDetails() {
      const response = await api.getSocialMediaDetails();
      if (response.length > 0) {
        setMediaDetails(response);
      } else {
        setMediaDetails([]);
      }
    }

    async function fetchNavigationDetails() {
      const response = await api.getNavigationSettingsDetails();
      if (response.length > 0) {
        setLogo(response[0].LOGO);
      }
    }
    fetchFooterMetaData();
    fetchSectionDetails();
    fetchSocialMediaDetails();
    fetchNavigationDetails();
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
              <img
                src={logo}
                alt="logo"
                className="w-auto h-auto max-w-[150px] max-h-[60px] object-contain"
              />
            </a>
            {footerTagline && <p className="mb-4 text-sm">{footerTagline}</p>}
            <div className="flex space-x-4">
              {mediaDetails.map((media) => {
                const link = media.LINK.startsWith("http")
                  ? media.LINK
                  : `https://${media.LINK}`;
                return (
                  <a
                    key={media.ID}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 p-2 w-10 h-10 rounded-lg mb-4 flex items-center justify-center text-white transition-transform transform hover:scale-110 hover:bg-purple-700 cursor-pointer"
                  >
                    <div
                      dangerouslySetInnerHTML={{ __html: media.SVG_ICON }}
                      className="w-full h-full flex items-center justify-center"
                    ></div>
                  </a>
                );
              })}
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
                    {submissionSuccess ? "Subscribed" : "Subscribe"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {copyRightText && (
          <div className="flex items-center justify-center mt-8 pt-8 border-t border-gray-800">
            <p className="text-sm text-gray-400">{copyRightText}</p>
          </div>
        )}
      </div>
    </footer>
  );
}
