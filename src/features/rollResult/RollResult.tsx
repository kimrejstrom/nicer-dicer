import React from 'react';
import { DiceResult } from 'vendor/nicer-dicer-engine';

export const RollResult: React.FC<{ result: DiceResult }> = ({ result }) => {
  // Parse DiceResult
  const renderedResult = result.renderedExpression.split('}').filter(e => e);
  const rolls = renderedResult[0].replace(/[{}]/g, '').split(';');
  const hasTarget = renderedResult.length > 1;

  // Render
  return (
    <div className="m-auto">
      <div className="mb-4">
        <div className="m-auto flex items-center justify-center text-lg">
          <div className="p-2">
            Total: <b className="text-2xl">{result.total}</b>
          </div>
          {hasTarget && (
            <>
              <div className="p-2">
                Successes:{' '}
                <b className="text-2xl text-green-300">{result.successes}</b>
              </div>
              ,
              <div className="p-2">
                Failures:{' '}
                <b className="text-2xl text-red-300">{result.failures}</b>
              </div>
            </>
          )}
        </div>
        <details className="m-auto text-center">
          <summary className="focus:outline-none">View roll</summary>
          <div className="tracking-tight font-mono p-4 bg-secondary-dark rounded">
            {hasTarget && (
              <div key="target" className="font-bold mb-4">
                <span className="border-b-2 border-yellow-200">
                  Target: {renderedResult[1]}
                </span>
              </div>
            )}
            <div key="rolls" className="text-center">
              {rolls.map((roll, index) => (
                <span key={index}>
                  {roll}
                  <br />
                </span>
              ))}
            </div>
          </div>
        </details>
      </div>
    </div>
  );
};
