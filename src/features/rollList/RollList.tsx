import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { setCurrentRoll } from 'features/rollInput/rollInputSlice';

export const RollList: React.FC = () => {
  const dispatch = useDispatch();
  // Get rolls from Redux
  const rollsState = useSelector((state: RootState) => state.rolls);
  // Render
  return (
    <details className="m-auto text-center">
      <summary>View history</summary>
      <div className="rounded bg-secondary-dark mt-4 p-4">
        <div className="text-center text-xl text-yellow-200 mb-2">
          Previous Rolls
        </div>
        {rollsState.rolls.length ? (
          <div className="flex flex-wrap items-center justify-around m-auto">
            {rollsState.rolls.map((roll, index) => (
              <button
                key={index}
                onClick={() => dispatch(setCurrentRoll(roll))}
                className="m-1 p-2 rounded-full bg-primary-dark"
              >
                {roll}
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center">Nothing here</div>
        )}
      </div>
    </details>
  );
};
