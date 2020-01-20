import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPreset } from 'features/presets/presetsSlice';
import { Preset } from 'features/presets/presetsSlice';
import { useForm } from 'components/Form/Form';
import { Dice } from 'vendor/nicer-dicer-engine';
import { Alert } from 'components/Alert/Alert';

export const PresetForm: React.FC = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

  const submitPreset = () => {
    const dice = new Dice();
    try {
      // check if formula is valid
      dice.roll(inputs.formula);
      // TODO: parse form fields
      const newPreset: Preset = {
        rollType: 'damage',
        defaultDie: 'd6',
        formula: inputs.formula,
        title: inputs.title,
      };
      setError(undefined);
      setSuccess('Preset Added');
      dispatch(addPreset(newPreset));
    } catch (error) {
      setError(error);
      setSuccess(undefined);
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(submitPreset);
  return (
    <div className="flex flex-col items-center">
      <div className="text-lg text-green-300">{success}</div>
      <form className="text-center w-full" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            className="w-full appearance-none text-sm font-mono flex bg-primary-dark text-white text-center font-bold py-2 px-4 rounded mb-2 border border-yellow-700 focus:outline-none focus:border-yellow-400"
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
            className="w-full appearance-none text-sm font-mono flex bg-primary-dark text-white text-center font-bold py-2 px-4 rounded mb-2 border border-yellow-700 focus:outline-none focus:border-yellow-400"
            type="text"
            name="formula"
            required={true}
            value={inputs?.formula || ''}
            onChange={handleInputChange}
          />
        </label>
        <div className="flex justify-end pt-2">
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
