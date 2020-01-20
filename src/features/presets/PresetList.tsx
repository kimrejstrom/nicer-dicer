import React from 'react';
import { Preset } from 'features/presets/presetsSlice';
import { useDispatch } from 'react-redux';
import { setCurrentRoll } from 'features/rollInput/rollInputSlice';
import d20 from 'images/d20.svg';
import d12 from 'images/d12.svg';
import d10 from 'images/d10.svg';
import d8 from 'images/d8.svg';
import d6 from 'images/d6.svg';
import d4 from 'images/d4.svg';
import { Modal } from 'components/Modal/Modal';
import { toggleModal } from 'components/Modal/modalSlice';
import { PresetForm } from 'features/presets/PresetForm';

export const PresetList: React.FC<{ presets: Preset[] }> = ({ presets }) => {
  const dispatch = useDispatch();

  const AddNew: React.FC<{}> = () => (
    <div
      onClick={() => dispatch(toggleModal(true))}
      className="cursor-pointer block text-yellow-100"
      style={{ width: '6.5rem' }}
    >
      <div
        className="border border-yellow-900 overflow-hidden bg-secondary-dark m-1 relative rounded-lg shadow-lg"
        style={{ height: '7rem' }}
      >
        <div className="text-center p-3 opacity-75 capitalize text-xs">
          Create
        </div>
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
        <div
          className="block absolute w-32 h-32 bottom-0 left-0"
          style={{
            background: 'radial-gradient(black, transparent 60%)',
            transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)',
            opacity: 0.1,
          }}
        ></div>
        <div className="flex justify-center">
          <span className="absolute top-0 mt-10 text-white fill-current opacity-75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              style={{ transform: 'scale(2)' }}
            >
              <path d="M17 11a1 1 0 0 1 0 2h-4v4a1 1 0 0 1-2 0v-4H7a1 1 0 0 1 0-2h4V7a1 1 0 0 1 2 0v4h4z" />
            </svg>
          </span>
        </div>
        <div className="w-full bg-secondary-dark absolute bottom-0 text-white px-2 py-2 leading-none">
          <div className="text-center opacity-75 capitalize text-xs overflow-hidden">
            New Preset
          </div>
        </div>
      </div>
    </div>
  );

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
        className="cursor-pointer block text-yellow-100"
        style={{ width: '6.5rem' }}
      >
        <div
          className="border border-yellow-900 overflow-hidden bg-secondary-dark m-1 relative rounded-lg shadow-lg"
          style={{ height: '7rem' }}
        >
          <div className="p-3 pb-2 opacity-75 capitalize text-xs">
            {preset.rollType}
          </div>
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
          <div
            className="block absolute w-32 h-32 bottom-0 left-0"
            style={{
              background: 'radial-gradient(black, transparent 60%)',
              transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)',
              opacity: 0.1,
            }}
          ></div>
          <div className="flex justify-center">
            <div className="text-md text-center text-white font-bold p-1 tracking-tighter leading-none">
              {preset.title}
            </div>
          </div>
          <div className="w-full bg-secondary-dark absolute bottom-0 text-white px-2 py-2 leading-none">
            <div className="text-center opacity-75 capitalize text-xs overflow-hidden">
              {preset.formula}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <Modal title="Add Preset" content={<PresetForm />} />
      <div className="h-32 mt-4 flex flex-wrap justify-center overflow-scroll">
        {[<AddNew key="addNew" />].concat(renderedPresets)}
      </div>
    </>
  );
};
