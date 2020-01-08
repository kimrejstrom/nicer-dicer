import React from 'react';
import battleAxe from 'features/presets/battle_axe.svg';
import shield from 'features/presets/shield.svg';
import sword from 'features/presets/sword.svg';
import Carousel, { CarouselProps } from 'nuka-carousel';
import { Preset } from 'features/presets/PresetFeature';

export const PresetList: React.FC<{ presets: Preset[] }> = ({ presets }) => {
  const renderedPresets = presets.map((preset, index) => {
    let bgColor, icon;
    switch (preset.rollType) {
      case 'attack':
        bgColor = 'bg-orange-500';
        icon = sword;
        break;
      case 'damage':
        bgColor = 'bg-teal-500';
        icon = battleAxe;
        break;
      case 'save':
        bgColor = 'bg-red-500';
        icon = shield;
        break;

      default:
        bgColor = 'bg-gray-700';
        icon = sword;
        break;
    }
    return (
      <div
        key={index}
        className={`${bgColor} m-1 relative overflow-hidden rounded-lg shadow-lg`}
      >
        <svg
          className="absolute bottom-0 left-0 mb-2"
          viewBox="0 0 375 283"
          fill="none"
          style={{ transform: 'scale(1.5)', opacity: 0.1 }}
        >
          <rect
            x="159.52"
            y="175"
            width="152"
            height="152"
            rx="8"
            transform="rotate(-45 159.52 175)"
            fill="white"
          />
          <rect
            y="107.48"
            width="152"
            height="152"
            rx="8"
            transform="rotate(-45 0 107.48)"
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
          <img
            className="relative w-16 h-20 text-white fill-current opacity-25"
            src={icon}
            alt=""
          />
          <div className="block absolute">
            <span className="text-xl text-white font-bold text-shadow">
              {preset.formula}
            </span>
          </div>
        </div>
        <div className="relative text-white px-2 pb-2 leading-none">
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
    transitionMode: 'scroll3d',
    withoutControls: true,
  };

  return (
    <div className="flex flex-wrap items-center justify-center px-4 pt-4 max-w-md m-auto">
      <Carousel {...carouselSettings}>{renderedPresets}</Carousel>
    </div>
  );
};
