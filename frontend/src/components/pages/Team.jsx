import { Twitter, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Leonard Krasner",
    role: "Senior Designer",
    image: "https://i.pravatar.cc/300?img=1",
    twitter: "https://twitter.com/leonardkrasner",
    linkedin: "https://linkedin.com/in/leonardkrasner",
  },
  {
    name: "Floyd Miles",
    role: "Principal Designer",
    image: "https://i.pravatar.cc/300?img=2",
    twitter: "https://twitter.com/floydmiles",
    linkedin: "https://linkedin.com/in/floydmiles",
  },
  {
    name: "Emily Selman",
    role: "VP, User Experience",
    image: "https://i.pravatar.cc/300?img=3",
    twitter: "https://twitter.com/emilyselman",
    linkedin: "https://linkedin.com/in/emilyselman",
  },
  {
    name: "Kristin Watson",
    role: "VP, Human Resources",
    image: "https://i.pravatar.cc/300?img=4",
    twitter: "https://twitter.com/kristinwatson",
    linkedin: "https://linkedin.com/in/kristinwatson",
  },
  {
    name: "Emma Dorsey",
    role: "Senior Developer",
    image: "https://i.pravatar.cc/300?img=5",
    twitter: "https://twitter.com/emmadorsey",
    linkedin: "https://linkedin.com/in/emmadorsey",
  },
  {
    name: "Alicia Bell",
    role: "Junior Copywriter",
    image: "https://i.pravatar.cc/300?img=6",
    twitter: "https://twitter.com/aliciabell",
    linkedin: "https://linkedin.com/in/aliciabell",
  },
];

export default function TeamSection() {
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
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Meet our team
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-300 sm:mt-4">
            We're a dynamic group of individuals who are passionate about what
            we do.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                <img
                  src={member.image}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 ease-in-out transform hover:scale-110"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {member.role}
                </p>
                <div className="flex justify-center space-x-4">
                  <a
                    href={member.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                  >
                    <span className="sr-only">Twitter</span>
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a
                    href={member.linkedin}
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
