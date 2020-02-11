import React from 'react';

export interface ISlider {
  slides: JSX.Element[];
}

export const Slider: React.FC<ISlider> = ({ slides }) => {
  return (
    <div className="slider">
      <div className="slides hidden-scroll">
        {slides.map((slide, index) => (
          <div
            className="rounded-lg mr-20 w-full flex justify-center flex-shrink-0"
            id={`slide-${index}`}
            key={index}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className="slider-nav">
        {slides.map((_, index) => (
          <a
            className="bg-primary-dark w-4 h-4 inline-flex items-center justify-center rounded-full mr-1 mb-2 mt-4"
            href={`#slide-${index}`}
          >
            {' '}
          </a>
        ))}
      </div>
    </div>
  );
};
