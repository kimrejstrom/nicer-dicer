import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { toggleAnimations } from 'features/settings/settingsSlice';

const Settings: React.FC = () => {
  // Get settings from Redux
  const settingsState = useSelector((state: RootState) => state.settings);
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col items-center">
      <h2>Settings</h2>
      <div className="flex p-4">
        Animations:
        {settingsState.animations ? (
          <button onClick={() => dispatch(toggleAnimations(false))}>
            <span className="ml-4 border rounded-full border-gray-300 flex items-center cursor-pointer w-12 bg-green-400 justify-end">
              <span className="rounded-full border w-6 h-6 border-gray-300 shadow-inner bg-white shadow"></span>
            </span>
          </button>
        ) : (
          <button onClick={() => dispatch(toggleAnimations(true))}>
            <span className="ml-4 border rounded-full border-gray-300 flex items-center cursor-pointer w-12 justify-start">
              <span className="rounded-full border w-6 h-6 border-gray-300 shadow-inner bg-white shadow"></span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
