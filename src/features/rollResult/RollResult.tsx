import React from 'react';
import { DiceResult } from 'vendor/nicer-dicer-engine';

const parseExpression = (expression: string) => {
  const result = expression.split('}');
  const rolls = result[0].replace(/[{}]/g, '').split(';');
  let renderedResult: JSX.Element[] = [];
  if (result.length > 1) {
    renderedResult.push(
      <div key="target" className="font-bold mb-4">
        <span className="border-b-2 border-yellow-200">
          Target: {result[1]}
        </span>
      </div>,
    );
  }

  if (rolls.length > 1) {
    renderedResult.push(
      <div key="rolls" className="text-center">
        {rolls.map((roll, index) => (
          <span key={index}>
            {roll}
            <br />
          </span>
        ))}
      </div>,
    );
  } else {
    renderedResult.push(<span key="single">{rolls}</span>);
  }
  return renderedResult;
};

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
            <div className="tracking-tight font-mono p-2 bg-secondary-dark rounded">
              {parseExpression(result.renderedExpression)}
            </div>
          </details>
        </div>
      ) : (
        undefined
      )}
    </div>
  );
};
