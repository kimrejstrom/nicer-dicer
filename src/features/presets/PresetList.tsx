import React from 'react';
import Carousel, { CarouselProps } from 'nuka-carousel';
import { Preset } from 'features/presets/PresetFeature';
import { useDispatch } from 'react-redux';
import { setCurrentRoll } from 'features/rollInput/rollInputSlice';
import d20 from 'images/d20.svg';
import d12 from 'images/d12.svg';
import d10 from 'images/d10.svg';
import d8 from 'images/d8.svg';
import d6 from 'images/d6.svg';
import d4 from 'images/d4.svg';

export const PresetList: React.FC<{ presets: Preset[] }> = ({ presets }) => {
  const dispatch = useDispatch();
  const renderedPresets = presets.map((preset, index) => {
    let icon;
    switch (preset.defaultDie) {
      case 'd20':
        icon = d20;
        break;
      case 'd12':
        icon = d12;
        break;
      case 'd10':
        icon = d10;
        break;
      case 'd8':
        icon = d8;
        break;
      case 'd6':
        icon = d6;
        break;
      case 'd4':
        icon = d4;
        break;
      default:
        icon = d20;
        break;
    }
    return (
      <div
        onClick={() => dispatch(setCurrentRoll(preset.formula))}
        key={index}
        className="block text-yellow-100 border border-yellow-900 bg-secondary-dark m-1 relative overflow-hidden rounded-lg shadow-lg"
      >
        <img
          src={icon}
          className="absolute opacity-75 top-0 right-0 w-10 px-2 py-2 shape-shadow"
          alt="logo"
        />
        <svg
          className="absolute mb-2"
          viewBox="0 0 375 283"
          fill="none"
          style={{ transform: 'scale(1.8)', opacity: 0.05 }}
        >
          <rect
            x="160"
            y="175"
            width="150"
            height="150"
            rx="8"
            transform="rotate(-45 160 175)"
            fill="gray"
          />
          <rect
            y="110"
            width="130"
            height="130"
            rx="8"
            transform="rotate(-45 0 110)"
            fill="gray"
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
    cellAlign: 'left',
    slideWidth: 1,
    transitionMode: 'scroll',
    withoutControls: true,
    enableKeyboardControls: true,
  };

  return (
    <div className="mt-4">
      <Carousel {...carouselSettings}>{renderedPresets}</Carousel>
    </div>
  );
};
