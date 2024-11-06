
import { useState, useEffect } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

export default function Carousel({ slides }) {
  const [current, setCurrent] = useState(0);

  // Move to the previous slide
  const previousSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  // Move to the next slide
  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1);
  };

  // Automatically switch slides every 5 seconds
  useEffect(() => {
    const autoSlide = setInterval(nextSlide, 5000);

    // Clean up the interval when component unmounts or when the current slide changes
    return () => clearInterval(autoSlide);
  }, [current]);

  return (
    <div className="relative overflow-hidden w-full">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 w-full animate-fadeIn"
          >
            <img
              src={slide.image}
              alt={`Slide ${i + 1}`}
              className="w-full h-full object-cover"
            />
            {/* Text Container */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
              <h1 className="text-[64px] md:text-[51px]
              absolute mr-[38rem] leading-tight font-bold text-dimGray
               bg-opacity-50 animate-slideInText">
                {slide.text1}
              </h1>
              {slide.text2 && (
                <p className="text-xl md:text-3xl text-black bg-opacity-50 animate-slideInText delay-200">
                  {slide.text2}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Arrows for Navigation */}
      <div className="absolute top-0 h-full w-full flex justify-between 
      items-center text-white px-2 md:px-2 text-2xl ">
        <button onClick={previousSlide}>
          <BsFillArrowLeftCircleFill />
        </button>
        <button onClick={nextSlide}>
          <BsFillArrowRightCircleFill />
        </button>
      </div>

      {/* Dots for Slide Indicator */}
      <div className="absolute bottom-4 flex justify-center gap-2 w-full">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full w-4 h-4 md:w-2 md:h-2 cursor-pointer ${
              i === current ? "bg-white" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
