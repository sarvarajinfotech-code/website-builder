export default function WhyChooseUs() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Why Choose Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Empowering Your Success with Innovative Solutions
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Cutting-Edge Technology"
            description="We leverage the latest technologies to deliver state-of-the-art solutions that keep you ahead of the curve."
            imageUrl="https://via.placeholder.com/300x200?text=Technology"
          />
          <FeatureCard
            title="Expert Team"
            description="Our team of seasoned professionals brings years of industry experience to tackle your most complex challenges."
            imageUrl="https://via.placeholder.com/300x200?text=Expert+Team"
          />
          <FeatureCard
            title="Customer-Centric Approach"
            description="We put our clients at the heart of everything we do, ensuring tailored solutions that meet your unique needs."
            imageUrl="https://via.placeholder.com/300x200?text=Customer+Centric"
          />
          <FeatureCard
            title="Scalable Solutions"
            description="Our solutions are designed to grow with your business, providing long-term value and adaptability."
            imageUrl="https://via.placeholder.com/300x200?text=Scalable"
          />
          <FeatureCard
            title="24/7 Support"
            description="Round-the-clock support ensures that you have assistance whenever you need it, keeping your operations smooth."
            imageUrl="https://via.placeholder.com/300x200?text=24/7+Support"
          />
          <FeatureCard
            title="Proven Track Record"
            description="With a history of successful projects and satisfied clients, we have the experience you can trust."
            imageUrl="https://via.placeholder.com/300x200?text=Track+Record"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, imageUrl }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      <img
        src={imageUrl}
        alt={title}
        width={300}
        height={200}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
      </div>
    </div>
  );
}
