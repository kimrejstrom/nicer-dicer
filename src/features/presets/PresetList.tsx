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
import { toggleModal } from 'components/Modal/modalSlice';
import { PresetForm } from 'features/presets/PresetForm';
import Button from 'components/Button/Button';

export const PresetList: React.FC<{ presets: Preset[] }> = ({ presets }) => {
  const dispatch = useDispatch();

  const renderedPresets = presets.map((preset, index) => {
    let icon;
    switch (preset.diceType) {
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
      <div key={index} className="block text-yellow-100 w-40">
        <div
          className="custom-bg border border-yellow-900 overflow-hidden m-1 bg-secondary-dark relative rounded-lg shadow-lg"
          style={{ height: '9rem' }}
        >
          <div className="flex justify-between h-10">
            <button
              onClick={() =>
                dispatch(
                  toggleModal({
                    visible: true,
                    title: 'Edit Preset',
                    content: <PresetForm existingPreset={preset} id={index} />,
                  }),
                )
              }
              className="z-40 opacity-75 shape-shadow p-2"
            >
              <svg
                className="fill-current h-6 w-6 text-gray-200 opacity-50"
                style={{ transform: 'scale(0.8)' }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path d="M6.3 12.3l10-10a1 1 0 0 1 1.4 0l4 4a1 1 0 0 1 0 1.4l-10 10a1 1 0 0 1-.7.3H7a1 1 0 0 1-1-1v-4a1 1 0 0 1 .3-.7zM8 16h2.59l9-9L17 4.41l-9 9V16zm10-2a1 1 0 0 1 2 0v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6c0-1.1.9-2 2-2h6a1 1 0 0 1 0 2H4v14h14v-6z" />
              </svg>
            </button>
            <img
              src={icon}
              className="opacity-75 w-10 pt-2 shape-shadow"
              alt="logo"
            />
            <button
              onClick={() => dispatch(removePreset(index))}
              className="z-40 opacity-75 shape-shadow p-2"
            >
              <svg
                className="fill-current h-6 w-6 text-gray-200 opacity-50"
                style={{ transform: 'scale(1)' }}
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </button>
          </div>

          <div
            onClick={() => dispatch(setCurrentRoll(preset.formula))}
            className="cursor-pointer h-24 z-40 flex justify-center pt-3"
          >
            <div className="text-xl text-center text-white font-bold px-2 tracking-tighter leading-none">
              {preset.title}
            </div>
          </div>
          <div className="w-full bg-secondary-dark absolute bottom-0 text-white px-2 py-2 leading-none">
            <div className="text-center opacity-75 capitalize text-md overflow-hidden">
              {preset.formula}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="w-full">
        <div className="flex justify-center mt-4">
          <Button
            className="w-2/5 m-1 bg-transparent text-yellow-200 py-1 hover:bg-primary-dark px-4 border border-yellow-700 rounded"
            title="Add Preset"
            onClick={() =>
              dispatch(
                toggleModal({
                  visible: true,
                  title: 'Add Preset',
                  content: <PresetForm />,
                }),
              )
            }
          />
          <Button
            className="w-2/5 m-1 bg-transparent text-yellow-200 py-1 hover:bg-primary-dark px-4 border border-yellow-700 rounded"
            title="Reset defaults"
            onClick={() => dispatch(resetPresets())}
          />
        </div>
      </div>
      <div className="h-40 mt-4 flex flex-wrap justify-between hidden-scroll">
        {renderedPresets.reverse()}
      </div>
    </>
  );
};
