import React from 'react';
import battleAxe from 'features/presets/battle_axe.svg';
import shield from 'features/presets/shield.svg';
import sword from 'features/presets/sword.svg';
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
        className={`${bgColor} m-1 relative overflow-hidden rounded-lg w-40 shadow-lg`}
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
            <span className="text-xl text-white font-bold">
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
  return (
    <div className="flex flex-wrap items-center justify-center p-4">
      {renderedPresets}
    </div>
  );
};

//     <div className="flex-shrink-0 m-6 relative overflow-hidden bg-orange-500 rounded-lg max-w-xs shadow-lg">
//       <svg
//         className="absolute bottom-0 left-0 mb-8"
//         viewBox="0 0 375 283"
//         fill="none"
//         style={{ transform: 'scale(1.5)', opacity: 0.1 }}
//       >
//         <rect
//           x="159.52"
//           y="175"
//           width="152"
//           height="152"
//           rx="8"
//           transform="rotate(-45 159.52 175)"
//           fill="white"
//         />
//         <rect
//           y="107.48"
//           width="152"
//           height="152"
//           rx="8"
//           transform="rotate(-45 0 107.48)"
//           fill="white"
//         />
//       </svg>
//       <div className="relative pt-10 px-10 flex items-center justify-center">
//         <div
//           className="block absolute w-48 h-48 bottom-0 left-0 mb-24 ml-3"
//           style={{
//             background: 'radial-gradient(black, transparent 60%)',
//             transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)',
//             opacity: 0.2,
//           }}
//         ></div>
//         <img className="relative w-40" src={shield} alt="" />
//       </div>
//       <div className="relative text-white px-6 pb-6 mt-6">
//         <span className="block opacity-75 -mb-1">Indoor</span>
//         <div className="flex justify-between">
//           <span className="block font-semibold text-xl">Peace Lily</span>
//           <span className="block bg-white rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
//             $36.00
//           </span>
//         </div>
//       </div>
//     </div>
//     <div className="flex-shrink-0 m-6 relative overflow-hidden bg-teal-500 rounded-lg max-w-xs shadow-lg">
//       <svg
//         className="absolute bottom-0 left-0 mb-8"
//         viewBox="0 0 375 283"
//         fill="none"
//         style={{ transform: 'scale(1.5)', opacity: 0.1 }}
//       >
//         <rect
//           x="159.52"
//           y="175"
//           width="152"
//           height="152"
//           rx="8"
//           transform="rotate(-45 159.52 175)"
//           fill="white"
//         />
//         <rect
//           y="107.48"
//           width="152"
//           height="152"
//           rx="8"
//           transform="rotate(-45 0 107.48)"
//           fill="white"
//         />
//       </svg>
//       <div className="relative pt-10 px-10 flex items-center justify-center">
//         <div
//           className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
//           style={{
//             background: 'radial-gradient(black, transparent 60%)',
//             transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)',
//             opacity: 0.2,
//           }}
//         ></div>
//         <img className="relative w-40" src={battleAxe} alt="" />
//       </div>
//       <div className="relative text-white px-6 pb-6 mt-6">
//         <span className="block opacity-75 -mb-1">Outdoor</span>
//         <div className="flex justify-between">
//           <span className="block font-semibold text-xl">Monstera</span>
//           <span className="block bg-white rounded-full text-teal-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
//             $45.00
//           </span>
//         </div>
//       </div>
//     </div>
//     <div className="flex-shrink-0 m-6 relative overflow-hidden bg-purple-500 rounded-lg max-w-xs shadow-lg">
//       <svg
//         className="absolute bottom-0 left-0 mb-8"
//         viewBox="0 0 375 283"
//         fill="none"
//         style={{ transform: 'scale(1.5)', opacity: 0.1 }}
//       >
//         <rect
//           x="159.52"
//           y="175"
//           width="152"
//           height="152"
//           rx="8"
//           transform="rotate(-45 159.52 175)"
//           fill="white"
//         />
//         <rect
//           y="107.48"
//           width="152"
//           height="152"
//           rx="8"
//           transform="rotate(-45 0 107.48)"
//           fill="white"
//         />
//       </svg>
//       <div className="relative pt-10 px-10 flex items-center justify-center">
//         <div
//           className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
//           style={{
//             background: 'radial-gradient(black, transparent 60%)',
//             transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)',
//             opacity: 0.2,
//           }}
//         ></div>
//         <img className="relative w-40" src={sword} alt="" />
//       </div>
//       <div className="relative text-white px-6 pb-6 mt-6">
//         <span className="block opacity-75 -mb-1">Outdoor</span>
//         <div className="flex justify-between">
//           <span className="block font-semibold text-xl">Oak Tree</span>
//           <span className="block bg-white rounded-full text-purple-500 text-xs font-bold px-3 py-2 leading-none flex items-center">
//             $68.50{' '}
//           </span>
//         </div>
//       </div>
//     </div>
//   </div>
// );
