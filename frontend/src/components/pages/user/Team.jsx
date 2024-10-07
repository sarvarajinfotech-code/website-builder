import api from "@/utility/api";
import Constants from "@/utility/Constants";
import { Twitter, Linkedin } from "lucide-react";
import { useEffect, useState } from "react";

export default function TeamSection() {
  const [headerText, setHeaderText] = useState(null);
  const [tagline, setTagLine] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  const ensureHttp = (url) => {
    if (!url) return "#";
    return url.startsWith("http") ? url : `https://${url}`;
  };

  useEffect(() => {
    async function fetchHeaderText() {
      const response = await api.getHeaderInfo(Constants.TEAM_PAGE);
      if (response.length > 0) {
        setHeaderText(response[0].HEADER_TEXT);
        setTagLine(response[0].TAG_LINE);
      }
    }

    async function fetchTeaMembers() {
      const response = await api.getTeamDetails();
      if (response.length > 0) {
        setTeamMembers(response);
      } else {
        setTeamMembers([]);
      }
    }
    fetchHeaderText();
    fetchTeaMembers();
  }, []);
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-50 dark:opacity-20">
        <div className="absolute inset-0 bg-grid-gray-900/[0.2] dark:bg-grid-gray-100/[0.2] bg-[size:50px_50px]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-96 w-96 rounded-full bg-purple-500 mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="h-96 w-96 rounded-full bg-yellow-500 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
          <div className="h-96 w-96 rounded-full bg-pink-500 mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          {headerText && (
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              {headerText}
            </h2>
          )}
          {tagline && (
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
              {tagline}
            </p>
          )}
        </div>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.ID} className="text-center">
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                <img
                  src={member.PHOTO_PATH}
                  alt={member.EMPLOYEE_NAME}
                  layout="fill"
                  // objectFit="cover"
                  className="transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {member.EMPLOYEE_NAME}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {member.DESIGNATION}
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={ensureHttp(member.TWITTER_PROFILE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <span className="sr-only">Twitter</span>
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a
                    href={ensureHttp(member.LINKEDIN_PROFILE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <span className="sr-only">LinkedIn</span>
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
