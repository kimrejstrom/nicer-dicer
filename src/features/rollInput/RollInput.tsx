import React, { useState } from 'react';
import { Dice } from 'dice-typescript';
import { Alert } from 'components/Alert/Alert';
import { RollResult } from 'features/rollResult/RollResult';
import { useDispatch } from 'react-redux';
import { addRoll } from 'features/rollInput/rollInputSlice';
import { RollList } from 'features/rollList/RollList';

export const RollInput = () => {
  const dispatch = useDispatch();

  const [roll, setRoll] = useState('3d6');
  const [result, setResult] = useState();
  const [error, setError] = useState();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dice = new Dice();
    try {
      const rollResult = dice.roll(roll);
      setResult(rollResult);
      setError(undefined);
      dispatch(addRoll(roll));
    } catch (error) {
      setError(error);
    }
  };

  // Render
  return (
    <div className="m-auto py-4">
      <div className="flex flex-col items-center">
        <form className="text-center" onSubmit={handleSubmit}>
          <label className="text-3xl">
            Roll your dice
            <input
              className="w-64 appearance-none text-sm font-mono flex bg-secondary-dark text-white text-center font-bold py-2 px-4 rounded mt-2 border border-yellow-700 focus:outline-none dark-focus:border-yellow-400"
              type="text"
              value={roll}
              onChange={e => setRoll(e.target.value)}
            />
          </label>
        </form>
        <div className="w-full p-4 text-wrap">
          {error ? (
            <div className="font-mono mb-6 m-auto w-11/12 md:w-2/3 lg:w-1/3">
              <Alert title={'Something went wrong'} body={error.message} />
            </div>
          ) : (
            <>
              <RollResult result={result} />
              <RollList />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
