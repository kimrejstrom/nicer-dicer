import React from 'react';
import { DiceResult } from 'dice-typescript';

export const RollResult: React.FC<{ result?: DiceResult }> = ({ result }) => {
  // Render
  return (
    <div className="m-auto py-4">
      <div className="flex flex-col items-center">
        {result ? (
          <div className="font-mono w-full p-4 text-wrap">
            <ul>
              <li>Rolled: {result.renderedExpression}</li>
              <li>Total: {result.total}</li>
              <li>Successes: {result.successes}</li>
              <li>Failures: {result.failures}</li>
            </ul>
          </div>
        ) : (
          <div>No rolls yet.</div>
        )}
      </div>
    </div>
  );
};
