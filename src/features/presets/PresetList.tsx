import React from 'react';
import {
  Preset,
  removePreset,
  resetPresets,
} from 'features/presets/presetsSlice';
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
import Button from 'components/Button/Button';

export const PresetList: React.FC<{ presets: Preset[] }> = ({ presets }) => {
  const dispatch = useDispatch();

  const AddNew: React.FC<{}> = () => (
    <div
      onClick={() => dispatch(toggleModal(true))}
      className="cursor-pointer block text-yellow-100"
      style={{ width: '6.5rem' }}
    >
      <div
        className="custom-bg border border-yellow-900 overflow-hidden bg-secondary-dark m-1 relative rounded-lg shadow-lg"
        style={{ height: '7rem' }}
      >
        <div className="text-center p-3 opacity-75 capitalize text-xs">
          Create
        </div>
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
        key={index}
        className="cursor-pointer block text-yellow-100"
        style={{ width: '6.5rem' }}
      >
        <div
          className="custom-bg border border-yellow-900 overflow-hidden bg-secondary-dark m-1 relative rounded-lg shadow-lg"
          style={{ height: '7rem' }}
        >
          <img
            src={icon}
            className="opacity-75 w-8 px-1 py-1 shape-shadow"
            alt="logo"
          />
          <button
            onClick={() => dispatch(removePreset(index))}
            className="z-40 absolute opacity-75 top-0 right-0 shape-shadow"
          >
            <svg
              className="fill-current h-6 w-6 text-gray-200 opacity-50"
              style={{ transform: 'scale(0.7)' }}
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
          <div
            onClick={() => dispatch(setCurrentRoll(preset.formula))}
            className="z-40 flex justify-center"
          >
            <div className="text-md text-center text-white font-bold px-1 -mt-2 pt-2 -mb-4 pb-4 tracking-tighter leading-none">
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
        {[<AddNew key="addNew" />].concat(renderedPresets.reverse())}
      </div>
      <div className="flex justify-center mt-4">
        <Button
          className="m-auto bg-transparent text-yellow-200 py-1 hover:bg-primary-dark px-4 border border-yellow-700 rounded"
          title="Reset defaults"
          onClick={() => dispatch(resetPresets())}
        />
      </div>
    </>
  );
};
