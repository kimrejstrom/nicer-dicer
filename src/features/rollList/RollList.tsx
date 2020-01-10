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
    <div className="m-auto w-64 rounded bg-secondary-dark p-2">
      <div className="text-center text-xl text-yellow-200">Previous Rolls</div>
      {rollsState.rolls.length ? (
        <div className="flex flex-wrap items-center justify-around w-56 m-auto">
          {rollsState.rolls.map(roll => (
            <button
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
  );
};
