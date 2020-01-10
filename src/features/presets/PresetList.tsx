import React from 'react';
import Carousel, { CarouselProps } from 'nuka-carousel';
import { Preset } from 'features/presets/PresetFeature';

export const PresetList: React.FC<{ presets: Preset[] }> = ({ presets }) => {
  const renderedPresets = presets.map((preset, index) => {
    return (
      <div
        key={index}
        className={`text-yellow-100 border border-yellow-900 bg-secondary-dark m-1 relative overflow-hidden rounded-lg shadow-lg`}
      >
        <svg
          className="absolute bottom-0 left-0 mb-2"
          viewBox="0 0 375 283"
          fill="none"
          style={{ transform: 'scale(1.1)', opacity: 0.05 }}
        >
          <rect
            x="160"
            y="175"
            width="150"
            height="150"
            rx="8"
            transform="rotate(-45 160 175)"
            fill="white"
          />
          <rect
            y="110"
            width="130"
            height="130"
            rx="8"
            transform="rotate(-45 0 110)"
            fill="white"
          />
        </svg>
        <div className="relative pt-4 flex items-center justify-center">
          <div
            className="block absolute w-16 h-20 bottom-0 left-0 mb-24 ml-3"
            style={{
              background: 'radial-gradient(black, transparent 60%)',
              transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)',
              opacity: 0.1,
            }}
          ></div>
          <div className="block py-6">
            <span className="text-xl text-white font-bold text-shadow">
              {preset.formula}
            </span>
          </div>
        </div>
        <div className="bg-secondary-dark relative text-white px-2 py-2 leading-none">
          <div className="flex justify-between items-center">
            <span className="opacity-75 capitalize text-xs">
              {preset.repeat ? 'Multiple' : 'Single'}
            </span>
            <span className="opacity-75 capitalize text-xs">
              {preset.modifier}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-sm">{preset.rollType}</span>
            <span className="capitalize text-sm font-bold">
              {preset.defaultDie}
            </span>
          </div>
        </div>
      </div>
    );
  });

  const carouselSettings: CarouselProps = {
    wrapAround: true,
    slidesToShow: 2,
    cellAlign: 'center',
    slideWidth: 0.8,
    transitionMode: 'scroll',
    withoutControls: true,
  };

  return (
    <div className="flex flex-wrap items-center justify-center px-4 pt-4 max-w-md m-auto">
      <Carousel {...carouselSettings}>{renderedPresets}</Carousel>
    </div>
  );
};
