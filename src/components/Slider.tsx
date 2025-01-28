import React, { useState, useEffect } from 'react';

const Slider = () => {
  const slides = [
    { id: 1, media: '/slider/video1.mp4' },
    { id: 2, media: '/slider/video2.mp4' },
    { id: 3, media: '/slider/video3.mp4' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-lg">
      <div
        className="flex transition-transform duration-500 ease-linear"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            <video
              src={slide.media}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-2 rounded-full shadow-lg hover:bg-interaction transition"
      >
        &#8249;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-2 rounded-full shadow-lg hover:bg-interaction transition"
      >
        &#8250;
      </button>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
              currentIndex === index ? 'bg-gray-800 shadow-lg' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
