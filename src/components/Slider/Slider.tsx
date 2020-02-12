import React from 'react';
import { useLocation } from 'react-router-dom';

export interface ISlider {
  slides: JSX.Element[];
}

export const Slider: React.FC<ISlider> = ({ slides }) => {
  const hash = useLocation().hash;
  const isActive = (id: string) => {
    // First slide
    if (!hash && id === '#slide-0') {
      return true;
    } else {
      // Normal case
      return hash === id ? true : false;
    }
  };

  return (
    <div className="slider overflow-hidden relative">
      <div className="slides flex overflow-x-auto hidden-scroll">
        {slides.map((slide, index) => (
          <div
            className="rounded-lg mr-20 w-full flex justify-center flex-shrink-0 relative"
            id={`slide-${index}`}
            key={index}
          >
            {/* Actual slide content */}
            <div className="m-auto w-11/12">{slide}</div>
            {/* Next / Previous */}
            <a
              className="absolute right-0 h-8 w-8 -mt-4 bg-transparent rounded-full z-10"
              style={{ top: '50%' }}
              href={`#slide-${(index + (1 % slides.length) + slides.length) %
                slides.length}`}
            >
              {''}
            </a>
            <a
              className="absolute left-0 h-8 w-8 -mt-4 bg-transparent rounded-full z-10"
              style={{ top: '50%' }}
              href={`#slide-${(index - (1 % slides.length) + slides.length) %
                slides.length}`}
            >
              {''}
            </a>
          </div>
        ))}
      </div>
      {/* Nav control dots */}
      <div>
        {slides.map((_, index) => (
          <a
            key={index}
            className={`bg-white opacity-25 w-3 h-3 inline-flex items-center justify-center rounded-full mr-2 mb-2 mt-4 ${
              isActive(`#slide-${index}`) ? 'opacity-50' : ''
            }`}
            href={`#slide-${index}`}
          >
            {' '}
          </a>
        ))}
      </div>
    </div>
  );
};
