import { ChevronLeft, ChevronRight, Play } from "lucide-react";

export default function SliderSection({
  sliderItems,
  currentSlide,
  goToSlide,
  goToPrevSlide,
  goToNextSlide,
  handleButtonClick,
}) {
  return (
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
                        onClick={() => handleButtonClick(item.secondaryButton)}
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

          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
            {sliderItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? "bg-purple-600" : "bg-purple-600/50"
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
  );
}
