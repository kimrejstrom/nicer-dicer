import React, { useState } from 'react';
import { Dice } from 'dice-typescript';

export const RollInput = () => {
  const [roll, setRoll] = useState('');
  const [result, setResult] = useState();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dice = new Dice();
    const rollResult = dice.roll(roll);
    // {5+1d20 ... 10}>=17 Normal
    // {2+2d20kl...10}>=14 Disadvantage
    // {2+2d20kh ... 10}>=14 Advantage
    console.log(result);
    setResult(rollResult);
  };

  // Render
  return (
    <div className="m-auto">
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit}>
          <label>
            <input
              className="flex bg-indigo-900 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
              type="text"
              value={roll}
              onChange={e => setRoll(e.target.value)}
            />
          </label>
        </form>
        <div className="font-mono">{JSON.stringify(result)}</div>
      </div>
    </div>
  );
};
