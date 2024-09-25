const testimonials = [
  {
    id: 1,
    name: "Sheryl Berge",
    role: "CEO at Lynch LLC",
    content:
      "TaxPal is so easy to use I can't help but wonder if it's really doing the things the government expects me to do.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    name: "Leland Kiehn",
    role: "Founder of Kiehn and Sons",
    content:
      "The best part about TaxPal is every time I pay my employees, my bank balance doesn't go down like it used to. Looking forward to spending this extra cash when I figure out why my card is being declined.",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  {
    id: 3,
    name: "Erin Powlowski",
    role: "COO at Armstrong Inc",
    content:
      "There are so many things I had to do with my old software that I just don't do at all with TaxPal. Suspicious but I can't say I don't love it.",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    name: "Peter Renolds",
    role: "Founder of West Inc",
    content:
      "I used to have to remit tax to the EU and with TaxPal I somehow don't have to do that anymore. Nervous to travel there now though.",
    avatar: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    name: "Amy Hahn",
    role: "Director at Velocity Industries",
    content:
      "I'm trying to get a hold of someone in support, I'm in a lot of trouble right now and they are saying it has something to do with my books. Please get back to me right away.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 6,
    name: "Amy Hahn",
    role: "Director at Velocity Industries",
    content:
      "This is the fourth email I've sent to your support team. I am literally being held in jail for tax fraud. Please answer your damn emails, this is important.",
    avatar: "https://i.pravatar.cc/150?img=6",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-2">
          Loved by businesses worldwide.
        </h2>
        <p className="text-xl text-center text-gray-500 dark:text-gray-400 mb-16 max-w-3xl mx-auto">
          Our software is so simple that people can't help but fall in love with
          it. Simplicity is easy when you just skip tons of mission-critical
          features.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 relative overflow-hidden ${
                index % 3 === 1 ? "md:translate-y-4" : ""
              }`}
            >
              <div className="absolute top-4 right-4 w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full opacity-10"></div>
              <p className="text-gray-600 dark:text-gray-300 mb-8 relative z-10">
                {testimonial.content}
              </p>
              <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="rounded-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/placeholder-avatar.png";
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
