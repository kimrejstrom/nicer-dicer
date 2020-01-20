import React from 'react';
import { PresetList } from 'features/presets/PresetList';
import { useSelector } from 'react-redux';
import { RootState } from 'app/rootReducer';

export const PresetFeature = () => {
  const { presets } = useSelector((state: RootState) => state.presets);

  // Render
  return (
    <div>
      <PresetList presets={presets} />
    </div>
  );
};
