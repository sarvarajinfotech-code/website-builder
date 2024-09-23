import { useEffect, useRef, useState } from "react";

const logos = [
  { name: "Vercel", src: "https://avatars.githubusercontent.com/u/124599?v=4" },
  { name: "AWS", src: "https://avatars.githubusercontent.com/u/124599?v=4" },
  {
    name: "Microsoft",
    src: "https://avatars.githubusercontent.com/u/124599?v=4",
  },
  {
    name: "Netflix",
    src: "https://avatars.githubusercontent.com/u/124599?v=4",
  },
  { name: "Disney", src: "https://avatars.githubusercontent.com/u/124599?v=4" },
  { name: "Adobe", src: "https://avatars.githubusercontent.com/u/124599?v=4" },
  { name: "Vercel", src: "https://avatars.githubusercontent.com/u/124599?v=4" },
  { name: "AWS", src: "https://avatars.githubusercontent.com/u/124599?v=4" },
  {
    name: "Microsoft",
    src: "https://avatars.githubusercontent.com/u/124599?v=4",
  },
  // Add more logos as needed
];

export default function TrustedBy() {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        setIsOverflowing(
          containerRef.current.scrollWidth > containerRef.current.clientWidth
        );
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200 mb-8">
          TRUSTED BY TEAMS FROM AROUND THE WORLD
        </h2>
        <div
          ref={containerRef}
          className={`flex items-center space-x-8 overflow-hidden ${
            isOverflowing ? "animate-scroll" : " "
          }`}
        >
          {logos.concat(logos).map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 h-12 w-32 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={`${logo.name} logo`}
                width={128}
                height={48}
                className="max-h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
