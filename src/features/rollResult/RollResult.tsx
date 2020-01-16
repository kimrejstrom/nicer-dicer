import React from 'react';
import { DiceResult } from 'vendor/nicer-dicer-engine';

export const RollResult: React.FC<{ result?: DiceResult }> = ({ result }) => {
  // Render
  return (
    <div className="m-auto">
      {result ? (
        <div className="mb-4">
          <div className="m-auto flex items-center justify-center space-between text-lg">
            <div className="p-2">
              Total: <b className="text-2xl">{result.total}</b>
            </div>
            <div className="p-2">
              Successes:{' '}
              <b className="text-2xl text-green-300">{result.successes}</b>
            </div>
            <div className="p-2">
              Failures:{' '}
              <b className="text-2xl text-red-300">{result.failures}</b>
            </div>
          </div>
          <details className="m-auto text-center">
            <summary>View roll</summary>
            <div className="font-mono p-2 bg-secondary-dark rounded">
              {result.renderedExpression}
            </div>
          </details>
        </div>
      ) : (
        undefined
      )}
    </div>
  );
};
