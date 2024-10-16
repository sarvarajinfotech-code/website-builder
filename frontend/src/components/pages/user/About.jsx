export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-16">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Innovating for a Better Tomorrow
          </p>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
          <p className="text-lg mb-4">
            Founded in 2010, our company has been at the forefront of
            technological innovation for over a decade. We started with a simple
            mission: to make cutting-edge technology accessible to businesses of
            all sizes.
          </p>
          <p className="text-lg mb-4">
            Over the years, we've grown from a small startup to a global leader
            in software solutions, but our core values remain the same. We
            believe in the power of technology to transform businesses and
            improve lives.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>
          <p className="text-lg mb-4">
            Our mission is to empower businesses with innovative software
            solutions that drive growth, efficiency, and success. We strive to:
          </p>
          <ul className="list-disc list-inside text-lg mb-4 space-y-2">
            <li>Deliver high-quality, scalable software solutions</li>
            <li>Foster a culture of continuous learning and innovation</li>
            <li>Provide exceptional customer service and support</li>
            <li>
              Contribute to the global tech community through open-source
              initiatives
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
