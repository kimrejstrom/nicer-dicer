import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPreset, updatePreset } from 'features/presets/presetsSlice';
import { Preset } from 'features/presets/presetsSlice';
import { useForm, InputsFor } from 'utils/customHooks';
import { Dice } from 'vendor/nicer-dicer-engine';
import { Alert } from 'components/Alert/Alert';
import { toggleModal } from 'components/Modal/modalSlice';

export const PresetForm: React.FC<{
  existingPreset?: Preset;
  id?: number;
}> = ({ existingPreset, id }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const submitPreset = () => {
    const dice = new Dice();
    try {
      // check if formula is valid
      dice.roll(inputs.formula);

      const newPreset: Preset = {
        diceType: inputs.diceType,
        formula: inputs.formula,
        title: inputs.title,
      };
      setError(undefined);
      if (existingPreset) {
        setSuccess('Preset Updated');
        dispatch(updatePreset({ preset: newPreset, id: id! }));
      } else {
        setSuccess('Preset Added');
        dispatch(addPreset(newPreset));
      }
      // Close modal
      setTimeout(() => {
        dispatch(toggleModal({ visible: false }));
      }, 1000);
    } catch (error) {
      setError(error);
      setSuccess(undefined);
    }
  };

  const existingInputs: InputsFor<Preset> = {
    title: existingPreset?.title,
    formula: existingPreset?.formula,
    diceType: existingPreset?.diceType,
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    submitPreset,
    existingInputs,
  );

  return (
    <div className="flex flex-col items-center">
      <div className="text-lg text-green-300">{success}</div>
      <form className="text-center w-full" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            className="w-full text-lg appearance-none font-mono flex bg-primary-dark text-white text-center font-bold py-2 px-4 rounded mb-2 border border-yellow-700 focus:outline-none focus:border-yellow-400"
            type="text"
            name="title"
            required={true}
            value={inputs?.title || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Formula
          <input
            className="w-full text-lg appearance-none font-mono flex bg-primary-dark text-white text-center font-bold py-2 px-4 rounded mb-2 border border-yellow-700 focus:outline-none focus:border-yellow-400"
            type="text"
            name="formula"
            required={true}
            value={inputs?.formula || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Dice type
          <div className="inline-block relative w-full">
            <select
              className="relative w-full appearance-none text-lg font-mono flex bg-primary-dark text-white text-center font-bold py-2 px-4 rounded border border-yellow-700 focus:outline-none focus:border-yellow-400"
              name="diceType"
              value={inputs?.diceType}
              onChange={handleInputChange}
            >
              <option value="d4">d4</option>
              <option value="d6">d6</option>
              <option value="d8">d8</option>
              <option value="d10">d10</option>
              <option value="d12">d12</option>
              <option value="d20">d20</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-200 opacity-75">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </label>
        <div className="flex justify-end mt-4 pt-2">
          <input
            className="bg-transparent text-yellow-200 py-1 hover:bg-primary-dark px-4 border border-yellow-700 rounded"
            type="submit"
            value="Save"
          />
        </div>
      </form>
      {error && (
        <div className="font-mono mt-4 mb-6 m-auto">
          <Alert title={'Something went wrong'} body={error.message} />
        </div>
      )}
    </div>
  );
};
